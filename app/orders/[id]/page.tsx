"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Clock, Truck, MapPin, Phone, Package } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function OrderDetailsPage() {
  const params = useParams()
  const [order, setOrder] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      // In a real app, fetch from API
      // For demo, create a sample order
      const sampleOrder = {
        id: params.id,
        status: "confirmed",
        customer: {
          name: "राम बहादुर श्रेष्ठ",
          phone: "+977-9876543210",
          email: "ram@example.com",
        },
        items: [
          {
            id: "1",
            name: "बासमती चामल",
            nameEn: "Basmati Rice",
            price: 180,
            quantity: 2,
            image: "nns.png?height=300&width=300",
          },
        ],
        pricing: {
          subtotal: 360,
          deliveryFee: 100,
          tax: 46.8,
          total: 506.8,
        },
        location: {
          manualAddress: {
            fullAddress: "रामपुर-५, पाल्पा",
            landmark: "रामपुर अस्पताल नजिक",
            phone: "+977-9876543210",
          },
          deliveryInfo: {
            estimatedTime: "२-३ घण्टा",
            distance: 5.2,
          },
        },
        paymentMethod: "cash",
        createdAt: new Date().toISOString(),
        estimatedDelivery: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
      }

      setOrder(sampleOrder)
      setIsLoading(false)
    }
  }, [params.id])

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "pending":
        return { icon: Clock, color: "text-yellow-600", bg: "bg-yellow-50", label: "पेन्डिङ" }
      case "confirmed":
        return { icon: CheckCircle, color: "text-green-600", bg: "bg-green-50", label: "पुष्टि भयो" }
      case "preparing":
        return { icon: Package, color: "text-blue-600", bg: "bg-blue-50", label: "तयारी गर्दै" }
      case "shipped":
        return { icon: Truck, color: "text-purple-600", bg: "bg-purple-50", label: "पठाइयो" }
      case "delivered":
        return { icon: CheckCircle, color: "text-green-600", bg: "bg-green-50", label: "पुर्याइयो" }
      default:
        return { icon: Clock, color: "text-gray-600", bg: "bg-gray-50", label: "अज्ञात" }
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">अर्डर भेटिएन</h1>
          <Link href="/products">
            <Button className="bg-red-600 hover:bg-red-700">उत्पादनहरू हेर्नुहोस्</Button>
          </Link>
        </div>
      </div>
    )
  }

  const statusInfo = getStatusInfo(order.status)
  const StatusIcon = statusInfo.icon

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">📋 अर्डर विवरण</h1>
              <p className="text-gray-600">अर्डर ID: {order.id}</p>
            </div>
            <div className={`flex items-center space-x-2 px-4 py-2 rounded-full ${statusInfo.bg}`}>
              <StatusIcon className={`h-5 w-5 ${statusInfo.color}`} />
              <span className={`font-medium ${statusInfo.color}`}>{statusInfo.label}</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <Card className="border-orange-200">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50">
                <CardTitle className="text-orange-700">🛍️ अर्डर गरिएका वस्तुहरू</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {order.items.map((item: any) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 border border-orange-200 rounded-lg">
                      <Image
                        src={item.image || "nns.png"}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="rounded-lg border border-gray-200"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.name}</h3>
                        {item.nameEn && <p className="text-sm text-gray-500">{item.nameEn}</p>}
                        <p className="text-sm text-gray-600">मात्रा: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-red-600">रु. {item.price}</p>
                        <p className="text-sm text-gray-500">कुल: रु. {(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Delivery Information */}
            <Card className="border-blue-200">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="text-blue-700">🚚 डेलिभरी जानकारी</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-red-600 mt-1" />
                  <div>
                    <p className="font-medium">डेलिभरी ठेगाना:</p>
                    <p className="text-gray-600">{order.location.manualAddress?.fullAddress}</p>
                    {order.location.manualAddress?.landmark && (
                      <p className="text-sm text-gray-500">Landmark: {order.location.manualAddress.landmark}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium">सम्पर्क नम्बर:</p>
                    <p className="text-gray-600">{order.location.manualAddress?.phone}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-orange-600" />
                  <div>
                    <p className="font-medium">अनुमानित डेलिभरी समय:</p>
                    <p className="text-gray-600">{order.location.deliveryInfo?.estimatedTime}</p>
                  </div>
                </div>

                {order.location.deliveryInfo?.distance && (
                  <div className="flex items-center space-x-3">
                    <Truck className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="font-medium">दूरी:</p>
                      <p className="text-gray-600">{order.location.deliveryInfo.distance} किमी</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Order Timeline */}
            <Card className="border-green-200">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                <CardTitle className="text-green-700">📅 अर्डर Timeline</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="font-medium">अर्डर राखिएको</p>
                      <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleString("ne-NP")}</p>
                    </div>
                  </div>

                  {order.status !== "pending" && (
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <div>
                        <p className="font-medium">अर्डर पुष्टि भयो</p>
                        <p className="text-sm text-gray-500">केही मिनेट अगाडि</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                    <div>
                      <p className="font-medium text-gray-500">तयारी गर्दै</p>
                      <p className="text-sm text-gray-400">आउँदै छ</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                    <div>
                      <p className="font-medium text-gray-500">डेलिभरी गर्दै</p>
                      <p className="text-sm text-gray-400">आउँदै छ</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Customer Info */}
            <Card className="border-purple-200">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                <CardTitle className="text-purple-700">👤 ग्राहक जानकारी</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-3">
                <div>
                  <p className="font-medium">नाम:</p>
                  <p className="text-gray-600">{order.customer.name}</p>
                </div>
                <div>
                  <p className="font-medium">फोन:</p>
                  <p className="text-gray-600">{order.customer.phone}</p>
                </div>
                {order.customer.email && (
                  <div>
                    <p className="font-medium">इमेल:</p>
                    <p className="text-gray-600">{order.customer.email}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Payment Summary */}
            <Card className="border-yellow-200">
              <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50">
                <CardTitle className="text-yellow-700">💰 भुक्तानी सारांश</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-3">
                <div className="flex justify-between">
                  <span>उप-जम्मा:</span>
                  <span>रु. {order.pricing.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>डेलिभरी शुल्क:</span>
                  <span>रु. {order.pricing.deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>कर (१३% VAT):</span>
                  <span>रु. {order.pricing.tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg text-red-700">
                  <span>कुल जम्मा:</span>
                  <span>रु. {order.pricing.total.toFixed(2)}</span>
                </div>

                <div className="mt-4 text-center">
                  <Badge variant="outline" className="border-green-200 text-green-700">
                    {order.paymentMethod === "cash" && "💰 नगद भुक्तानी"}
                    {order.paymentMethod === "esewa" && "📱 eSewa"}
                    {order.paymentMethod === "khalti" && "💳 Khalti"}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card className="border-red-200">
              <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50">
                <CardTitle className="text-red-700">⚡ कार्यहरू</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-3">
                <Button
                  onClick={() => window.open(`tel:${order.customer.phone}`, "_self")}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  स्टोरलाई फोन गर्नुहोस्
                </Button>

                <Button
                  onClick={() => {
                    const message = `नमस्कार! मेरो अर्डर ID ${order.id} को बारेमा जानकारी चाहिन्छ।`
                    window.open(`https://wa.me/9779876543210?text=${encodeURIComponent(message)}`, "_blank")
                  }}
                  variant="outline"
                  className="w-full border-green-200 text-green-600 hover:bg-green-50"
                >
                  WhatsApp गर्नुहोस्
                </Button>

                <Link href="/products">
                  <Button variant="outline" className="w-full border-red-200 text-red-600 hover:bg-red-50">
                    फेरि किनमेल गर्नुहोस्
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
