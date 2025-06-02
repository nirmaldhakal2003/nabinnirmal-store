"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, Phone, MessageCircle, Search, Package, Clock, CheckCircle, Truck } from "lucide-react"

export default function AdminOrdersPage() {
  const [user, setUser] = useState<any>(null)
  const [orders, setOrders] = useState<any[]>([])
  const [filteredOrders, setFilteredOrders] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
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

    // Sample orders data
    const sampleOrders = [
      {
        id: "ORD-1704067200000",
        customer: {
          name: "राम बहादुर श्रेष्ठ",
          phone: "+977-9876543210",
          email: "ram@example.com",
        },
        items: [
          { name: "बासमती चामल", quantity: 2, price: 180 },
          { name: "दाल भात मसला", quantity: 1, price: 85 },
        ],
        total: 445,
        status: "confirmed",
        paymentMethod: "cash",
        location: "रामपुर-५, पाल्पा",
        createdAt: "2024-01-01T10:00:00Z",
      },
      {
        id: "ORD-1704153600000",
        customer: {
          name: "सीता गुरुङ",
          phone: "+977-9876543211",
          email: "sita@example.com",
        },
        items: [{ name: "हिमालयन फेस क्रीम", quantity: 1, price: 450 }],
        total: 550,
        status: "preparing",
        paymentMethod: "cash",
        location: "तानसेन, पाल्पा",
        createdAt: "2024-01-02T14:30:00Z",
      },
      {
        id: "ORD-1704240000000",
        customer: {
          name: "हरि तामाङ",
          phone: "+977-9876543212",
          email: "hari@example.com",
        },
        items: [{ name: "चिया पत्ती", quantity: 3, price: 120 }],
        total: 460,
        status: "shipped",
        paymentMethod: "cash",
        location: "बगलुङ",
        createdAt: "2024-01-03T09:15:00Z",
      },
    ]

    setOrders(sampleOrders)
    setFilteredOrders(sampleOrders)
  }, [router])

  // Filter orders
  useEffect(() => {
    let filtered = orders

    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (order) =>
          order.id.toLowerCase().includes(searchLower) ||
          order.customer.name.toLowerCase().includes(searchLower) ||
          order.customer.phone.includes(searchQuery) ||
          order.location.toLowerCase().includes(searchLower),
      )
    }

    if (statusFilter) {
      filtered = filtered.filter((order) => order.status === statusFilter)
    }

    setFilteredOrders(filtered)
  }, [searchQuery, statusFilter, orders])

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "pending":
        return {
          icon: Clock,
          color: "text-yellow-600",
          bg: "bg-yellow-50",
          label: "पेन्डिङ",
          variant: "secondary" as const,
        }
      case "confirmed":
        return {
          icon: CheckCircle,
          color: "text-green-600",
          bg: "bg-green-50",
          label: "पुष्टि भयो",
          variant: "default" as const,
        }
      case "preparing":
        return {
          icon: Package,
          color: "text-blue-600",
          bg: "bg-blue-50",
          label: "तयारी गर्दै",
          variant: "outline" as const,
        }
      case "shipped":
        return {
          icon: Truck,
          color: "text-purple-600",
          bg: "bg-purple-50",
          label: "पठाइयो",
          variant: "outline" as const,
        }
      case "delivered":
        return {
          icon: CheckCircle,
          color: "text-green-600",
          bg: "bg-green-50",
          label: "पुर्याइयो",
          variant: "default" as const,
        }
      default:
        return { icon: Clock, color: "text-gray-600", bg: "bg-gray-50", label: "अज्ञात", variant: "secondary" as const }
    }
  }

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    const updatedOrders = orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order))
    setOrders(updatedOrders)
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    )
  }

  const statusOptions = [
    { value: "", label: "सबै स्थिति" },
    { value: "pending", label: "पेन्डिङ" },
    { value: "confirmed", label: "पुष्टि भयो" },
    { value: "preparing", label: "तयारी गर्दै" },
    { value: "shipped", label: "पठाइयो" },
    { value: "delivered", label: "पुर्याइयो" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">📋 अर्डर व्यवस्थापन</h1>
          <p className="text-gray-600">सबै ग्राहकका अर्डरहरूको सूची र व्यवस्थापन</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card className="border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">कुल अर्डरहरू</p>
                  <p className="text-2xl font-bold text-blue-700">{orders.length}</p>
                </div>
                <Package className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-yellow-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-yellow-600">पेन्डिङ</p>
                  <p className="text-2xl font-bold text-yellow-700">
                    {orders.filter((o) => o.status === "pending").length}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">पुष्टि भएका</p>
                  <p className="text-2xl font-bold text-green-700">
                    {orders.filter((o) => o.status === "confirmed").length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600">पठाइएका</p>
                  <p className="text-2xl font-bold text-purple-700">
                    {orders.filter((o) => o.status === "shipped").length}
                  </p>
                </div>
                <Truck className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-red-700">🔍 खोज र फिल्टर</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="अर्डर ID, ग्राहक नाम, फोन नम्बर खोज्नुहोस्..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 border-orange-200 focus:border-red-400"
                  />
                </div>
              </div>
              <div className="md:w-64">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-orange-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Orders Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-red-700">📋 अर्डरहरूको सूची ({filteredOrders.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>अर्डर ID</TableHead>
                    <TableHead>ग्राहक</TableHead>
                    <TableHead>वस्तुहरू</TableHead>
                    <TableHead>कुल रकम</TableHead>
                    <TableHead>स्थिति</TableHead>
                    <TableHead>स्थान</TableHead>
                    <TableHead>मिति</TableHead>
                    <TableHead>कार्यहरू</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => {
                    const statusInfo = getStatusInfo(order.status)
                    return (
                      <TableRow key={order.id}>
                        <TableCell className="font-mono text-sm">{order.id}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{order.customer.name}</p>
                            <p className="text-sm text-gray-500">{order.customer.phone}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {order.items.map((item: any, index: number) => (
                              <p key={index}>
                                {item.name} × {item.quantity}
                              </p>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="font-medium text-red-600">रु. {order.total}</p>
                          <p className="text-xs text-gray-500">{order.paymentMethod}</p>
                        </TableCell>
                        <TableCell>
                          <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm">{order.location}</p>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm">{new Date(order.createdAt).toLocaleDateString("ne-NP")}</p>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-blue-200 text-blue-600 hover:bg-blue-50"
                              onClick={() => router.push(`/orders/${order.id}`)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-green-200 text-green-600 hover:bg-green-50"
                              onClick={() => window.open(`tel:${order.customer.phone}`, "_self")}
                            >
                              <Phone className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-green-200 text-green-600 hover:bg-green-50"
                              onClick={() => {
                                const message = `नमस्कार ${order.customer.name}! तपाईंको अर्डर ${order.id} को अपडेट: ${statusInfo.label}`
                                window.open(
                                  `https://wa.me/${order.customer.phone.replace("+977-", "977")}?text=${encodeURIComponent(message)}`,
                                  "_blank",
                                )
                              }}
                            >
                              <MessageCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>

            {filteredOrders.length === 0 && (
              <div className="text-center py-12">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">कुनै अर्डर भेटिएन</h3>
                <p className="text-gray-500">तपाईंको खोजी अनुसार कुनै अर्डर भेटिएन।</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
