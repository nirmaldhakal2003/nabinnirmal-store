"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Save, Store, Phone, MapPin, Clock } from "lucide-react"

export default function AdminSettingsPage() {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [settings, setSettings] = useState({
    storeName: "नबिन निर्मल स्टोर",
    storeNameEn: "Nabin Nirmal Store",
    phone: "+977-9876543210",
    whatsapp: "+977-9876543210",
    address: "रामपुर पाल्पा, नेपाल",
    addressEn: "Kathmandu, Nepal",
    email: "nirmalbsccsit2@gmail.com",
    description: "गुणस्तरीय सामानहरूको लागि तपाईंको भरपर्दो पसल",
    openingHours: "बिहान ६ बजे देखि राति ९ बजे सम्म",
    deliveryRadius: "५ किलोमिटर",
    minimumOrder: "500",
    deliveryCharge: "50",
  })
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      const parsedUser = JSON.parse(userData)
      if (parsedUser.role !== "admin") {
        router.push("/")
        return
      }
      setUser(parsedUser)
    } else {
      router.push("/admin/login")
      return
    }

    // Load settings from localStorage
    const savedSettings = localStorage.getItem("storeSettings")
    if (savedSettings) {
      setSettings({ ...settings, ...JSON.parse(savedSettings) })
    }
  }, [router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Save settings to localStorage
      localStorage.setItem("storeSettings", JSON.stringify(settings))

      toast({
        title: "सेटिङहरू सेभ भयो!",
        description: "स्टोरको सेटिङहरू सफलतापूर्वक अपडेट गरिएको छ।",
      })
    } catch (error: any) {
      toast({
        title: "त्रुटि",
        description: "सेटिङहरू सेभ गर्न सकिएन।",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">⚙️ स्टोर सेटिङहरू</h1>
          <p className="text-gray-600">स्टोरको आधारभूत जानकारी र सेटिङहरू व्यवस्थापन गर्नुहोस्</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Store Information */}
            <div className="space-y-6">
              <Card className="border-orange-200">
                <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50">
                  <CardTitle className="text-red-700 flex items-center">
                    <Store className="h-5 w-5 mr-2" />
                    स्टोर जानकारी
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <Label htmlFor="storeName" className="text-gray-700 font-medium">
                      स्टोरको नाम (नेपालीमा)
                    </Label>
                    <Input
                      id="storeName"
                      name="storeName"
                      value={settings.storeName}
                      onChange={handleChange}
                      className="border-orange-200 focus:border-red-400"
                    />
                  </div>
                  <div>
                    <Label htmlFor="storeNameEn" className="text-gray-700 font-medium">
                      स्टोरको नाम (अंग्रेजीमा)
                    </Label>
                    <Input
                      id="storeNameEn"
                      name="storeNameEn"
                      value={settings.storeNameEn}
                      onChange={handleChange}
                      className="border-orange-200 focus:border-red-400"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description" className="text-gray-700 font-medium">
                      स्टोरको विवरण
                    </Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={settings.description}
                      onChange={handleChange}
                      rows={3}
                      className="border-orange-200 focus:border-red-400"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-orange-200">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle className="text-blue-700 flex items-center">
                    <Phone className="h-5 w-5 mr-2" />
                    सम्पर्क जानकारी
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <Label htmlFor="phone" className="text-gray-700 font-medium">
                      फोन नम्बर
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={settings.phone}
                      onChange={handleChange}
                      className="border-orange-200 focus:border-red-400"
                    />
                  </div>
                  <div>
                    <Label htmlFor="whatsapp" className="text-gray-700 font-medium">
                      WhatsApp नम्बर
                    </Label>
                    <Input
                      id="whatsapp"
                      name="whatsapp"
                      value={settings.whatsapp}
                      onChange={handleChange}
                      className="border-orange-200 focus:border-red-400"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-gray-700 font-medium">
                      इमेल ठेगाना
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={settings.email}
                      onChange={handleChange}
                      className="border-orange-200 focus:border-red-400"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Location and Business Settings */}
            <div className="space-y-6">
              <Card className="border-orange-200">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                  <CardTitle className="text-green-700 flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    स्थान जानकारी
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <Label htmlFor="address" className="text-gray-700 font-medium">
                      ठेगाना (नेपालीमा)
                    </Label>
                    <Textarea
                      id="address"
                      name="address"
                      value={settings.address}
                      onChange={handleChange}
                      rows={2}
                      className="border-orange-200 focus:border-red-400"
                    />
                  </div>
                  <div>
                    <Label htmlFor="addressEn" className="text-gray-700 font-medium">
                      ठेगाना (अंग्रेजीमा)
                    </Label>
                    <Textarea
                      id="addressEn"
                      name="addressEn"
                      value={settings.addressEn}
                      onChange={handleChange}
                      rows={2}
                      className="border-orange-200 focus:border-red-400"
                    />
                  </div>
                  <div>
                    <Label htmlFor="deliveryRadius" className="text-gray-700 font-medium">
                      डेलिभरी क्षेत्र (किलोमिटर)
                    </Label>
                    <Input
                      id="deliveryRadius"
                      name="deliveryRadius"
                      value={settings.deliveryRadius}
                      onChange={handleChange}
                      className="border-orange-200 focus:border-red-400"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-orange-200">
                <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50">
                  <CardTitle className="text-yellow-700 flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    व्यापारिक सेटिङहरू
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <Label htmlFor="openingHours" className="text-gray-700 font-medium">
                      खुला समय
                    </Label>
                    <Input
                      id="openingHours"
                      name="openingHours"
                      value={settings.openingHours}
                      onChange={handleChange}
                      className="border-orange-200 focus:border-red-400"
                    />
                  </div>
                  <div>
                    <Label htmlFor="minimumOrder" className="text-gray-700 font-medium">
                      न्यूनतम अर्डर (रु.)
                    </Label>
                    <Input
                      id="minimumOrder"
                      name="minimumOrder"
                      type="number"
                      value={settings.minimumOrder}
                      onChange={handleChange}
                      className="border-orange-200 focus:border-red-400"
                    />
                  </div>
                  <div>
                    <Label htmlFor="deliveryCharge" className="text-gray-700 font-medium">
                      डेलिभरी शुल्क (रु.)
                    </Label>
                    <Input
                      id="deliveryCharge"
                      name="deliveryCharge"
                      type="number"
                      value={settings.deliveryCharge}
                      onChange={handleChange}
                      className="border-orange-200 focus:border-red-400"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Save Button */}
              <Card className="border-orange-200">
                <CardContent className="p-6">
                  <Button type="submit" disabled={isLoading} className="w-full bg-red-600 hover:bg-red-700">
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>सेभ गर्दै...</span>
                      </div>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        सेटिङहरू सेभ गर्नुहोस्
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
