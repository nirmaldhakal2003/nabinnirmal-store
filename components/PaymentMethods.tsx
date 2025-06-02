"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { CreditCard, Smartphone, Banknote, Loader2, CheckCircle, ExternalLink } from "lucide-react"

interface PaymentMethodsProps {
  amount: number
  orderId: string
  customerInfo: any
  onPaymentSuccess: (paymentData: any) => void
  onPaymentError: (error: string) => void
}

export default function PaymentMethods({
  amount,
  orderId,
  customerInfo,
  onPaymentSuccess,
  onPaymentError,
}: PaymentMethodsProps) {
  const [selectedMethod, setSelectedMethod] = useState<string>("cash")
  const [isProcessing, setIsProcessing] = useState(false)
  const { toast } = useToast()

  const paymentMethods = [
    {
      id: "cash",
      name: "नगद भुक्तानी",
      description: "डेलिभरीमा भुक्तानी गर्नुहोस्",
      icon: Banknote,
      color: "green",
      available: true,
    },
    {
      id: "esewa",
      name: "eSewa",
      description: "डिजिटल वालेट",
      icon: Smartphone,
      color: "green",
      available: true,
    },
    {
      id: "khalti",
      name: "Khalti",
      description: "डिजिटल भुक्तानी",
      icon: CreditCard,
      color: "purple",
      available: true,
    },
    {
      id: "bank",
      name: "बैंक ट्रान्सफर",
      description: "सीधा बैंक खातामा",
      icon: CreditCard,
      color: "blue",
      available: false,
    },
  ]

  const handleEsewaPayment = async () => {
    setIsProcessing(true)
    try {
      const response = await fetch("/api/payments/esewa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: amount,
          orderId: orderId,
          customerInfo: customerInfo,
        }),
      })

      const data = await response.json()

      if (data.success) {
        // Create and submit eSewa form
        const form = document.createElement("form")
        form.method = "POST"
        form.action = data.paymentUrl

        Object.keys(data.formData).forEach((key) => {
          const input = document.createElement("input")
          input.type = "hidden"
          input.name = key
          input.value = data.formData[key]
          form.appendChild(input)
        })

        document.body.appendChild(form)
        form.submit()
      } else {
        throw new Error(data.error)
      }
    } catch (error: any) {
      onPaymentError(error.message)
      toast({
        title: "भुक्तानी त्रुटि",
        description: "eSewa भुक्तानी सुरु गर्न सकिएन।",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleKhaltiPayment = async () => {
    setIsProcessing(true)
    try {
      const response = await fetch("/api/payments/khalti", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: amount * 100, // Khalti expects amount in paisa
          orderId: orderId,
          customerInfo: customerInfo,
        }),
      })

      const data = await response.json()

      if (data.success) {
        // Load Khalti checkout
        const script = document.createElement("script")
        script.src = "https://khalti.s3.ap-south-1.amazonaws.com/KPG/dist/2020.12.17.0.0.0/khalti-checkout.iffe.js"
        script.onload = () => {
          const checkout = new (window as any).KhaltiCheckout({
            ...data.config,
            amount: amount * 100,
            onSuccess: async (payload: any) => {
              // Verify payment
              const verifyResponse = await fetch("/api/payments/khalti/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  token: payload.token,
                  amount: amount * 100,
                }),
              })

              const verifyData = await verifyResponse.json()
              if (verifyData.success) {
                onPaymentSuccess({
                  method: "khalti",
                  transactionId: payload.token,
                  amount: amount,
                })
              } else {
                onPaymentError("भुक्तानी प्रमाणीकरण असफल")
              }
            },
            onError: (error: any) => {
              onPaymentError("Khalti भुक्तानी असफल")
            },
          })
          checkout.show({ amount: amount * 100 })
        }
        document.head.appendChild(script)
      } else {
        throw new Error(data.error)
      }
    } catch (error: any) {
      onPaymentError(error.message)
      toast({
        title: "भुक्तानी त्रुटि",
        description: "Khalti भुक्तानी सुरु गर्न सकिएन।",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleCashPayment = () => {
    onPaymentSuccess({
      method: "cash",
      transactionId: `CASH-${Date.now()}`,
      amount: amount,
    })
  }

  const handlePayment = () => {
    switch (selectedMethod) {
      case "esewa":
        handleEsewaPayment()
        break
      case "khalti":
        handleKhaltiPayment()
        break
      case "cash":
        handleCashPayment()
        break
      default:
        toast({
          title: "त्रुटि",
          description: "कृपया भुक्तानी विधि छान्नुहोस्।",
          variant: "destructive",
        })
    }
  }

  return (
    <Card className="border-orange-200">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
        <CardTitle className="text-purple-700">💳 भुक्तानी विधि छान्नुहोस्</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {paymentMethods.map((method) => {
            const IconComponent = method.icon
            return (
              <div
                key={method.id}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  selectedMethod === method.id
                    ? `border-${method.color}-500 bg-${method.color}-50`
                    : method.available
                      ? "border-gray-200 hover:border-gray-300"
                      : "border-gray-100 bg-gray-50 cursor-not-allowed opacity-50"
                }`}
                onClick={() => method.available && setSelectedMethod(method.id)}
              >
                <div className="text-center">
                  <IconComponent
                    className={`h-8 w-8 mx-auto mb-2 ${
                      method.color === "green"
                        ? "text-green-600"
                        : method.color === "purple"
                          ? "text-purple-600"
                          : "text-blue-600"
                    }`}
                  />
                  <p className="font-medium">{method.name}</p>
                  <p className="text-sm text-gray-500">{method.description}</p>
                  {!method.available && (
                    <Badge variant="secondary" className="mt-2">
                      छिट्टै आउँदै
                    </Badge>
                  )}
                  {selectedMethod === method.id && <CheckCircle className="h-5 w-5 text-green-600 mx-auto mt-2" />}
                </div>
              </div>
            )
          })}
        </div>

        {/* Payment Details */}
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="flex justify-between items-center">
            <span className="font-medium">भुक्तानी रकम:</span>
            <span className="text-xl font-bold text-red-600">रु. {amount.toFixed(2)}</span>
          </div>
        </div>

        {/* Payment Instructions */}
        {selectedMethod === "esewa" && (
          <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-4">
            <h4 className="font-medium text-green-800 mb-2">eSewa भुक्तानी निर्देशन:</h4>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• तपाईंलाई eSewa को वेबसाइटमा redirect गरिनेछ</li>
              <li>• आफ्नो eSewa ID र PIN प्रविष्ट गर्नुहोस्</li>
              <li>• भुक्तानी पूरा गरेपछि तपाईं फिर्ता आउनुहुनेछ</li>
            </ul>
          </div>
        )}

        {selectedMethod === "khalti" && (
          <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg mb-4">
            <h4 className="font-medium text-purple-800 mb-2">Khalti भुक्तानी निर्देशन:</h4>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• Khalti checkout window खुल्नेछ</li>
              <li>• आफ्नो Khalti PIN प्रविष्ट गर्नुहोस्</li>
              <li>• OTP verification गर्नुहोस्</li>
            </ul>
          </div>
        )}

        {selectedMethod === "cash" && (
          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-4">
            <h4 className="font-medium text-yellow-800 mb-2">नगद भुक्तानी निर्देशन:</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• डेलिभरी गर्दा नगद भुक्तानी गर्नुहोस्</li>
              <li>• सही रकम तयार राख्नुहोस्</li>
              <li>• रसिद लिन नबिर्सनुहोस्</li>
            </ul>
          </div>
        )}

        {/* Payment Button */}
        <Button
          onClick={handlePayment}
          disabled={isProcessing || !selectedMethod}
          className="w-full bg-red-600 hover:bg-red-700"
          size="lg"
        >
          {isProcessing ? (
            <div className="flex items-center space-x-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>प्रक्रिया गर्दै...</span>
            </div>
          ) : (
            <>
              {selectedMethod === "cash" && <Banknote className="h-5 w-5 mr-2" />}
              {selectedMethod === "esewa" && <Smartphone className="h-5 w-5 mr-2" />}
              {selectedMethod === "khalti" && <CreditCard className="h-5 w-5 mr-2" />}
              भुक्तानी गर्नुहोस् (रु. {amount.toFixed(2)})
              {selectedMethod !== "cash" && <ExternalLink className="h-4 w-4 ml-2" />}
            </>
          )}
        </Button>

        {/* Security Note */}
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-600 text-center">
            🔒 तपाईंको भुक्तानी जानकारी पूर्ण रूपमा सुरक्षित छ। हामी कुनै पनि card details store गर्दैनौं।
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
