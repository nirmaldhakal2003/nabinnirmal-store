"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Eye, EyeOff, Shield } from "lucide-react"

export default function AdminLoginPage() {
  const [formData, setFormData] = useState({
    adminId: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    // Clear any existing auth data on login page load
    localStorage.removeItem("user")
    localStorage.removeItem("token")
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    console.log("Attempting login with:", formData) // Debug log

    try {
      const response = await fetch("/api/auth/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          adminId: formData.adminId.trim(),
          password: formData.password.trim(),
        }),
      })

      console.log("Response status:", response.status) // Debug log

      const data = await response.json()
      console.log("Response data:", data) // Debug log

      if (response.ok && data.success) {
        // Store user data in localStorage
        localStorage.setItem("user", JSON.stringify(data.user))
        localStorage.setItem("token", "admin-authenticated")

        toast({
          title: "✅ लगइन सफल!",
          description: "एडमिन प्यानलमा स्वागत छ।",
        })

        // Small delay to ensure cookie is set
        setTimeout(() => {
          router.push("/admin")
        }, 500)
      } else {
        throw new Error(data.message || data.error || "लगइन असफल भयो")
      }
    } catch (error: any) {
      console.error("Login error:", error) // Debug log
      toast({
        title: "❌ लगइन असफल",
        description: error.message || "गलत एडमिन ID वा पासवर्ड। पुनः प्रयास गर्नुहोस्।",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-700 to-orange-600 flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md border-red-200 shadow-2xl">
        <CardHeader className="text-center bg-gradient-to-r from-red-50 to-orange-50 border-b border-red-200">
          <div className="flex justify-center mb-3">
            <div className="p-3 bg-red-100 rounded-full">
              <Shield className="h-8 w-8 text-red-600" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-red-700">🔐 एडमिन लगइन</CardTitle>
          <p className="text-gray-600">एडमिन प्यानलमा पहुँच गर्नुहोस्</p>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="adminId" className="text-gray-700 font-medium">
                एडमिन ID
              </Label>
              <Input
                id="adminId"
                name="adminId"
                type="text"
                required
                value={formData.adminId}
                onChange={handleChange}
                placeholder="id"
                className="border-orange-200 focus:border-red-400"
                autoComplete="username"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-gray-700 font-medium">
                पासवर्ड
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="password"
                  className="border-orange-200 focus:border-red-400"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>लगइन गर्दै...</span>
                </div>
              ) : (
                "🔓 एडमिन लगइन गर्नुहोस्"
              )}
            </Button>
          </form>

          {/* Debug Info - Remove in production */}
          <div className="mt-4 p-3 bg-gray-100 rounded text-xs">
            <p>
              <strong>Debug Info:</strong>
            </p>
            <p>Admin ID: nabin2003</p>
            <p>Password: nirmal2003</p>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start space-x-2">
              <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-800">सुरक्षा जानकारी:</p>
                <p className="text-xs text-blue-700 mt-1">यो एडमिन प्यानल हो। केवल अधिकृत व्यक्तिहरूले मात्र पहुँच गर्न सक्छन्।</p>
              </div>
            </div>
          </div>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              मुख्य साइटमा फर्कनुहोस्?{" "}
              <button onClick={() => router.push("/")} className="text-red-600 hover:underline font-medium">
                गृहपृष्ठ
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
