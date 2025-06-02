"use client"

import { useState, useEffect, useMemo, Suspense, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import ProductCard from "@/components/ProductCard"
import ProductFilters from "@/components/ProductFilters"
import Pagination from "@/components/Pagination"
import Loading from "@/components/Loading"

// Demo products data
const demoProducts = [
  {
    id: "demo-1",
    name: "बासमती चामल",
    nameEn: "Basmati Rice",
    price: 180,
    originalPrice: 200,
    image: "nns.png?height=300&width=300",
    description: "उच्च गुणस्तरको बासमती चामल - १ केजी। खुसबुदार र स्वादिष्ट।",
    category: "grocery",
    inStock: true,
    discount: 10,
  },
  {
    id: "demo-2",
    name: "हिमालयन फेस क्रीम",
    nameEn: "Himalayan Face Cream",
    price: 450,
    originalPrice: 500,
    image: "nns.png?height=300&width=300",
    description: "प्राकृतिक जडिबुटीले बनेको फेस क्रीम। सबै प्रकारको छालाको लागि उपयुक्त।",
    category: "cosmetics",
    inStock: true,
    discount: 10,
  },
  {
    id: "demo-3",
    name: "दाल भात मसला",
    nameEn: "Dal Bhat Masala",
    price: 85,
    originalPrice: 95,
    image: "nns.png?height=300&width=300",
    description: "नेपाली खानाको लागि विशेष मसला। घरेलु स्वादको लागि उत्तम।",
    category: "grocery",
    inStock: true,
    discount: 11,
  },
  {
    id: "demo-4",
    name: "आयुर्वेदिक शैम्पू",
    nameEn: "Ayurvedic Shampoo",
    price: 320,
    originalPrice: 380,
    image: "nns.png?height=300&width=300",
    description: "बालको स्वास्थ्यको लागि आयुर्वेदिक शैम्पू। प्राकृतिक सामग्रीले भरपूर।",
    category: "cosmetics",
    inStock: true,
    discount: 16,
  },
  {
    id: "demo-5",
    name: "चिया पत्ती",
    nameEn: "Tea Leaves",
    price: 120,
    originalPrice: 140,
    image: "nns.png?height=300&width=300",
    description: "इलामको उच्च गुणस्तरको चिया पत्ती। ताजा र सुगन्धित।",
    category: "grocery",
    inStock: true,
    discount: 14,
  },
  {
    id: "demo-6",
    name: "नेपाली साबुन",
    nameEn: "Nepali Soap",
    price: 45,
    originalPrice: 55,
    image: "nns.png?height=300&width=300",
    description: "प्राकृतिक सामग्रीले बनेको साबुन। छालाको लागि सुरक्षित।",
    category: "daily-essentials",
    inStock: false,
    discount: 18,
  },
]

function ProductsContent() {
  const searchParams = useSearchParams()
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [allProducts, setAllProducts] = useState(demoProducts)

  // Get URL parameters
  const urlCategory = searchParams.get("category") || ""
  const urlSearch = searchParams.get("search") || ""

  // Local filter state
  const [localFilters, setLocalFilters] = useState({
    minPrice: "",
    maxPrice: "",
    inStock: false,
  })

  // Load admin products on component mount
  useEffect(() => {
    const adminProducts = JSON.parse(localStorage.getItem("adminProducts") || "[]")
    const combinedProducts = [...demoProducts, ...adminProducts]
    setAllProducts(combinedProducts)
  }, [])

  // Combine URL params with local filters
  const filters = useMemo(
    () => ({
      category: urlCategory,
      search: urlSearch,
      ...localFilters,
    }),
    [urlCategory, urlSearch, localFilters],
  )

  // Filter products using useMemo to prevent unnecessary recalculations
  const filteredProducts = useMemo(() => {
    let filtered = [...allProducts]

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchLower) ||
          product.nameEn?.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower) ||
          product.category.toLowerCase().includes(searchLower),
      )
    }

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter((product) => product.category === filters.category)
    }

    // Apply price filters
    if (filters.minPrice) {
      filtered = filtered.filter((product) => product.price >= Number.parseFloat(filters.minPrice))
    }

    if (filters.maxPrice) {
      filtered = filtered.filter((product) => product.price <= Number.parseFloat(filters.maxPrice))
    }

    // Apply stock filter
    if (filters.inStock) {
      filtered = filtered.filter((product) => product.inStock)
    }

    return filtered
  }, [filters, allProducts])

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [filteredProducts.length])

  // Simulate loading when filters change
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [filters.search, filters.category])

  // Stable setFilters function
  const setFilters = useCallback((newFilters: typeof filters) => {
    setLocalFilters({
      minPrice: newFilters.minPrice,
      maxPrice: newFilters.maxPrice,
      inStock: newFilters.inStock,
    })
  }, [])

  const productsPerPage = 6
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
  const startIndex = (currentPage - 1) * productsPerPage
  const currentProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage)

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">🛍️ हाम्रा उत्पादनहरू</h1>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <p className="text-gray-600 mb-2 sm:mb-0">
              {filteredProducts.length} मध्ये {allProducts.length} उत्पादनहरू देखाइएको छ
            </p>
            {filters.search && (
              <div className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">खोजी: "{filters.search}"</div>
            )}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <ProductFilters filters={filters} setFilters={setFilters} />
          </div>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
                <span className="ml-3 text-gray-600">खोजी गर्दै...</span>
              </div>
            ) : currentProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {currentProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {totalPages > 1 && (
                  <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">😔</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">कुनै उत्पादन भेटिएन</h3>
                <p className="text-gray-500 text-lg mb-4">तपाईंको खोजी अनुसार कुनै उत्पादन भेटिएन।</p>
                {filters.search && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-md mx-auto">
                    <p className="text-sm text-yellow-800">💡 सुझाव: फरक शब्दहरू प्रयोग गर्नुहोस् वा फिल्टरहरू हटाउनुहोस्</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<Loading />}>
      <ProductsContent />
    </Suspense>
  )
}
