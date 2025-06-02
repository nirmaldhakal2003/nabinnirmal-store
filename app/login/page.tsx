"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Eye, EyeOff } from "lucide-react"
import Image from "next/image"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Demo login - in real app, validate with backend
      if (formData.email === "admin@nabinnirmalstore.com" && formData.password === "admin123") {
        // Admin login
        localStorage.setItem("token", "demo-admin-token")
        localStorage.setItem(
          "user",
          JSON.stringify({
            email: formData.email,
            role: "admin",
            name: "एडमिन प्रयोगकर्ता",
          }),
        )
        toast({
          title: "फिर्ता स्वागत छ!",
          description: "एडमिनको रूपमा सफलतापूर्वक लगइन भयो।",
        })
        router.push("/admin")
      } else if (formData.email && formData.password) {
        // Regular user login
        localStorage.setItem("token", "demo-user-token")
        localStorage.setItem(
          "user",
          JSON.stringify({
            email: formData.email,
            role: "user",
            name: "प्रयोगकर्ता",
          }),
        )
        toast({
          title: "फिर्ता स्वागत छ!",
          description: "सफलतापूर्वक लगइन भयो।",
        })
        router.push("/")
      } else {
        throw new Error("Invalid credentials")
      }
    } catch (error) {
      toast({
        title: "लगइन असफल",
        description: "गलत इमेल वा पासवर्ड। admin@nabinnirmalstore.com / admin123 प्रयास गर्नुहोस्",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md border-orange-200 shadow-lg">
        <CardHeader className="text-center bg-gradient-to-r from-red-50 to-orange-50">
          <div className="flex justify-center mb-3">
            <Image
              src="nns.png?height=48&width=48"
              alt="NabinNirmal Store Logo"
              width={48}
              height={48}
              className="rounded-lg border border-red-200"
            />
          </div>
          <CardTitle className="text-2xl font-bold text-red-700">फिर्ता स्वागत छ</CardTitle>
          <p className="text-gray-600">आफ्नो खातामा लगइन गर्नुहोस्</p>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-gray-700">
                इमेल
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                className="border-orange-200 focus:border-red-400"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-gray-700">
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
                  placeholder="आफ्नो पासवर्ड प्रविष्ट गर्नुहोस्"
                  className="border-orange-200 focus:border-red-400"
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

            <Button type="submit" disabled={isLoading} className="w-full bg-red-600 hover:bg-red-700">
              {isLoading ? "लगइन गर्दै..." : "🔐 लगइन गर्नुहोस्"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              खाता छैन?{" "}
              <Link href="/signup" className="text-red-600 hover:underline font-medium">
                दर्ता गर्नुहोस्
              </Link>
            </p>
          </div>

          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800">
              <strong>डेमो प्रमाणपत्रहरू:</strong>
              <br />
              एडमिन: admin@nabinnirmalstore.com / admin123
              <br />
              प्रयोगकर्ता: कुनै पनि इमेल / कुनै पनि पासवर्ड
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
