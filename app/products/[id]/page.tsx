"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import {
  ArrowLeft,
  ShoppingCart,
  Heart,
  Share2,
  Minus,
  Plus,
  Star,
  Truck,
  Shield,
  RotateCcw,
  MessageCircle,
} from "lucide-react"

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [product, setProduct] = useState<any>(null)
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    // Load product data
    const loadProduct = () => {
      // Demo products
      const demoProducts = [
        {
          id: "demo-1",
          name: "बासमती चामल",
          nameEn: "Basmati Rice",
          price: 180,
          originalPrice: 200,
          image: "nns.png?height=400&width=400",
          description:
            "उच्च गुणस्तरको बासमती चामल - १ केजी। खुसबुदार र स्वादिष्ट। यो चामल रामपुरको उत्कृष्ट क्षेत्रबाट ल्याइएको हो र यसमा प्राकृतिक सुगन्ध छ। खाना पकाउँदा यसले राम्रो स्वाद दिन्छ र दाल भातसँग मिलाएर खाँदा अत्यन्तै स्वादिष्ट हुन्छ।",
          category: "grocery",
          inStock: true,
          discount: 10,
          brand: "हिमालयन राइस",
          weight: "१ केजी",
          rating: 4.5,
          reviews: 23,
          features: ["प्राकृतिक सुगन्ध", "उच्च गुणस्तर", "पोषणयुक्त", "लामो दाना"],
        },
      ]

      // Get admin products
      const adminProducts = JSON.parse(localStorage.getItem("adminProducts") || "[]")
      const allProducts = [...demoProducts, ...adminProducts]

      const foundProduct = allProducts.find((p) => p.id === params.id)

      if (foundProduct) {
        setProduct(foundProduct)
      } else {
        // Product not found
        router.push("/products")
      }
      setIsLoading(false)
    }

    loadProduct()
  }, [params.id, router])

  const addToCart = async () => {
    if (!product) return

    setIsAddingToCart(true)

    try {
      // Get existing cart from localStorage
      const existingCart = JSON.parse(localStorage.getItem("cart") || "[]")

      // Check if product already exists in cart
      const existingItemIndex = existingCart.findIndex((item: any) => item.id === product.id)

      if (existingItemIndex > -1) {
        // Update quantity if item exists
        existingCart[existingItemIndex].quantity += quantity
      } else {
        // Add new item to cart
        existingCart.push({
          id: product.id,
          name: product.name,
          nameEn: product.nameEn,
          price: product.price,
          image: product.image,
          quantity: quantity,
        })
      }

      // Save updated cart to localStorage
      localStorage.setItem("cart", JSON.stringify(existingCart))

      toast({
        title: "कार्टमा थपियो",
        description: `${product.name} (${quantity} वटा) तपाईंको कार्टमा थपिएको छ।`,
      })

      // Trigger cart count update
      window.dispatchEvent(new Event("cartUpdated"))
    } catch (error) {
      toast({
        title: "त्रुटि",
        description: "कार्टमा थप्न सकिएन। पुनः प्रयास गर्नुहोस्।",
        variant: "destructive",
      })
    } finally {
      setIsAddingToCart(false)
    }
  }

  const buyNow = () => {
    // Add to cart first
    addToCart()
    // Then redirect to checkout
    setTimeout(() => {
      router.push("/checkout")
    }, 500)
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
    toast({
      title: isFavorite ? "मनपर्नेबाट हटाइयो" : "मनपर्नेमा थपियो",
      description: isFavorite ? "उत्पादन मनपर्ने सूचीबाट हटाइएको छ।" : "उत्पादन मनपर्ने सूचीमा थपिएको छ।",
    })
  }

  const shareProduct = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.name,
        text: product?.description,
        url: window.location.href,
      })
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href)
      toast({
        title: "लिंक कपी भयो",
        description: "उत्पादनको लिंक clipboard मा कपी भएको छ।",
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">उत्पादन भेटिएन</h1>
          <Link href="/products">
            <Button className="bg-red-600 hover:bg-red-700">उत्पादनहरू हेर्नुहोस्</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Breadcrumb */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
            <Link href="/" className="hover:text-red-600">
              गृहपृष्ठ
            </Link>
            <span>/</span>
            <Link href="/products" className="hover:text-red-600">
              उत्पादनहरू
            </Link>
            <span>/</span>
            <span className="text-gray-800">{product.name}</span>
          </div>

          <Link href="/products">
            <Button variant="outline" size="sm" className="border-red-200 text-red-600 hover:bg-red-50">
              <ArrowLeft className="h-4 w-4 mr-2" />
              फिर्ता
            </Button>
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <Card className="border-orange-200 overflow-hidden">
              <CardContent className="p-0">
                <div className="relative">
                  <Image
                    src={product.image || "nns.png?height=400&width=400"}
                    alt={product.name}
                    width={500}
                    height={500}
                    className="w-full h-96 object-cover"
                    unoptimized={product.image?.startsWith("data:") ? true : false}
                  />
                  {product.discount && (
                    <Badge className="absolute top-4 right-4 bg-red-500 text-white text-lg px-3 py-1">
                      {product.discount}% छुट
                    </Badge>
                  )}
                  <div className="absolute top-4 left-4 text-3xl">{getCategoryEmoji(product.category)}</div>
                </div>
              </CardContent>
            </Card>

            {/* Product Features */}
            {product.features && (
              <Card className="border-orange-200">
                <CardHeader>
                  <CardTitle className="text-green-700">✨ विशेषताहरू</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {product.features.map((feature: string, index: number) => (
                      <div key={index} className="flex items-center space-x-2">
                        <span className="text-green-600">✓</span>
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Basic Info */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleFavorite}
                    className={`border-red-200 ${isFavorite ? "bg-red-50 text-red-600" : "text-gray-600"}`}
                  >
                    <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
                  </Button>
                  <Button variant="outline" size="sm" onClick={shareProduct} className="border-red-200 text-gray-600">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {product.nameEn && <p className="text-lg text-gray-500 mb-2">{product.nameEn}</p>}

              {/* Rating */}
              {product.rating && (
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.rating} ({product.reviews} समीक्षा)
                  </span>
                </div>
              )}

              {/* Price */}
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-3xl font-bold text-red-600">रु. {product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">रु. {product.originalPrice}</span>
                )}
                {product.discount && <Badge className="bg-green-100 text-green-800">{product.discount}% बचत</Badge>}
              </div>

              {/* Stock Status */}
              <div className="mb-4">
                {product.inStock ? (
                  <Badge className="bg-green-100 text-green-800">✅ स्टकमा उपलब्ध</Badge>
                ) : (
                  <Badge variant="destructive">❌ स्टकमा छैन</Badge>
                )}
              </div>

              {/* Product Info */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {product.brand && (
                  <div>
                    <span className="text-sm text-gray-600">ब्रान्ड:</span>
                    <p className="font-medium">{product.brand}</p>
                  </div>
                )}
                {product.weight && (
                  <div>
                    <span className="text-sm text-gray-600">तौल:</span>
                    <p className="font-medium">{product.weight}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Quantity Selector */}
            <Card className="border-orange-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">मात्रा:</span>
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      className="border-orange-200"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-xl font-bold w-12 text-center">{quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(quantity + 1)}
                      className="border-orange-200"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="mt-3 text-right">
                  <span className="text-lg font-bold text-red-600">कुल: रु. {(product.price * quantity).toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={addToCart}
                disabled={!product.inStock || isAddingToCart}
                variant="outline"
                size="lg"
                className="border-red-200 text-red-600 hover:bg-red-50"
              >
                {isAddingToCart ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                    <span>थप्दै...</span>
                  </div>
                ) : (
                  <>
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    कार्टमा थप्नुहोस्
                  </>
                )}
              </Button>

              <Button onClick={buyNow} disabled={!product.inStock} size="lg" className="bg-red-600 hover:bg-red-700">
                🛒 अहिले किन्नुहोस्
              </Button>
            </div>

            {/* Services */}
            <Card className="border-orange-200">
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="flex flex-col items-center space-y-2">
                    <Truck className="h-6 w-6 text-green-600" />
                    <span className="text-sm font-medium">निःशुल्क डेलिभरी</span>
                    <span className="text-xs text-gray-500">रु. २००० माथि</span>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <RotateCcw className="h-6 w-6 text-blue-600" />
                    <span className="text-sm font-medium">७ दिन फिर्ता</span>
                    <span className="text-xs text-gray-500">सजिलो फिर्ता नीति</span>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <Shield className="h-6 w-6 text-purple-600" />
                    <span className="text-sm font-medium">गुणस्तर ग्यारेन्टी</span>
                    <span className="text-xs text-gray-500">१००% प्रामाणिक</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact for Questions */}
            <Card className="border-orange-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">प्रश्न छ?</h3>
                    <p className="text-sm text-gray-600">हामीलाई सम्पर्क गर्नुहोस्</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-green-200 text-green-600 hover:bg-green-50"
                    onClick={() => {
                      const message = `नमस्कार! मलाई ${product.name} बारे जानकारी चाहिएको छ।`
                      window.open(`https://wa.me/9779748845865?text=${encodeURIComponent(message)}`, "_blank")
                    }}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    WhatsApp
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Product Description */}
        <Card className="mt-8 border-orange-200">
          <CardHeader>
            <CardTitle className="text-blue-700">📝 उत्पादन विवरण</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
