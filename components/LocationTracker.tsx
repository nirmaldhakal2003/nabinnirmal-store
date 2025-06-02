"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Navigation, Clock, Truck } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface LocationTrackerProps {
  onLocationUpdate?: (locationData: any) => void
}

export default function LocationTracker({ onLocationUpdate }: LocationTrackerProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [currentLocation, setCurrentLocation] = useState<any>(null)
  const [deliveryInfo, setDeliveryInfo] = useState<any>(null)
  const [manualAddress, setManualAddress] = useState({
    fullAddress: "",
    landmark: "",
    phone: "",
    alternatePhone: "",
    instructions: "",
  })
  const { toast } = useToast()

  const getCurrentLocation = () => {
    setIsLoading(true)

    if (!navigator.geolocation) {
      toast({
        title: "Location not supported",
        description: "तपाईंको ब्राउजरले location सपोर्ट गर्दैन।",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const location = {
          coordinates: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
          accuracy: position.coords.accuracy,
        }

        setCurrentLocation(location)

        // Calculate delivery info
        try {
          const response = await fetch("/api/location", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              customerLocation: location,
            }),
          })

          const data = await response.json()
          setDeliveryInfo(data)

          if (onLocationUpdate) {
            onLocationUpdate({ location, deliveryInfo: data })
          }

          toast({
            title: "स्थान पत्ता लाग्यो!",
            description: `डेलिभरी शुल्क: रु. ${data.deliveryFee} | समय: ${data.estimatedTime}`,
          })
        } catch (error) {
          toast({
            title: "त्रुटि",
            description: "डेलिभरी जानकारी प्राप्त गर्न सकिएन।",
            variant: "destructive",
          })
        }

        setIsLoading(false)
      },
      (error) => {
        toast({
          title: "Location त्रुटि",
          description: "तपाईंको स्थान पत्ता लगाउन सकिएन। कृपया manually address दिनुहोस्।",
          variant: "destructive",
        })
        setIsLoading(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      },
    )
  }

  const handleManualAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setManualAddress({
      ...manualAddress,
      [e.target.name]: e.target.value,
    })
  }

  const handleManualSubmit = async () => {
    if (!manualAddress.fullAddress || !manualAddress.phone) {
      toast({
        title: "अधूरो जानकारी",
        description: "कृपया पूरा ठेगाना र फोन नम्बर दिनुहोस्।",
        variant: "destructive",
      })
      return
    }

    // For manual address, we'll use approximate coordinates for Palpa district
    const approximateLocation = {
      coordinates: {
        lat: 27.8742,
        lng: 83.4534,
      },
      isManual: true,
      address: manualAddress,
    }

    try {
      const response = await fetch("/api/location", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerLocation: approximateLocation,
        }),
      })

      const data = await response.json()
      setDeliveryInfo(data)

      if (onLocationUpdate) {
        onLocationUpdate({
          location: approximateLocation,
          deliveryInfo: data,
          manualAddress,
        })
      }

      toast({
        title: "ठेगाना सेभ भयो!",
        description: `डेलिभरी शुल्क: रु. ${data.deliveryFee} | समय: ${data.estimatedTime}`,
      })
    } catch (error) {
      toast({
        title: "त्रुटि",
        description: "ठेगाना सेभ गर्न सकिएन।",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      {/* Store Location Info */}
      <Card className="border-blue-200">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardTitle className="text-blue-700">🏪 हाम्रो स्टोरको स्थान</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <MapPin className="h-5 w-5 text-red-600 mt-0.5" />
              <div>
                <p className="font-medium">नबिन निर्मल स्टोर</p>
                <p className="text-sm text-gray-600">रामपुर-६, तालपोखरा, पाल्पा, नेपाल</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm">बिहान ६:०० - बेलुका ९:०० (सोम-शुक्र)</p>
                <p className="text-sm">बिहान ७:०० - बेलुका ८:०० (शनि-आइत)</p>
              </div>
            </div>
            <div className="mt-4">
              <Button
                onClick={() => window.open("https://maps.app.goo.gl/XLmuRk9Tk54NN6eY7", "_blank")}
                variant="outline"
                size="sm"
                className="border-blue-200 text-blue-600 hover:bg-blue-50"
              >
                <Navigation className="h-4 w-4 mr-2" />
                Google Maps मा हेर्नुहोस्
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Location Detection */}
      <Card className="border-orange-200">
        <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50">
          <CardTitle className="text-orange-700">📍 तपाईंको स्थान</CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-4">
          <div className="text-center">
            <Button onClick={getCurrentLocation} disabled={isLoading} className="bg-red-600 hover:bg-red-700">
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>पत्ता लगाउँदै...</span>
                </div>
              ) : (
                <>
                  <MapPin className="h-4 w-4 mr-2" />
                  मेरो स्थान पत्ता लगाउनुहोस्
                </>
              )}
            </Button>
            <p className="text-xs text-gray-500 mt-2">सटीक डेलिभरी शुल्क र समयको लागि</p>
          </div>

          {currentLocation && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-sm text-green-800">
                ✅ स्थान पत्ता लाग्यो! (Accuracy: {Math.round(currentLocation.accuracy)}m)
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Manual Address */}
      <Card className="border-purple-200">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
          <CardTitle className="text-purple-700">✍️ ठेगाना manually दिनुहोस्</CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-4">
          <div>
            <Label htmlFor="fullAddress">पूरा ठेगाना *</Label>
            <Textarea
              id="fullAddress"
              name="fullAddress"
              value={manualAddress.fullAddress}
              onChange={handleManualAddressChange}
              placeholder="जस्तै: वडा नं. ५, रामपुर, पाल्पा"
              rows={3}
              className="border-orange-200 focus:border-purple-400"
            />
          </div>

          <div>
            <Label htmlFor="landmark">नजिकको landmark</Label>
            <Input
              id="landmark"
              name="landmark"
              value={manualAddress.landmark}
              onChange={handleManualAddressChange}
              placeholder="जस्तै: रामपुर अस्पताल नजिक"
              className="border-orange-200 focus:border-purple-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">फोन नम्बर *</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={manualAddress.phone}
                onChange={handleManualAddressChange}
                placeholder="९८XXXXXXXX"
                className="border-orange-200 focus:border-purple-400"
              />
            </div>
            <div>
              <Label htmlFor="alternatePhone">वैकल्पिक फोन</Label>
              <Input
                id="alternatePhone"
                name="alternatePhone"
                type="tel"
                value={manualAddress.alternatePhone}
                onChange={handleManualAddressChange}
                placeholder="९७XXXXXXXX"
                className="border-orange-200 focus:border-purple-400"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="instructions">डेलिभरी निर्देशन</Label>
            <Textarea
              id="instructions"
              name="instructions"
              value={manualAddress.instructions}
              onChange={handleManualAddressChange}
              placeholder="विशेष निर्देशन (जस्तै: दोस्रो तल्ला, नीलो घर)"
              rows={2}
              className="border-orange-200 focus:border-purple-400"
            />
          </div>

          <Button onClick={handleManualSubmit} className="w-full bg-purple-600 hover:bg-purple-700">
            ठेगाना सेभ गर्नुहोस्
          </Button>
        </CardContent>
      </Card>

      {/* Delivery Information */}
      {deliveryInfo && (
        <Card className="border-green-200">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
            <CardTitle className="text-green-700">🚚 डेलिभरी जानकारी</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <Truck className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">डेलिभरी शुल्क</p>
                <p className="text-lg font-bold text-blue-700">रु. {deliveryInfo.deliveryFee}</p>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <Clock className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">अनुमानित समय</p>
                <p className="text-lg font-bold text-orange-700">{deliveryInfo.estimatedTime}</p>
              </div>
            </div>
            {deliveryInfo.distance && (
              <div className="mt-3 text-center">
                <p className="text-sm text-gray-600">दूरी: {deliveryInfo.distance} किमी</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
