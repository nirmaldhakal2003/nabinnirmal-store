"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"

interface CartItem {
  id: string
  name: string
  nameEn?: string
  price: number
  image: string
  quantity: number
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      setCartItems(JSON.parse(savedCart))
    }
    setIsLoading(false)
  }, [])

  const updateCart = (newCart: CartItem[]) => {
    setCartItems(newCart)
    localStorage.setItem("cart", JSON.stringify(newCart))
    window.dispatchEvent(new Event("cartUpdated"))
  }

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return

    const updatedCart = cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
    updateCart(updatedCart)
  }

  const removeItem = (id: string) => {
    const updatedCart = cartItems.filter((item) => item.id !== id)
    updateCart(updatedCart)
    toast({
      title: "वस्तु हटाइयो",
      description: "वस्तु तपाईंको कार्टबाट हटाइएको छ।",
    })
  }

  const clearCart = () => {
    updateCart([])
    toast({
      title: "कार्ट खाली गरियो",
      description: "सबै वस्तुहरू तपाईंको कार्टबाट हटाइएका छन्।",
    })
  }

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = subtotal > 2000 ? 0 : 100 // Free shipping over Rs. 2000
  const tax = subtotal * 0.13 // 13% VAT in Nepal
  const total = subtotal + shipping + tax

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

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-16">
            <ShoppingBag className="h-24 w-24 text-gray-400 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-800 mb-4">🛒 तपाईंको कार्ट खाली छ</h1>
            <p className="text-gray-600 mb-8">तपाईंले अझै आफ्नो कार्टमा कुनै वस्तु थप्नुभएको छैन जस्तो देखिन्छ।</p>
            <Link href="/products">
              <Button size="lg" className="bg-red-600 hover:bg-red-700">
                🛍️ किनमेल सुरु गर्नुहोस्
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">🛒 किनमेल कार्ट</h1>
          <p className="text-gray-600">{cartItems.length} वस्तु तपाईंको कार्टमा छ</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card className="border-orange-200">
              <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-red-50 to-orange-50">
                <CardTitle className="text-red-700">कार्टका वस्तुहरू</CardTitle>
                <Button
                  onClick={clearCart}
                  variant="outline"
                  size="sm"
                  className="border-red-200 text-red-600 hover:bg-red-50"
                >
                  🗑️ कार्ट खाली गर्नुहोस्
                </Button>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center space-x-4 p-4 border border-orange-200 rounded-lg bg-gradient-to-r from-white to-orange-50"
                    >
                      <Image
                        src={item.image || "nns.png"}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="rounded-lg border border-orange-200"
                      />

                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{item.name}</h3>
                        {item.nameEn && <p className="text-sm text-gray-500">{item.nameEn}</p>}
                        <p className="text-red-600 font-medium">रु. {item.price}</p>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="border-orange-200 text-red-600 hover:bg-red-50"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value) || 1)}
                          className="w-16 text-center border-orange-200 focus:border-red-400"
                          min="1"
                        />
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="border-orange-200 text-red-600 hover:bg-red-50"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="text-right">
                        <p className="font-semibold text-red-600">रु. {(item.price * item.quantity).toFixed(2)}</p>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 hover:text-red-800 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="border-orange-200">
              <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50">
                <CardTitle className="text-red-700">📋 अर्डर सारांश</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <div className="flex justify-between">
                  <span>उप-जम्मा:</span>
                  <span>रु. {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>डेलिभरी शुल्क:</span>
                  <span>{shipping === 0 ? "निःशुल्क" : `रु. ${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>कर (१३% VAT):</span>
                  <span>रु. {tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-orange-200 pt-4">
                  <div className="flex justify-between font-bold text-lg text-red-700">
                    <span>कुल जम्मा:</span>
                    <span>रु. {total.toFixed(2)}</span>
                  </div>
                </div>

                {subtotal < 2000 && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <p className="text-sm text-yellow-800">
                      💡 रु. {(2000 - subtotal).toFixed(2)} थप किनमेल गर्नुहोस् र निःशुल्क डेलिभरी पाउनुहोस्!
                    </p>
                  </div>
                )}

                <div className="space-y-3">
                  <Button className="w-full bg-red-600 hover:bg-red-700" size="lg">
                    <Link href="/checkout" className="flex items-center justify-center w-full">
                      💳 चेकआउट गर्नुहोस्
                    </Link>
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full border-green-200 text-green-600 hover:bg-green-50"
                    onClick={() => {
                      const message = `नमस्कार! मलाई यी उत्पादनहरू चाहिएको छ:\n${cartItems.map((item) => `• ${item.name} (${item.quantity}x)`).join("\n")}\nकुल रकम: रु. ${total.toFixed(2)}`
                      window.open(`https://wa.me/9779748845865?text=${encodeURIComponent(message)}`, "_blank")
                    }}
                  >
                    📱 WhatsApp मार्फत अर्डर गर्नुहोस्
                  </Button>
                </div>

                <Link href="/products">
                  <Button variant="outline" className="w-full border-red-200 text-red-600 hover:bg-red-50">
                    🛍️ किनमेल जारी राख्नुहोस्
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="mt-6 border-orange-200">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
                <CardTitle className="text-blue-700">🛍️ थप किनमेल गर्नुहोस्</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-sm text-gray-600 mb-3">
                  रु. {(2000 - subtotal > 0 ? 2000 - subtotal : 0).toFixed(2)} थप किनमेल गर्नुहोस् र निःशुल्क डेलिभरी पाउनुहोस्!
                </p>
                <Link href="/products">
                  <Button variant="outline" className="w-full border-blue-200 text-blue-600 hover:bg-blue-50">
                    🛒 थप उत्पादनहरू हेर्नुहोस्
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card className="mt-6 border-orange-200">
              <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50">
                <CardTitle className="text-green-700">💳 भुक्तानी विधिहरू</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <span>💰</span>
                    <span>नगद</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>📱</span>
                    <span>eSewa</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>🏦</span>
                    <span>Khalti</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>💳</span>
                    <span>बैंक कार्ड</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
