"use client"

import { useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const categories = [
  { value: "", label: "सबै श्रेणी", emoji: "📦" },
  { value: "grocery", label: "खाद्य सामग्री", emoji: "🍚" },
  { value: "cosmetics", label: "सौन्दर्य उत्पादन", emoji: "💄" },
  { value: "daily-essentials", label: "दैनिक सामान", emoji: "🛒" },
  { value: "baby-products", label: "बच्चाका सामान", emoji: "👶" },
  { value: "household", label: "घरायसी सामान", emoji: "🏠" },
  { value: "kitchen", label: "भान्साका सामान", emoji: "🍳" },
]

interface Filters {
  category: string
  search: string
  minPrice: string
  maxPrice: string
  inStock: boolean
}

interface ProductFiltersProps {
  filters: Filters
  setFilters: (filters: Filters) => void
}

export default function ProductFilters({ filters, setFilters }: ProductFiltersProps) {
  const handleFilterChange = useCallback(
    (key: keyof Filters, value: string | boolean) => {
      setFilters({ ...filters, [key]: value })
    },
    [filters, setFilters],
  )

  const clearFilters = useCallback(() => {
    setFilters({
      category: "",
      search: "",
      minPrice: "",
      maxPrice: "",
      inStock: false,
    })
  }, [setFilters])

  return (
    <Card className="border-orange-200">
      <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50">
        <CardTitle className="text-red-700">🔍 फिल्टर गर्नुहोस्</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        {/* Search - Read-only display since it comes from URL */}
        <div>
          <Label htmlFor="search" className="text-gray-700 font-medium">
            खोज्नुहोस्
          </Label>
          <Input
            id="search"
            type="text"
            placeholder="हेडरबाट खोज्नुहोस्..."
            value={filters.search}
            readOnly
            className="border-orange-200 bg-gray-50 cursor-not-allowed"
          />
          {filters.search && (
            <p className="text-xs text-gray-500 mt-1">हेडरको खोज बारबाट खोजी गरिएको: "{filters.search}"</p>
          )}
        </div>

        {/* Category - Read-only display since it comes from URL */}
        <div>
          <Label className="text-gray-700 font-medium">श्रेणी</Label>
          <div className="space-y-3 mt-3">
            {categories.map((category) => (
              <div key={category.value} className="flex items-center space-x-3">
                <input
                  type="radio"
                  id={`category-${category.value}`}
                  name="category"
                  value={category.value}
                  checked={filters.category === category.value}
                  readOnly
                  className="text-red-600 focus:ring-red-500 cursor-not-allowed"
                />
                <Label
                  htmlFor={`category-${category.value}`}
                  className="text-sm flex items-center space-x-2 cursor-not-allowed"
                >
                  <span>{category.emoji}</span>
                  <span>{category.label}</span>
                </Label>
              </div>
            ))}
          </div>
          {filters.category && <p className="text-xs text-gray-500 mt-2">URL बाट छानिएको श्रेणी</p>}
        </div>

        {/* Price Range */}
        <div>
          <Label className="text-gray-700 font-medium">मूल्य दायरा (रु.)</Label>
          <div className="flex space-x-2 mt-3">
            <Input
              type="number"
              placeholder="न्यूनतम"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange("minPrice", e.target.value)}
              className="border-orange-200 focus:border-red-400"
            />
            <Input
              type="number"
              placeholder="अधिकतम"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
              className="border-orange-200 focus:border-red-400"
            />
          </div>
        </div>

        {/* In Stock */}
        <div className="flex items-center space-x-3">
          <Checkbox
            id="inStock"
            checked={filters.inStock}
            onCheckedChange={(checked) => handleFilterChange("inStock", !!checked)}
            className="border-orange-300 data-[state=checked]:bg-red-600"
          />
          <Label htmlFor="inStock" className="text-sm cursor-pointer">
            ✅ स्टकमा भएका मात्र
          </Label>
        </div>

        {/* Clear Filters */}
        <Button onClick={clearFilters} variant="outline" className="w-full border-red-200 text-red-600 hover:bg-red-50">
          🗑️ फिल्टर हटाउनुहोस्
        </Button>
      </CardContent>
    </Card>
  )
}
