import Link from "next/link"
import { ShoppingBasket, Sparkles, Coffee, Baby, Home, Utensils } from "lucide-react"

const categories = [
  {
    name: "दैनिक सामान",
    nameEn: "Daily Essentials",
    icon: ShoppingBasket,
    href: "/products?category=daily-essentials",
    emoji: "🛒",
  },
  {
    name: "सौन्दर्य उत्पादन",
    nameEn: "Beauty Products",
    icon: Sparkles,
    href: "/products?category=cosmetics",
    emoji: "💄",
  },
  {
    name: "खाद्य सामग्री",
    nameEn: "Grocery Items",
    icon: Coffee,
    href: "/products?category=grocery",
    emoji: "🍚",
  },
  {
    name: "बच्चाका सामान",
    nameEn: "Baby Products",
    icon: Baby,
    href: "/products?category=baby-products",
    emoji: "👶",
  },
  {
    name: "घरायसी सामान",
    nameEn: "Household Items",
    icon: Home,
    href: "/products?category=household",
    emoji: "🏠",
  },
  {
    name: "भान्साका सामान",
    nameEn: "Kitchen Items",
    icon: Utensils,
    href: "/products?category=kitchen",
    emoji: "🍳",
  },
]

export default function Categories() {
  return (
    <section className="py-8 sm:py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
            📂 श्रेणी अनुसार किनमेल गर्नुहोस्
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-4">
            तपाईंको आवश्यकता अनुसार उत्पादनहरू छान्नुहोस्
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="flex flex-col items-center p-3 sm:p-4 md:p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 group border border-orange-100 hover:border-red-200"
            >
              <div className="text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3 group-hover:scale-110 transition-transform">
                {category.emoji}
              </div>
              <span className="font-semibold text-gray-800 text-center mb-1 text-xs sm:text-sm md:text-base line-clamp-2">
                {category.name}
              </span>
              <span className="text-xs text-gray-500 text-center hidden sm:block line-clamp-1">{category.nameEn}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
