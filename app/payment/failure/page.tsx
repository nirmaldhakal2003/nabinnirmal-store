"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { XCircle, ArrowLeft, RefreshCw, MessageCircle } from "lucide-react"
import Link from "next/link"

export default function PaymentFailurePage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const orderId = searchParams.get("orderId")

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex items-center justify-center py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card className="border-red-200 shadow-lg">
          <CardContent className="p-8 text-center">
            {/* Failure Icon */}
            <div className="mb-6">
              <XCircle className="h-20 w-20 text-red-600 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-red-700 mb-2">❌ भुक्तानी असफल</h1>
              <p className="text-gray-600 text-lg">तपाईंको भुक्तानी प्रक्रिया पूरा हुन सकेन</p>
            </div>

            {/* Error Details */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-red-800 mb-4">के भयो?</h3>
              <div className="text-left space-y-2 text-red-700">
                <p>• भुक्तानी प्रक्रिया बीचमा रद्द भयो</p>
                <p>• अपर्याप्त ब्यालेन्स हुन सक्छ</p>
                <p>• नेटवर्क समस्या हुन सक्छ</p>
                <p>• गलत जानकारी प्रविष्ट भएको हुन सक्छ</p>
              </div>
            </div>

            {/* Order Info */}
            {orderId && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <p className="text-yellow-800">
                  <strong>अर्डर ID:</strong> {orderId}
                </p>
                <p className="text-sm text-yellow-700 mt-2">तपाईंको अर्डर अझै पनि pending छ। भुक्तानी फेरि प्रयास गर्नुहोस्।</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <Button onClick={() => router.back()} className="w-full bg-red-600 hover:bg-red-700">
                <RefreshCw className="h-4 w-4 mr-2" />
                फेरि प्रयास गर्नुहोस्
              </Button>

              <Link href="/cart">
                <Button variant="outline" className="w-full border-gray-300">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  कार्टमा फिर्ता
                </Button>
              </Link>
            </div>

            {/* Alternative Options */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-blue-800 mb-4">वैकल्पिक विकल्पहरू</h3>
              <div className="text-left space-y-2 text-blue-700">
                <p>💰 नगद भुक्तानी (डेलिभरीमा)</p>
                <p>📞 फोन गरेर अर्डर गर्नुहोस्</p>
                <p>💬 WhatsApp मार्फत सम्पर्क गर्नुहोस्</p>
                <p>🏪 पसलमा आएर किन्नुहोस्</p>
              </div>
            </div>

            {/* Contact Support */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/contact">
                <Button variant="outline" className="w-full border-orange-200 text-orange-600 hover:bg-orange-50">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  सहायता चाहिन्छ?
                </Button>
              </Link>

              <Link href="/products">
                <Button variant="outline" className="w-full border-green-200 text-green-600 hover:bg-green-50">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  किनमेल जारी राख्नुहोस्
                </Button>
              </Link>
            </div>

            {/* Contact Info */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                तुरुन्त सहायताको लागि सम्पर्क गर्नुहोस्:
                <span className="font-medium"> 📞 +977-9876543210</span>
              </p>
              <p className="text-xs text-gray-500 mt-2">हामी २४/७ उपलब्ध छौं तपाईंको सहायताको लागि</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
