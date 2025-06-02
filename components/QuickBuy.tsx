"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Phone, MessageCircle } from "lucide-react"

export default function QuickBuy() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [productName, setProductName] = useState("")
  const { toast } = useToast()

  const handleQuickOrder = () => {
    if (!phoneNumber || !productName) {
      toast({
        title: "अधूरो जानकारी",
        description: "कृपया फोन नम्बर र उत्पादनको नाम दिनुहोस्।",
        variant: "destructive",
      })
      return
    }

    const message = `
🛒 Quick Order:
📞 फोन: ${phoneNumber}
🛍️ उत्पादन: ${productName}

कृपया मलाई यो उत्पादनको मूल्य र उपलब्धता बारे जानकारी दिनुहोस्।
    `.trim()

    window.open(`https://wa.me/9779748845865?text=${encodeURIComponent(message)}`, "_blank")

    // Reset form
    setPhoneNumber("")
    setProductName("")

    toast({
      title: "अर्डर पठाइयो",
      description: "हामी छिट्टै तपाईंलाई सम्पर्क गर्नेछौं।",
    })
  }

  return (
    <Card className="border-orange-200 bg-gradient-to-r from-red-50 to-orange-50 w-full max-w-md mx-auto">
      <CardHeader className="pb-3 sm:pb-4">
        <CardTitle className="text-red-700 text-center text-lg sm:text-xl">⚡ Quick Order</CardTitle>
        <p className="text-center text-gray-600 text-sm sm:text-base">छिट्टो अर्डर गर्नुहोस्</p>
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4 pt-0">
        <Input
          placeholder="तपाईंको फोन नम्बर"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="border-orange-200 focus:border-red-400 text-sm sm:text-base"
          type="tel"
        />
        <Input
          placeholder="के चाहिन्छ? (जस्तै: चामल, तेल, दाल)"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="border-orange-200 focus:border-red-400 text-sm sm:text-base"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
          <Button onClick={handleQuickOrder} className="bg-red-600 hover:bg-red-700 text-sm sm:text-base" size="sm">
            <MessageCircle className="h-4 w-4 mr-2" />
            WhatsApp
          </Button>
          <Button
            onClick={() => {
              if (phoneNumber) {
                window.open(`tel:+9779748845865`, "_self")
              } else {
                toast({
                  title: "फोन नम्बर चाहिन्छ",
                  description: "कृपया आफ्नो फोन नम्बर दिनुहोस्।",
                  variant: "destructive",
                })
              }
            }}
            variant="outline"
            className="border-green-200 text-green-600 hover:bg-green-50 text-sm sm:text-base"
            size="sm"
          >
            <Phone className="h-4 w-4 mr-2" />
            फोन गर्नुहोस्
          </Button>
        </div>
        <p className="text-xs sm:text-sm text-gray-500 text-center">२४/७ उपलब्ध • तुरुन्त जवाफ</p>
      </CardContent>
    </Card>
  )
}
