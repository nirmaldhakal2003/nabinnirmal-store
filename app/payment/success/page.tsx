"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowRight, Download, MessageCircle } from "lucide-react"
import Link from "next/link"

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [orderDetails, setOrderDetails] = useState<any>(null)

  const orderId = searchParams.get("orderId")
  const refId = searchParams.get("refId")

  useEffect(() => {
    if (orderId) {
      // In production, fetch order details from API
      setOrderDetails({
        id: orderId,
        refId: refId,
        amount: "1500.00",
        status: "confirmed",
      })
    }
  }, [orderId, refId])

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card className="border-green-200 shadow-lg">
          <CardContent className="p-8 text-center">
            {/* Success Icon */}
            <div className="mb-6">
              <CheckCircle className="h-20 w-20 text-green-600 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-green-700 mb-2">🎉 भुक्तानी सफल!</h1>
              <p className="text-gray-600 text-lg">तपाईंको अर्डर सफलतापूर्वक राखिएको छ</p>
            </div>

            {/* Order Details */}
            {orderDetails && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                <h3 className="font-bold text-green-800 mb-4">अर्डर विवरण</h3>
                <div className="space-y-2 text-left">
                  <div className="flex justify-between">
                    <span>अर्डर ID:</span>
                    <span className="font-mono">{orderDetails.id}</span>
                  </div>
                  {orderDetails.refId && (
                    <div className="flex justify-between">
                      <span>Transaction ID:</span>
                      <span className="font-mono">{orderDetails.refId}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>रकम:</span>
                    <span className="font-bold">रु. {orderDetails.amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>स्थिति:</span>
                    <span className="text-green-600 font-medium">✅ पुष्टि भएको</span>
                  </div>
                </div>
              </div>
            )}

            {/* Next Steps */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-blue-800 mb-4">अब के हुन्छ?</h3>
              <div className="text-left space-y-2 text-blue-700">
                <p>✅ हामीले तपाईंको अर्डर प्राप्त गर्यौं</p>
                <p>📞 हामी छिट्टै तपाईंलाई सम्पर्क गर्नेछौं</p>
                <p>🚚 डेलिभरी २४ घण्टा भित्र हुनेछ</p>
                <p>📱 SMS/WhatsApp मार्फत अपडेट पाउनुहुनेछ</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href={`/orders/${orderId}`}>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Download className="h-4 w-4 mr-2" />
                  अर्डर हेर्नुहोस्
                </Button>
              </Link>

              <Link href="/products">
                <Button variant="outline" className="w-full border-green-200 text-green-600 hover:bg-green-50">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  थप किनमेल
                </Button>
              </Link>

              <Link href="/contact">
                <Button variant="outline" className="w-full border-orange-200 text-orange-600 hover:bg-orange-50">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  सम्पर्क गर्नुहोस्
                </Button>
              </Link>
            </div>

            {/* Contact Info */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                कुनै समस्या भएमा सम्पर्क गर्नुहोस्:
                <span className="font-medium"> 📞 +977-9876543210</span> वा
                <span className="font-medium"> 📧 nirmalbsccsit2@gmail.com</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
