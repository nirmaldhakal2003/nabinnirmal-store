"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

interface Product {
  id: string
  name: string
  nameEn?: string
  price: number
  originalPrice?: number
  image: string
  description: string
  category: string
  inStock: boolean
  discount?: number
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const addToCart = async () => {
    setIsLoading(true)

    try {
      // Get existing cart from localStorage
      const existingCart = JSON.parse(localStorage.getItem("cart") || "[]")

      // Check if product already exists in cart
      const existingItemIndex = existingCart.findIndex((item: any) => item.id === product.id)

      if (existingItemIndex > -1) {
        // Update quantity if item exists
        existingCart[existingItemIndex].quantity += 1
      } else {
        // Add new item to cart
        existingCart.push({
          id: product.id,
          name: product.name,
          nameEn: product.nameEn,
          price: product.price,
          image: product.image,
          quantity: 1,
        })
      }

      // Save updated cart to localStorage
      localStorage.setItem("cart", JSON.stringify(existingCart))

      toast({
        title: "कार्टमा थपियो",
        description: `${product.name} तपाईंको कार्टमा थपिएको छ।`,
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
      setIsLoading(false)
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

  return (
    <Card className="hover:shadow-lg transition-shadow border-orange-200 overflow-hidden h-full flex flex-col">
      <CardContent className="p-3 sm:p-4 flex-1">
        <div className="relative mb-3 sm:mb-4">
          <Image
            src={product.image || "nns.png?height=300&width=300"}
            alt={product.name}
            width={300}
            height={300}
            className="w-full h-36 sm:h-40 md:h-48 object-cover rounded-lg"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = "nns.png?height=300&width=300"
            }}
            unoptimized={product.image?.startsWith("data:") ? true : false}
          />
          {!product.inStock && (
            <Badge variant="destructive" className="absolute top-1 sm:top-2 right-1 sm:right-2 text-xs">
              स्टकमा छैन
            </Badge>
          )}
          {product.discount && (
            <Badge className="absolute top-1 sm:top-2 right-1 sm:right-2 bg-red-500 text-white text-xs">
              {product.discount}% छुट
            </Badge>
          )}
          <div className="absolute top-1 sm:top-2 left-1 sm:left-2 text-lg sm:text-xl md:text-2xl">
            {getCategoryEmoji(product.category)}
          </div>
        </div>
        <h3 className="font-semibold text-sm sm:text-base lg:text-lg mb-1 line-clamp-2">{product.name}</h3>
        {product.nameEn && (
          <p className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2 line-clamp-1">{product.nameEn}</p>
        )}
        <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2">{product.description}</p>
        <div className="flex items-center space-x-1 sm:space-x-2">
          <span className="text-lg sm:text-xl lg:text-2xl font-bold text-red-600">रु. {product.price}</span>
          {product.originalPrice && (
            <span className="text-xs sm:text-sm text-gray-500 line-through">रु. {product.originalPrice}</span>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-3 sm:p-4 pt-0 flex flex-col sm:flex-row gap-2">
        <Link href={`/products/${product.id}`} className="w-full sm:flex-1">
          <Button
            variant="outline"
            className="w-full border-red-200 text-red-600 hover:bg-red-50 text-xs sm:text-sm"
            size="sm"
          >
            विवरण हेर्नुहोस्
          </Button>
        </Link>
        <div className="flex gap-1 sm:gap-2 w-full sm:flex-1">
          <Button
            onClick={addToCart}
            disabled={!product.inStock || isLoading}
            className="flex-1 bg-red-600 hover:bg-red-700 text-xs sm:text-sm"
            size="sm"
          >
            {isLoading ? "थप्दै..." : "🛒"}
          </Button>
          <Button
            onClick={() => {
              addToCart()
              setTimeout(() => {
                window.location.href = "/checkout"
              }, 500)
            }}
            disabled={!product.inStock}
            className="flex-1 bg-green-600 hover:bg-green-700 text-xs sm:text-sm"
            size="sm"
          >
            ⚡ किन्नुहोस्
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
