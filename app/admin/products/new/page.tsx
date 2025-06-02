"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Save, Upload, ImageIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function NewProductPage() {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState<string>("")
  const [formData, setFormData] = useState({
    name: "",
    nameEn: "",
    price: "",
    originalPrice: "",
    description: "",
    category: "grocery",
    inStock: true,
    stock: "",
    weight: "",
    brand: "",
    image: null as File | null,
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
    }
  }, [router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "फाइल धेरै ठूलो छ",
          description: "कृपया 5MB भन्दा सानो तस्बिर छान्नुहोस्।",
          variant: "destructive",
        })
        return
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast({
          title: "अवैध फाइल प्रकार",
          description: "कृपया तस्बिर फाइल मात्र छान्नुहोस्।",
          variant: "destructive",
        })
        return
      }

      setFormData((prev) => ({ ...prev, image: file }))

      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Validate required fields
      if (!formData.name || !formData.price || !formData.description) {
        throw new Error("कृपया सबै आवश्यक फिल्डहरू भर्नुहोस्")
      }

      // Calculate discount
      const discount =
        formData.originalPrice && Number.parseFloat(formData.originalPrice) > Number.parseFloat(formData.price)
          ? Math.round(
              ((Number.parseFloat(formData.originalPrice) - Number.parseFloat(formData.price)) /
                Number.parseFloat(formData.originalPrice)) *
                100,
            )
          : 0

      // Handle image - convert to base64 if uploaded
      let imageUrl = "nns.png?height=300&width=300"
      if (formData.image) {
        // Convert image to base64 for storage
        const reader = new FileReader()
        imageUrl = await new Promise((resolve) => {
          reader.onloadend = () => resolve(reader.result as string)
          reader.readAsDataURL(formData.image!)
        })
      }

      // Create product object
      const newProduct = {
        id: Date.now().toString(),
        name: formData.name,
        nameEn: formData.nameEn,
        price: Number.parseFloat(formData.price),
        originalPrice: formData.originalPrice ? Number.parseFloat(formData.originalPrice) : null,
        description: formData.description,
        category: formData.category,
        inStock: formData.inStock,
        stock: Number.parseInt(formData.stock) || 0,
        weight: formData.weight,
        brand: formData.brand,
        discount,
        image: imageUrl, // Store base64 image
        createdAt: new Date().toISOString(),
      }

      // Save to localStorage
      const existingProducts = JSON.parse(localStorage.getItem("adminProducts") || "[]")
      existingProducts.push(newProduct)
      localStorage.setItem("adminProducts", JSON.stringify(existingProducts))

      toast({
        title: "उत्पादन सफलतापूर्वक थपियो!",
        description: `${formData.name} स्टोरमा थपिएको छ।`,
      })

      router.push("/admin/products")
    } catch (error: any) {
      toast({
        title: "त्रुटि",
        description: error.message,
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

  const categories = [
    { value: "grocery", label: "खाद्य सामग्री", emoji: "🍚" },
    { value: "cosmetics", label: "सौन्दर्य उत्पादन", emoji: "💄" },
    { value: "daily-essentials", label: "दैनिक सामान", emoji: "🛒" },
    { value: "baby-products", label: "बच्चाका सामान", emoji: "👶" },
    { value: "household", label: "घरायसी सामान", emoji: "🏠" },
    { value: "kitchen", label: "भान्साका सामान", emoji: "🍳" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Link href="/admin/products">
              <Button variant="outline" size="sm" className="border-red-200 text-red-600 hover:bg-red-50">
                <ArrowLeft className="h-4 w-4 mr-2" />
                फिर्ता
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">➕ नयाँ उत्पादन थप्नुहोस्</h1>
              <p className="text-gray-600">स्टोरमा नयाँ उत्पादन थप्नुहोस्</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <Card className="border-orange-200">
                <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50">
                  <CardTitle className="text-red-700">📝 आधारभूत जानकारी</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-gray-700 font-medium">
                        उत्पादनको नाम (नेपालीमा) *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="जस्तै: बासमती चामल"
                        className="border-orange-200 focus:border-red-400"
                      />
                    </div>
                    <div>
                      <Label htmlFor="nameEn" className="text-gray-700 font-medium">
                        उत्पादनको नाम (अंग्रेजीमा)
                      </Label>
                      <Input
                        id="nameEn"
                        name="nameEn"
                        type="text"
                        value={formData.nameEn}
                        onChange={handleChange}
                        placeholder="जस्तै: Basmati Rice"
                        className="border-orange-200 focus:border-red-400"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="brand" className="text-gray-700 font-medium">
                        ब्राण्ड
                      </Label>
                      <Input
                        id="brand"
                        name="brand"
                        type="text"
                        value={formData.brand}
                        onChange={handleChange}
                        placeholder="जस्तै: Premium"
                        className="border-orange-200 focus:border-red-400"
                      />
                    </div>
                    <div>
                      <Label htmlFor="weight" className="text-gray-700 font-medium">
                        तौल/साइज
                      </Label>
                      <Input
                        id="weight"
                        name="weight"
                        type="text"
                        value={formData.weight}
                        onChange={handleChange}
                        placeholder="जस्तै: 1kg, 500ml, Large"
                        className="border-orange-200 focus:border-red-400"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description" className="text-gray-700 font-medium">
                      विवरण *
                    </Label>
                    <Textarea
                      id="description"
                      name="description"
                      required
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="उत्पादनको विस्तृत विवरण लेख्नुहोस्..."
                      rows={4}
                      className="border-orange-200 focus:border-red-400"
                    />
                  </div>

                  <div>
                    <Label htmlFor="category" className="text-gray-700 font-medium">
                      श्रेणी *
                    </Label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-orange-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    >
                      {categories.map((category) => (
                        <option key={category.value} value={category.value}>
                          {category.emoji} {category.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </CardContent>
              </Card>

              {/* Pricing */}
              <Card className="border-orange-200">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50">
                  <CardTitle className="text-green-700">💰 मूल्य निर्धारण</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="price" className="text-gray-700 font-medium">
                        बिक्री मूल्य (रु.) *
                      </Label>
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        required
                        min="0"
                        step="0.01"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="180"
                        className="border-orange-200 focus:border-red-400"
                      />
                    </div>
                    <div>
                      <Label htmlFor="originalPrice" className="text-gray-700 font-medium">
                        मूल मूल्य (रु.) - छुटको लागि
                      </Label>
                      <Input
                        id="originalPrice"
                        name="originalPrice"
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.originalPrice}
                        onChange={handleChange}
                        placeholder="200"
                        className="border-orange-200 focus:border-red-400"
                      />
                    </div>
                  </div>
                  {formData.price &&
                    formData.originalPrice &&
                    Number.parseFloat(formData.originalPrice) > Number.parseFloat(formData.price) && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <p className="text-sm text-green-800">
                          💡 छुट:{" "}
                          {Math.round(
                            ((Number.parseFloat(formData.originalPrice) - Number.parseFloat(formData.price)) /
                              Number.parseFloat(formData.originalPrice)) *
                              100,
                          )}
                          %
                        </p>
                      </div>
                    )}
                </CardContent>
              </Card>

              {/* Image Upload */}
              <Card className="border-orange-200">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                  <CardTitle className="text-purple-700">🖼️ उत्पादनको तस्बिर</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <Label htmlFor="image" className="text-gray-700 font-medium">
                      तस्बिर अपलोड गर्नुहोस्
                    </Label>
                    <div className="mt-2">
                      <input
                        id="image"
                        name="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                      <label
                        htmlFor="image"
                        className="cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-8 text-center block hover:border-red-400 transition-colors"
                      >
                        {imagePreview ? (
                          <div className="space-y-4">
                            <Image
                              src={imagePreview || "nns.png"}
                              alt="Preview"
                              width={200}
                              height={200}
                              className="mx-auto rounded-lg object-cover"
                            />
                            <p className="text-sm text-gray-600">नयाँ तस्बिर छान्न क्लिक गर्नुहोस्</p>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                            <div>
                              <p className="text-gray-600">तस्बिर अपलोड गर्न क्लिक गर्नुहोस्</p>
                              <p className="text-sm text-gray-500">PNG, JPG, JPEG (अधिकतम 5MB)</p>
                            </div>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Stock Management */}
              <Card className="border-orange-200">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle className="text-blue-700">📦 स्टक व्यवस्थापन</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <Label htmlFor="stock" className="text-gray-700 font-medium">
                      स्टक संख्या
                    </Label>
                    <Input
                      id="stock"
                      name="stock"
                      type="number"
                      min="0"
                      value={formData.stock}
                      onChange={handleChange}
                      placeholder="50"
                      className="border-orange-200 focus:border-red-400"
                    />
                  </div>
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="inStock"
                      name="inStock"
                      checked={formData.inStock}
                      onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, inStock: !!checked }))}
                      className="border-orange-300 data-[state=checked]:bg-red-600"
                    />
                    <Label htmlFor="inStock" className="text-sm cursor-pointer">
                      ✅ स्टकमा उपलब्ध छ
                    </Label>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <Card className="border-orange-200">
                <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50">
                  <CardTitle className="text-yellow-700">⚡ कार्यहरू</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <Button type="submit" disabled={isLoading} className="w-full bg-red-600 hover:bg-red-700">
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>सेभ गर्दै...</span>
                      </div>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        उत्पादन सेभ गर्नुहोस्
                      </>
                    )}
                  </Button>
                  <Link href="/admin/products">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full border-red-200 text-red-600 hover:bg-red-50"
                    >
                      रद्द गर्नुहोस्
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Preview */}
              {formData.name && (
                <Card className="border-green-200">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                    <CardTitle className="text-green-700">👁️ पूर्वावलोकन</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="text-center mb-3">
                        <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center mb-3 overflow-hidden">
                          {imagePreview ? (
                            <Image
                              src={imagePreview || "nns.png"}
                              alt="Preview"
                              width={128}
                              height={128}
                              className="object-cover w-full h-full"
                            />
                          ) : (
                            <ImageIcon className="h-8 w-8 text-gray-400" />
                          )}
                        </div>
                        <h3 className="font-semibold">{formData.name}</h3>
                        {formData.nameEn && <p className="text-sm text-gray-500">{formData.nameEn}</p>}
                        {formData.brand && <p className="text-xs text-gray-400">{formData.brand}</p>}
                        <div className="flex items-center justify-center space-x-2 mt-2">
                          <span className="text-red-600 font-bold">रु. {formData.price || "0"}</span>
                          {formData.originalPrice &&
                            Number.parseFloat(formData.originalPrice) > Number.parseFloat(formData.price || "0") && (
                              <span className="text-sm text-gray-500 line-through">रु. {formData.originalPrice}</span>
                            )}
                        </div>
                        {formData.weight && <p className="text-xs text-gray-500 mt-1">{formData.weight}</p>}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
