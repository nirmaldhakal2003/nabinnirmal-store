"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ShoppingCart, User, Menu, X, Search, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token")
    setIsLoggedIn(!!token)

    // Get cart count
    const cart = JSON.parse(localStorage.getItem("cart") || "[]")
    setCartCount(cart.reduce((total: number, item: any) => total + item.quantity, 0))

    // Listen for cart updates
    const handleCartUpdate = () => {
      const updatedCart = JSON.parse(localStorage.getItem("cart") || "[]")
      setCartCount(updatedCart.reduce((total: number, item: any) => total + item.quantity, 0))
    }

    window.addEventListener("cartUpdated", handleCartUpdate)
    return () => window.removeEventListener("cartUpdated", handleCartUpdate)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setIsLoggedIn(false)
    router.push("/")
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setIsSearching(true)

      // Add a small delay to show loading state
      setTimeout(() => {
        router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
        setIsSearching(false)
        setIsMenuOpen(false) // Close mobile menu after search
      }, 300)
    }
  }

  const clearSearch = () => {
    setSearchQuery("")
    router.push("/products")
  }

  return (
    <>
      {/* Top Bar - Hidden on small screens */}
      <div className="bg-red-600 text-white py-1 text-xs sm:text-sm hidden sm:block">
        <div className="container mx-auto px-2 sm:px-4 flex justify-between items-center">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="flex items-center space-x-1">
              <MapPin className="h-3 w-3" />
              <span className="hidden sm:inline">रामपुर पाल्पा, नेपाल</span>
              <span className="sm:hidden">KTM</span>
            </div>
            <div className="flex items-center space-x-1">
              <Phone className="h-3 w-3" />
              <span>9748845865</span>
            </div>
          </div>
          <div className="hidden md:block">
            <span>🇳🇵 रामपुरको भरपर्दो अनलाइन पसल</span>
          </div>
        </div>
      </div>

      <header className="bg-white shadow-md sticky top-0 z-50 border-b-2 border-orange-200">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
              <Image
                src="nns.png?height=32&width=32"
                alt="NabinNirmal Store Logo"
                width={32}
                height={32}
                className="rounded-lg border border-red-200 w-6 h-6 sm:w-8 sm:h-8"
              />
              <div className="hidden sm:block">
                <div className="text-sm sm:text-xl font-bold text-red-600">नबिन निर्मल स्टोर</div>
                <div className="text-xs text-gray-600 hidden md:block">NabinNirmal Store</div>
              </div>
              <div className="sm:hidden">
                <div className="text-sm font-bold text-red-600">नबिन निर्मल</div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              <Link
                href="/"
                className="text-gray-700 hover:text-red-600 transition-colors font-medium text-sm xl:text-base"
              >
                गृहपृष्ठ
              </Link>
              <Link
                href="/products"
                className="text-gray-700 hover:text-red-600 transition-colors font-medium text-sm xl:text-base"
              >
                उत्पादनहरू
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-red-600 transition-colors font-medium text-sm xl:text-base"
              >
                हाम्रो बारे
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-red-600 transition-colors font-medium text-sm xl:text-base"
              >
                सम्पर्क
              </Link>
            </nav>

            {/* Search Bar - Hidden on mobile */}
            <form onSubmit={handleSearch} className="hidden md:flex items-center space-x-2 flex-1 max-w-md mx-4">
              <div className="relative flex-1">
                <Input
                  type="text"
                  placeholder="उत्पादन खोज्नुहोस्..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full border-orange-200 focus:border-red-400 pr-8 text-sm"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              <Button
                type="submit"
                size="sm"
                className="bg-red-600 hover:bg-red-700 px-2 sm:px-3"
                disabled={isSearching}
              >
                {isSearching ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <Search className="h-4 w-4" />
                )}
              </Button>
            </form>

            {/* User Actions */}
            <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-4">
              {/* Cart */}
              <Link href="/cart" className="relative">
                <div className="p-1.5 sm:p-2 bg-orange-100 rounded-full hover:bg-orange-200 transition-colors">
                  <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-red-600" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center animate-pulse text-xs">
                      {cartCount > 99 ? "99+" : cartCount}
                    </span>
                  )}
                </div>
              </Link>

              {/* User Menu - Desktop */}
              {isLoggedIn ? (
                <div className="hidden sm:flex items-center space-x-2">
                  <Link href="/dashboard">
                    <div className="p-1.5 sm:p-2 bg-orange-100 rounded-full hover:bg-orange-200 transition-colors">
                      <User className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-red-600" />
                    </div>
                  </Link>
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    size="sm"
                    className="border-red-200 text-red-600 hover:bg-red-50 text-xs sm:text-sm hidden lg:flex"
                  >
                    बाहिर निस्कनु
                  </Button>
                </div>
              ) : (
                <div className="hidden sm:flex items-center space-x-1 sm:space-x-2">
                  <Link href="/login">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-red-200 text-red-600 hover:bg-red-50 text-xs sm:text-sm"
                    >
                      लगइन
                    </Button>
                  </Link>
                  <Link href="/signup" className="hidden md:block">
                    <Button size="sm" className="bg-red-600 hover:bg-red-700 text-xs sm:text-sm">
                      दर्ता गर्नुहोस्
                    </Button>
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button className="lg:hidden p-1" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
                {isMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden py-4 border-t border-orange-200 bg-white">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="flex space-x-2 mb-4 px-2">
                <div className="relative flex-1">
                  <Input
                    type="text"
                    placeholder="खोज्नुहोस्..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border-orange-200 pr-8 text-sm"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={clearSearch}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <Button type="submit" size="sm" className="bg-red-600 hover:bg-red-700" disabled={isSearching}>
                  {isSearching ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <Search className="h-4 w-4" />
                  )}
                </Button>
              </form>

              {/* Mobile Navigation */}
              <nav className="flex flex-col space-y-3 px-2">
                <Link
                  href="/"
                  className="text-gray-700 hover:text-red-600 font-medium py-2 px-3 rounded-lg hover:bg-red-50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  गृहपृष्ठ
                </Link>
                <Link
                  href="/products"
                  className="text-gray-700 hover:text-red-600 font-medium py-2 px-3 rounded-lg hover:bg-red-50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  उत्पादनहरू
                </Link>
                <Link
                  href="/about"
                  className="text-gray-700 hover:text-red-600 font-medium py-2 px-3 rounded-lg hover:bg-red-50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  हाम्रो बारे
                </Link>
                <Link
                  href="/contact"
                  className="text-gray-700 hover:text-red-600 font-medium py-2 px-3 rounded-lg hover:bg-red-50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  सम्पर्क
                </Link>

                {/* Mobile User Actions */}
                {isLoggedIn ? (
                  <div className="pt-3 border-t border-orange-200 space-y-2">
                    <Link
                      href="/dashboard"
                      className="text-gray-700 hover:text-red-600 font-medium py-2 px-3 rounded-lg hover:bg-red-50 transition-colors block"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      ड्यासबोर्ड
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout()
                        setIsMenuOpen(false)
                      }}
                      className="text-gray-700 hover:text-red-600 font-medium py-2 px-3 rounded-lg hover:bg-red-50 transition-colors w-full text-left"
                    >
                      बाहिर निस्कनु
                    </button>
                  </div>
                ) : (
                  <div className="pt-3 border-t border-orange-200 space-y-2">
                    <Link
                      href="/login"
                      className="text-gray-700 hover:text-red-600 font-medium py-2 px-3 rounded-lg hover:bg-red-50 transition-colors block"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      लगइन
                    </Link>
                    <Link
                      href="/signup"
                      className="text-gray-700 hover:text-red-600 font-medium py-2 px-3 rounded-lg hover:bg-red-50 transition-colors block"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      दर्ता गर्नुहोस्
                    </Link>
                  </div>
                )}
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  )
}
