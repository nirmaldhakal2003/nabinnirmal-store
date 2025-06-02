import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Nepali grocery and cosmetic products
const featuredProducts = [
  {
    id: "1",
    name: "बासमती चामल",
    nameEn: "Basmati Rice",
    price: 180,
    originalPrice: 200,
    image: "istockphoto-489843870-612x612.jpg?height=300&width=300",
    description: "उच्च गुणस्तरको बासमती चामल - १ केजी",
    category: "grocery",
    discount: 10,
  },
  {
    id: "2",
    name: "हिमालयन फेस क्रीम",
    nameEn: "Himalayan Face Cream",
    price: 450,
    originalPrice: 500,
    image: "14485711_5470687.svg?height=300&width=300",
    description: "प्राकृतिक जडिबुटीले बनेको फेस क्रीम",
    category: "cosmetics",
    discount: 10,
  },
  {
    id: "3",
    name: "दाल भात मसला",
    nameEn: "Dal Bhat Masala",
    price: 85,
    originalPrice: 95,
    image: "81860049_13 -37.jpg?height=300&width=300",
    description: "नेपाली खानाको लागि विशेष मसला",
    category: "grocery",
    discount: 11,
  },
  {
    id: "4",
    name: "आयुर्वेदिक शैम्पू",
    nameEn: "Ayurvedic Shampoo",
    price: 320,
    originalPrice: 380,
    image: "bottles-with-scrub-hand-made-soap-isolated-white.jpg?height=300&width=300",
    description: "बालको स्वास्थ्यको लागि आयुर्वेदिक शैम्पू",
    category: "cosmetics",
    discount: 16,
  },
]

export default function FeaturedProducts() {
  return (
    <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-b from-orange-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">🌟 विशेष उत्पादनहरू</h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-4">
            हाम्रा सबैभन्दा लोकप्रिय र गुणस्तरीय उत्पादनहरूको संग्रह
          </p>
        </div>

        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {featuredProducts.map((product) => (
            <Card
              key={product.id}
              className="hover:shadow-lg transition-shadow border-orange-200 overflow-hidden h-full flex flex-col"
            >
              <CardContent className="p-3 sm:p-4 flex-1">
                <div className="relative mb-3 sm:mb-4">
                  <Image
                    src={product.image || "nns.png"}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="w-full h-32 sm:h-40 md:h-48 object-cover rounded-lg"
                  />
                  {product.discount && (
                    <Badge className="absolute top-1 sm:top-2 right-1 sm:right-2 bg-red-500 text-white text-xs">
                      {product.discount}% छुट
                    </Badge>
                  )}
                  <div className="absolute top-1 sm:top-2 left-1 sm:left-2 text-lg sm:text-xl">
                    {product.category === "grocery" ? "🛒" : "💄"}
                  </div>
                </div>
                <h3 className="font-semibold text-sm sm:text-base lg:text-lg mb-1 line-clamp-2">{product.name}</h3>
                <p className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2 line-clamp-1">{product.nameEn}</p>
                <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2">{product.description}</p>
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <span className="text-lg sm:text-xl lg:text-2xl font-bold text-red-600">रु. {product.price}</span>
                  {product.originalPrice && (
                    <span className="text-xs sm:text-sm text-gray-500 line-through">रु. {product.originalPrice}</span>
                  )}
                </div>
              </CardContent>
              <CardFooter className="p-3 sm:p-4 pt-0">
                <Link href={`/products/${product.id}`} className="w-full">
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-xs sm:text-sm" size="sm">
                    🛍️ विवरण हेर्नुहोस्
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link href="/products">
            <Button
              size="lg"
              variant="outline"
              className="border-red-200 text-red-600 hover:bg-red-50 text-sm sm:text-base"
            >
              सबै उत्पादनहरू हेर्नुहोस् →
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
