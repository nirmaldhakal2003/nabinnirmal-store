"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, X, Send, Phone } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  })
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: formData.message,
          customerName: formData.name,
          customerPhone: formData.phone,
          customerEmail: formData.email,
        }),
      })

      const data = await response.json()

      if (data.success) {
        // Open WhatsApp with pre-filled message
        window.open(data.whatsappUrl, "_blank")

        toast({
          title: "सन्देश तयार भयो!",
          description: "WhatsApp खुलेको छ। सन्देश पठाउनुहोस्।",
        })

        // Reset form
        setFormData({ name: "", phone: "", email: "", message: "" })
        setIsOpen(false)
      } else {
        throw new Error("सन्देश पठाउन सकिएन")
      }
    } catch (error) {
      toast({
        title: "त्रुटि",
        description: "सन्देश पठाउन सकिएन। पुनः प्रयास गर्नुहोस्।",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDirectCall = () => {
    window.open("tel:+9779748845865", "_self")
  }

  const handleDirectWhatsApp = () => {
    const message = "नमस्कार! म नबिन निर्मल स्टोरको बारेमा जानकारी चाहन्छु।"
    const whatsappUrl = `https://wa.me/9779748845865?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            onClick={() => setIsOpen(true)}
            className="bg-green-600 hover:bg-green-700 rounded-full w-14 h-14 shadow-lg animate-pulse"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        </div>
      )}

      {/* Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-80">
          <Card className="border-green-200 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">💬 हामीसँग कुरा गर्नुहोस्</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-green-800"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-green-100">हामी तपाईंलाई सहयोग गर्न यहाँ छौं!</p>
            </CardHeader>
            <CardContent className="p-4">
              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                <Button
                  onClick={handleDirectCall}
                  variant="outline"
                  size="sm"
                  className="border-blue-200 text-blue-600 hover:bg-blue-50"
                >
                  <Phone className="h-4 w-4 mr-1" />
                  फोन गर्नुहोस्
                </Button>
                <Button
                  onClick={handleDirectWhatsApp}
                  variant="outline"
                  size="sm"
                  className="border-green-200 text-green-600 hover:bg-green-50"
                >
                  <MessageCircle className="h-4 w-4 mr-1" />
                  WhatsApp
                </Button>
              </div>

              {/* Contact Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <Label htmlFor="name" className="text-sm">
                    नाम *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="तपाईंको नाम"
                    className="border-orange-200 focus:border-green-400"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-sm">
                    फोन नम्बर *
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="९८XXXXXXXX"
                    className="border-orange-200 focus:border-green-400"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm">
                    इमेल
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="border-orange-200 focus:border-green-400"
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="text-sm">
                    सन्देश *
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="तपाईंको सन्देश यहाँ लेख्नुहोस्..."
                    rows={3}
                    className="border-orange-200 focus:border-green-400"
                  />
                </div>

                <Button type="submit" disabled={isLoading} className="w-full bg-green-600 hover:bg-green-700">
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>पठाउँदै...</span>
                    </div>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      WhatsApp मा पठाउनुहोस्
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-3 text-center">
                <p className="text-xs text-gray-500">📞 +977-9748845865 | 🕒 बिहान ६:०० - बेलुका ९:००</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
