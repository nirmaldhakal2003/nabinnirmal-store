"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, Trash2, Plus, Search, Eye, Package, AlertCircle, CheckCircle, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"

// Demo products data - these will be replaced by admin-added products
const demoProducts = [
  {
    id: "demo-1",
    name: "बासमती चामल",
    nameEn: "Basmati Rice",
    price: 180,
    originalPrice: 200,
    image: "nns.png?height=300&width=300",
    description: "उच्च गुणस्तरको बासमती चामल - १ केजी",
    category: "grocery",
    inStock: true,
    stock: 50,
    discount: 10,
    createdAt: "2024-01-01",
    isDemo: true,
  },
  {
    id: "demo-2",
    name: "हिमालयन फेस क्रीम",
    nameEn: "Himalayan Face Cream",
    price: 450,
    originalPrice: 500,
    image: "nns.png?height=300&width=300",
    description: "प्राकृतिक जडिबुटीले बनेको फेस क्रीम",
    category: "cosmetics",
    inStock: true,
    stock: 25,
    discount: 10,
    createdAt: "2024-01-02",
    isDemo: true,
  },
]

export default function AdminProductsPage() {
  const [user, setUser] = useState<any>(null)
  const [products, setProducts] = useState<any[]>([])
  const [filteredProducts, setFilteredProducts] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([])
  const router = useRouter()
  const { toast } = useToast()

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

    // Load products from localStorage and combine with demo products
    const adminProducts = JSON.parse(localStorage.getItem("adminProducts") || "[]")
    const allProducts = [...demoProducts, ...adminProducts]
    setProducts(allProducts)
    setFilteredProducts(allProducts)
    setIsLoading(false)
  }, [router])

  // Filter products based on search and category
  useEffect(() => {
    let filtered = products

    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchLower) ||
          product.nameEn?.toLowerCase().includes(searchLower) ||
          product.id.includes(searchLower) ||
          product.category.toLowerCase().includes(searchLower),
      )
    }

    if (selectedCategory) {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    setFilteredProducts(filtered)
  }, [searchQuery, selectedCategory, products])

  const handleDeleteProduct = (productId: string) => {
    if (productId.startsWith("demo-")) {
      alert("डेमो उत्पादनहरू मेटाउन सकिँदैन!")
      return
    }

    if (confirm("के तपाईं यो उत्पादन मेटाउन चाहनुहुन्छ?")) {
      // Remove from localStorage
      const adminProducts = JSON.parse(localStorage.getItem("adminProducts") || "[]")
      const updatedAdminProducts = adminProducts.filter((p: any) => p.id !== productId)
      localStorage.setItem("adminProducts", JSON.stringify(updatedAdminProducts))

      // Update state
      const updatedProducts = products.filter((p) => p.id !== productId)
      setProducts(updatedProducts)
      toast({
        title: "उत्पादन मेटेको!",
        description: "उत्पादन सफलतापूर्वक मेटेको थियो।",
        variant: "default",
      })
    }
  }

  const handleBulkDelete = () => {
    if (selectedProductIds.length === 0) {
      alert("कुनै उत्पादन निवडिएन!")
      return
    }

    if (confirm("के तपाईं यो उत्पादनहरू मेटाउन चाहनुहुन्छ?")) {
      // Remove selected products from localStorage
      const adminProducts = JSON.parse(localStorage.getItem("adminProducts") || "[]")
      const updatedAdminProducts = adminProducts.filter((p: any) => !selectedProductIds.includes(p.id))
      localStorage.setItem("adminProducts", JSON.stringify(updatedAdminProducts))

      // Update state
      const updatedProducts = products.filter((p) => !selectedProductIds.includes(p.id))
      setProducts(updatedProducts)
      setSelectedProductIds([])
      toast({
        title: "उत्पादनहरू मेटेको!",
        description: "चयनित उत्पादनहरू सफलतापूर्वक मेटेको थियो।",
        variant: "default",
      })
    }
  }

  const getCategoryEmoji = (category: string) => {
    switch (category) {
      case "grocery":
        return "🍚"
      case "cosmetics":
        return "💄"
      case "daily-essentials":
        return "🛒"
      case "baby-products":
        return "👶"
      case "household":
        return "🏠"
      case "kitchen":
        return "🍳"
      default:
        return "📦"
    }
  }

  const getCategoryName = (category: string) => {
    switch (category) {
      case "grocery":
        return "खाद्य सामग्री"
      case "cosmetics":
        return "सौन्दर्य उत्पादन"
      case "daily-essentials":
        return "दैनिक सामान"
      case "baby-products":
        return "बच्चाका सामान"
      case "household":
        return "घरायसी सामान"
      case "kitchen":
        return "भान्साका सामान"
      default:
        return category
    }
  }

  const handleSelectProduct = (productId: string) => {
    setSelectedProductIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    )
  }

  const handleSelectAllProducts = () => {
    setSelectedProductIds(filteredProducts.map((product) => product.id))
  }

  const handleSelectNoneProducts = () => {
    setSelectedProductIds([])
  }

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

  const categories = ["grocery", "cosmetics", "daily-essentials", "baby-products", "household", "kitchen"]
  const totalProducts = products.length
  const adminProducts = products.filter((p) => !p.isDemo)
  const inStockProducts = products.filter((p) => p.inStock).length
  const outOfStockProducts = totalProducts - inStockProducts

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">📦 उत्पादन व्यवस्थापन</h1>
              <p className="text-gray-600">स्टोरमा देखिने सबै उत्पादनहरूको सूची र व्यवस्थापन</p>
            </div>
            <div className="flex space-x-3">
              <Link href="/products" target="_blank">
                <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  स्टोर हेर्नुहोस्
                </Button>
              </Link>
              <Link href="/admin/products/new">
                <Button className="bg-red-600 hover:bg-red-700">
                  <Plus className="h-4 w-4 mr-2" />
                  नयाँ उत्पादन थप्नुहोस्
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <Card className="border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-600">कुल उत्पादनहरू</p>
                    <p className="text-2xl font-bold text-blue-700">{totalProducts}</p>
                  </div>
                  <Package className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-600">एडमिन थपेका</p>
                    <p className="text-2xl font-bold text-purple-700">{adminProducts.length}</p>
                  </div>
                  <Plus className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-600">स्टकमा छ</p>
                    <p className="text-2xl font-bold text-green-700">{inStockProducts}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-red-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-red-600">स्टकमा छैन</p>
                    <p className="text-2xl font-bold text-red-700">{outOfStockProducts}</p>
                  </div>
                  <AlertCircle className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>
          </div>
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
                    placeholder="उत्पादन खोज्नुहोस् (नाम, ID, श्रेणी)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 border-orange-200 focus:border-red-400"
                  />
                </div>
              </div>
              <div className="md:w-64">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-orange-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="">सबै श्रेणी</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {getCategoryEmoji(category)} {getCategoryName(category)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bulk Actions */}
        <div className="mb-6">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
                <Trash2 className="h-4 w-4 mr-2" />
                बैच उत्पादनहरू मेट्नुहोस्
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>बैच उत्पादनहरू मेट्नुहोस्</DialogTitle>
                <DialogDescription>यसमा चयनित उत्पादनहरू मेट्नुहोस्। के तपाईं निश्चित हुनुहुन्छ?</DialogDescription>
              </DialogHeader>
              <div className="flex items-center justify-between mb-4">
                <Button variant="outline" onClick={handleSelectAllProducts}>
                  सबै निवड्नुहोस्
                </Button>
                <Button variant="outline" onClick={handleSelectNoneProducts}>
                  कुनै निवड्नुहोस्
                </Button>
              </div>
              <Button onClick={handleBulkDelete} className="bg-red-600 hover:bg-red-700">
                <Trash2 className="h-4 w-4 mr-2" />
                मेट्नुहोस्
              </Button>
            </DialogContent>
          </Dialog>
        </div>

        {/* Products Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-red-700">📋 उत्पादनहरूको सूची ({filteredProducts.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      <Checkbox
                        checked={selectedProductIds.length === filteredProducts.length}
                        onCheckedChange={handleSelectAllProducts}
                      />
                    </TableHead>
                    <TableHead>छवि</TableHead>
                    <TableHead>ID</TableHead>
                    <TableHead>नाम</TableHead>
                    <TableHead>श्रेणी</TableHead>
                    <TableHead>मूल्य</TableHead>
                    <TableHead>स्टक</TableHead>
                    <TableHead>स्थिति</TableHead>
                    <TableHead>प्रकार</TableHead>
                    <TableHead>कार्यहरू</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedProductIds.includes(product.id)}
                          onCheckedChange={() => handleSelectProduct(product.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <Image
                          src={product.image || "nns.png?height=300&width=300"}
                          alt={product.name}
                          width={50}
                          height={50}
                          className="rounded-lg border border-gray-200 object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = "nns.png?height=300&width=300"
                          }}
                          unoptimized={product.image?.startsWith("data:") ? true : false}
                        />
                      </TableCell>
                      <TableCell className="font-mono text-sm">{product.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-gray-500">{product.nameEn}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <span>{getCategoryEmoji(product.category)}</span>
                          <span className="text-sm">{getCategoryName(product.category)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-red-600">रु. {product.price}</p>
                          {product.originalPrice && (
                            <p className="text-sm text-gray-500 line-through">रु. {product.originalPrice}</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={`font-medium ${product.stock < 10 ? "text-red-600" : "text-green-600"}`}>
                          {product.stock}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge variant={product.inStock ? "default" : "destructive"}>
                          {product.inStock ? "स्टकमा छ" : "स्टकमा छैन"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={product.isDemo ? "secondary" : "outline"}>
                          {product.isDemo ? "डेमो" : "एडमिन"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Link href={`/products/${product.id}`} target="_blank">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-blue-200 text-blue-600 hover:bg-blue-50"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          {!product.isDemo && (
                            <>
                              <Link href={`/admin/products/${product.id}/edit`}>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-green-200 text-green-600 hover:bg-green-50"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </Link>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-red-200 text-red-600 hover:bg-red-50"
                                onClick={() => handleDeleteProduct(product.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">कुनै उत्पादन भेटिएन</h3>
                <p className="text-gray-500 mb-4">तपाईंको खोजी अनुसार कुनै उत्पादन भेटिएन।</p>
                <Link href="/admin/products/new">
                  <Button className="bg-red-600 hover:bg-red-700">
                    <Plus className="h-4 w-4 mr-2" />
                    पहिलो उत्पादन थप्नुहोस्
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
