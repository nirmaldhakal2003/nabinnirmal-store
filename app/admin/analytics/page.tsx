"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart3, TrendingUp, Package, ShoppingCart, DollarSign, Calendar, Download } from "lucide-react"

export default function AdminAnalyticsPage() {
  const [user, setUser] = useState<any>(null)
  const [analytics, setAnalytics] = useState<any>({})
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      const parsedUser = JSON.parse(userData)
      if (parsedUser.role !== "admin") {
        router.push("/")
        return
      }
      setUser(parsedUser)
    } else {
      router.push("/admin/login")
      return
    }

    // Calculate analytics
    const adminProducts = JSON.parse(localStorage.getItem("adminProducts") || "[]")
    const orders = JSON.parse(localStorage.getItem("orders") || "[]")
    const cart = JSON.parse(localStorage.getItem("cart") || "[]")

    const totalProducts = adminProducts.length
    const totalOrders = orders.length
    const totalRevenue = orders.reduce((sum: number, order: any) => sum + (order.total || 0), 0)
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0
    const topCategories = adminProducts.reduce((acc: any, product: any) => {
      acc[product.category] = (acc[product.category] || 0) + 1
      return acc
    }, {})

    setAnalytics({
      totalProducts,
      totalOrders,
      totalRevenue,
      averageOrderValue,
      topCategories,
      cartItems: cart.length,
      lowStockProducts: adminProducts.filter((p: any) => p.stock < 10).length,
    })
    setIsLoading(false)
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">📊 एनालिटिक्स र रिपोर्ट</h1>
              <p className="text-gray-600">व्यापारिक प्रदर्शन र तथ्याङ्कहरू</p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                <Download className="h-4 w-4 mr-2" />
                रिपोर्ट डाउनलोड गर्नुहोस्
              </Button>
              <Button className="bg-red-600 hover:bg-red-700">
                <Calendar className="h-4 w-4 mr-2" />
                मिति छान्नुहोस्
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">कुल उत्पादनहरू</p>
                  <p className="text-3xl font-bold text-blue-700">{analytics.totalProducts}</p>
                  <p className="text-xs text-green-600 mt-1">
                    <TrendingUp className="h-3 w-3 inline mr-1" />
                    +12% यस महिना
                  </p>
                </div>
                <Package className="h-12 w-12 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">कुल अर्डरहरू</p>
                  <p className="text-3xl font-bold text-green-700">{analytics.totalOrders}</p>
                  <p className="text-xs text-green-600 mt-1">
                    <TrendingUp className="h-3 w-3 inline mr-1" />
                    +8% यस हप्ता
                  </p>
                </div>
                <ShoppingCart className="h-12 w-12 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600">कुल आम्दानी</p>
                  <p className="text-3xl font-bold text-purple-700">रु. {analytics.totalRevenue.toLocaleString()}</p>
                  <p className="text-xs text-green-600 mt-1">
                    <TrendingUp className="h-3 w-3 inline mr-1" />
                    +15% यस महिना
                  </p>
                </div>
                <DollarSign className="h-12 w-12 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-600">औसत अर्डर मूल्य</p>
                  <p className="text-3xl font-bold text-orange-700">रु. {Math.round(analytics.averageOrderValue)}</p>
                  <p className="text-xs text-green-600 mt-1">
                    <TrendingUp className="h-3 w-3 inline mr-1" />
                    +5% यस हप्ता
                  </p>
                </div>
                <BarChart3 className="h-12 w-12 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Details */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Top Categories */}
          <Card className="border-orange-200">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50">
              <CardTitle className="text-orange-700">🏆 शीर्ष श्रेणीहरू</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {Object.entries(analytics.topCategories).map(([category, count]: [string, any]) => (
                  <div key={category} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">
                        {category === "grocery" && "🍚"}
                        {category === "cosmetics" && "💄"}
                        {category === "daily-essentials" && "🛒"}
                        {category === "baby-products" && "👶"}
                        {category === "household" && "🏠"}
                        {category === "kitchen" && "🍳"}
                      </span>
                      <span className="font-medium">
                        {category === "grocery" && "खाद्य सामग्री"}
                        {category === "cosmetics" && "सौन्दर्य उत्पादन"}
                        {category === "daily-essentials" && "दैनिक सामान"}
                        {category === "baby-products" && "बच्चाका सामान"}
                        {category === "household" && "घरायसी सामान"}
                        {category === "kitchen" && "भान्साका सामान"}
                      </span>
                    </div>
                    <Badge variant="outline">{count} उत्पादनहरू</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Alerts */}
          <Card className="border-red-200">
            <CardHeader className="bg-gradient-to-r from-red-50 to-pink-50">
              <CardTitle className="text-red-700">⚠️ चेतावनीहरू</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div>
                    <p className="font-medium text-yellow-800">कम स्टक</p>
                    <p className="text-sm text-yellow-600">{analytics.lowStockProducts} उत्पादनहरूमा कम स्टक छ</p>
                  </div>
                  <Badge variant="destructive">{analytics.lowStockProducts}</Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div>
                    <p className="font-medium text-blue-800">कार्टमा छोडिएका सामानहरू</p>
                    <p className="text-sm text-blue-600">{analytics.cartItems} सामानहरू कार्टमा छन्</p>
                  </div>
                  <Badge variant="outline">{analytics.cartItems}</Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div>
                    <p className="font-medium text-green-800">सिस्टम स्थिति</p>
                    <p className="text-sm text-green-600">सबै सिस्टमहरू सामान्य छन्</p>
                  </div>
                  <Badge className="bg-green-600">✓ सामान्य</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
