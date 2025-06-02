"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, CheckCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import LocationTracker from "@/components/LocationTracker"
import PaymentMethods from "@/components/PaymentMethods"

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<any[]>([])
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
  })
  const [paymentMethod, setPaymentMethod] = useState("cash")
  const [locationData, setLocationData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      setCartItems(JSON.parse(savedCart))
    } else {
      router.push("/cart")
    }

    // Load user info if logged in
    const userData = localStorage.getItem("user")
    if (userData) {
      const user = JSON.parse(userData)
      setCustomerInfo({
        name: user.name || "",
        email: user.email || "",
        phone: "",
      })
    }
  }, [router])

  const handleCustomerInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value,
    })
  }

  const handleLocationUpdate = (data: any) => {
    setLocationData(data)
  }

  const calculateTotals = () => {
    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
    const deliveryFee = locationData?.deliveryInfo?.deliveryFee || 100
    const tax = subtotal * 0.13 // 13% VAT
    const total = subtotal + deliveryFee + tax

    return { subtotal, deliveryFee, tax, total }
  }

  const handlePlaceOrder = async (paymentData?: any) => {
    if (!customerInfo.name || !customerInfo.phone) {
      toast({
        title: "अधूरो जानकारी",
        description: "कृपया नाम र फोन नम्बर दिनुहोस्।",
        variant: "destructive",
      })
      return
    }

    if (!locationData) {
      toast({
        title: "ठेगाना आवश्यक",
        description: "कृपया आफ्नो ठेगाना दिनुहोस्।",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const { subtotal, deliveryFee, tax, total } = calculateTotals()

      const orderData = {
        customer: customerInfo,
        items: cartItems,
        location: locationData,
        paymentMethod: paymentData?.method || paymentMethod,
        paymentData: paymentData,
        pricing: {
          subtotal,
          deliveryFee,
          tax,
          total,
        },
        specialInstructions: "",
      }

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      })

      if (!response.ok) {
        throw new Error("अर्डर राख्न सकिएन")
      }

      const order = await response.json()

      // Clear cart
      localStorage.removeItem("cart")
      window.dispatchEvent(new Event("cartUpdated"))

      setOrderPlaced(true)

      toast({
        title: "अर्डर सफल!",
        description: `अर्डर ID: ${order.id}। हामी छिट्टै सम्पर्क गर्नेछौं।`,
      })

      // Redirect to order confirmation after 3 seconds
      setTimeout(() => {
        router.push(`/orders/${order.id}`)
      }, 3000)
    } catch (error: any) {
      toast({
        title: "त्रुटि",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center py-8">
        <Card className="max-w-md mx-auto border-green-200">
          <CardContent className="p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-green-700 mb-2">अर्डर सफल!</h2>
            <p className="text-gray-600 mb-4">तपाईंको अर्डर सफलतापूर्वक राखिएको छ। हामी छिट्टै तपाईंलाई सम्पर्क गर्नेछौं।</p>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
            <p className="text-sm text-gray-500 mt-2">Order confirmation मा redirect गर्दै...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">कार्ट खाली छ</h1>
          <Link href="/products">
            <Button className="bg-red-600 hover:bg-red-700">उत्पादनहरू हेर्नुहोस्</Button>
          </Link>
        </div>
      </div>
    )
  }

  const { subtotal, deliveryFee, tax, total } = calculateTotals()

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Link href="/cart">
              <Button variant="outline" size="sm" className="border-red-200 text-red-600 hover:bg-red-50">
                <ArrowLeft className="h-4 w-4 mr-2" />
                कार्टमा फिर्ता
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">🛒 चेकआउट</h1>
              <p className="text-gray-600">आफ्नो अर्डर पूरा गर्नुहोस्</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Information */}
            <Card className="border-orange-200">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="text-blue-700">👤 ग्राहक जानकारी</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">पूरा नाम *</Label>
                    <Input
                      id="name"
                      name="name"
                      required
                      value={customerInfo.name}
                      onChange={handleCustomerInfoChange}
                      placeholder="तपाईंको पूरा नाम"
                      className="border-orange-200 focus:border-blue-400"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">फोन नम्बर *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={customerInfo.phone}
                      onChange={handleCustomerInfoChange}
                      placeholder="९८XXXXXXXX"
                      className="border-orange-200 focus:border-blue-400"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">इमेल</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={customerInfo.email}
                    onChange={handleCustomerInfoChange}
                    placeholder="your@email.com"
                    className="border-orange-200 focus:border-blue-400"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Location & Delivery */}
            <Card className="border-orange-200">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                <CardTitle className="text-green-700">📍 डेलिभरी ठेगाना</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <LocationTracker onLocationUpdate={handleLocationUpdate} />
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <PaymentMethods
              amount={total}
              orderId={`ORD-${Date.now()}`}
              customerInfo={customerInfo}
              onPaymentSuccess={(paymentData) => {
                console.log("Payment successful:", paymentData)
                handlePlaceOrder(paymentData)
              }}
              onPaymentError={(error) => {
                toast({
                  title: "भुक्तानी त्रुटि",
                  description: error,
                  variant: "destructive",
                })
              }}
            />
          </div>

          {/* Order Summary */}
          <div>
            <Card className="border-orange-200 sticky top-8">
              <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50">
                <CardTitle className="text-red-700">📋 अर्डर सारांश</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {/* Cart Items */}
                <div className="space-y-3 mb-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Image
                        src={item.image || "nns.png"}
                        alt={item.name}
                        width={50}
                        height={50}
                        className="rounded-lg border border-gray-200"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-gray-500">
                          रु. {item.price} × {item.quantity}
                        </p>
                      </div>
                      <p className="font-medium text-red-600">रु. {(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                {/* Pricing Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>उप-जम्मा:</span>
                    <span>रु. {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>डेलिभरी शुल्क:</span>
                    <span>रु. {deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>कर (१३% VAT):</span>
                    <span>रु. {tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg text-red-700">
                    <span>कुल जम्मा:</span>
                    <span>रु. {total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Delivery Info */}
                {locationData?.deliveryInfo && (
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                      🚚 अनुमानित डेलिभरी: {locationData.deliveryInfo.estimatedTime}
                    </p>
                  </div>
                )}

                {/* Place Order Button */}
                <Button
                  onClick={handlePlaceOrder}
                  disabled={isLoading || !locationData}
                  className="w-full mt-6 bg-red-600 hover:bg-red-700"
                  size="lg"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>अर्डर राख्दै...</span>
                    </div>
                  ) : (
                    <>
                      <CheckCircle className="h-5 w-5 mr-2" />
                      अर्डर राख्नुहोस् (रु. {total.toFixed(2)})
                    </>
                  )}
                </Button>

                <div className="mt-4">
                  <div className="text-center text-sm text-gray-500 mb-2">वा</div>
                  <Button
                    variant="outline"
                    className="w-full border-green-200 text-green-600 hover:bg-green-50"
                    onClick={() => {
                      const orderSummary = `
🛒 नयाँ अर्डर:
👤 नाम: ${customerInfo.name}
📞 फोन: ${customerInfo.phone}
📧 इमेल: ${customerInfo.email}

🛍️ उत्पादनहरू:
${cartItems.map((item) => `• ${item.name} (${item.quantity}x) - रु. ${(item.price * item.quantity).toFixed(2)}`).join("\n")}

💰 कुल रकम: रु. ${total.toFixed(2)}
🚚 डेलिभरी: ${locationData?.address || "ठेगाना दिनुहोस्"}
💳 भुक्तानी: नगद (डेलिभरीमा)
                      `.trim()

                      window.open(`https://wa.me/9779748845865?text=${encodeURIComponent(orderSummary)}`, "_blank")
                    }}
                  >
                    📱 WhatsApp मार्फत अर्डर गर्नुहोस्
                  </Button>
                </div>

                {/* Payment Method Display */}
                <div className="mt-4 text-center">
                  <Badge variant="outline" className="border-green-200 text-green-700">
                    {paymentMethod === "cash" && "💰 नगद भुक्तानी"}
                    {paymentMethod === "esewa" && "📱 eSewa"}
                    {paymentMethod === "khalti" && "💳 Khalti"}
                  </Badge>
                </div>

                {/* Security Note */}
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-600 text-center">
                    🔒 तपाईंको जानकारी सुरक्षित छ। हामी तपाईंको privacy को सम्मान गर्छौं।
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
