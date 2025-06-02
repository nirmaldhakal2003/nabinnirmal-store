"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Clock, Navigation, Car, Bus, Bike, MessageCircle } from "lucide-react"

export default function StoreLocationPage() {
  const [storeInfo, setStoreInfo] = useState<any>(null)

  useEffect(() => {
    // Load store information
    fetch("/api/location")
      .then((res) => res.json())
      .then((data) => setStoreInfo(data))
      .catch((err) => console.error("Failed to load store info:", err))
  }, [])

  const openInGoogleMaps = () => {
    const query = "Rampur-6, Talpokhara, Palpa, Nepal"
    window.open(`https://maps.google.com/?q=${encodeURIComponent(query)}`, "_blank")
  }

  const openDirections = () => {
    const destination = "Rampur-6, Talpokhara, Palpa, Nepal"
    window.open(`https://maps.google.com/dir/?api=1&destination=${encodeURIComponent(destination)}`, "_blank")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">🏪 हाम्रो स्टोरको स्थान</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            रामपुर-६, तालपोखरा, पाल्पामा स्थित नबिन निर्मल स्टोरमा आउनुहोस्। हामी तपाईंलाई स्वागत गर्न तयार छौं!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Store Information */}
          <div className="space-y-6">
            {/* Basic Info */}
            <Card className="border-blue-200">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="text-blue-700">📍 स्टोर जानकारी</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-6 w-6 text-red-600 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg">नबिन निर्मल स्टोर</h3>
                    <p className="text-gray-600">रामपुर-६, तालपोखरा</p>
                    <p className="text-gray-600">पाल्पा, नेपाल</p>
                    <p className="text-sm text-gray-500 mt-1">PIN: 32500</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium">+977-9876543210</p>
                    <p className="text-sm text-gray-500">मुख्य सम्पर्क नम्बर</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-orange-600 mt-1" />
                  <div>
                    <p className="font-medium">खुला समय:</p>
                    <p className="text-sm text-gray-600">सोमबार - शुक्रबार: बिहान ६:०० - बेलुका ९:००</p>
                    <p className="text-sm text-gray-600">शनिबार - आइतबार: बिहान ७:०० - बेलुका ८:००</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-green-200">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                <CardTitle className="text-green-700">🚀 द्रुत कार्यहरू</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-3">
                <Button onClick={openInGoogleMaps} className="w-full bg-blue-600 hover:bg-blue-700">
                  <MapPin className="h-4 w-4 mr-2" />
                  Google Maps मा हेर्नुहोस्
                </Button>
                <Button
                  onClick={openDirections}
                  variant="outline"
                  className="w-full border-green-200 text-green-600 hover:bg-green-50"
                >
                  <Navigation className="h-4 w-4 mr-2" />
                  दिशा निर्देशन पाउनुहोस्
                </Button>
                <Button
                  onClick={() => window.open("tel:+9779876543210", "_self")}
                  variant="outline"
                  className="w-full border-orange-200 text-orange-600 hover:bg-orange-50"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  फोन गर्नुहोस्
                </Button>
              </CardContent>
            </Card>

            {/* Landmarks */}
            <Card className="border-purple-200">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                <CardTitle className="text-purple-700">🗺️ नजिकका ठाउँहरू</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-sm">रामपुर अस्पतालबाट ५०० मिटर</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">रामपुर बस स्टेशनबाट १ किमी</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">तालपोखरा चोकबाट २०० मिटर</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-sm">रामपुर क्याम्पसबाट ८०० मिटर</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Directions & Transportation */}
          <div className="space-y-6">
            {/* How to Reach */}
            <Card className="border-orange-200">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50">
                <CardTitle className="text-orange-700">🚌 कसरी पुग्ने</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Bus className="h-6 w-6 text-blue-600 mt-1" />
                    <div>
                      <h4 className="font-medium">बसबाट:</h4>
                      <p className="text-sm text-gray-600">
                        रामपुर पाल्पाबाट बुटवल जाने बसमा चढेर रामपुरमा ओर्नुहोस्। त्यहाँबाट तालपोखरा चोकसम्म ५ मिनेट हिँड्नुहोस्।
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Car className="h-6 w-6 text-green-600 mt-1" />
                    <div>
                      <h4 className="font-medium">निजी गाडीबाट:</h4>
                      <p className="text-sm text-gray-600">
                        पृथ्वी राजमार्गबाट रामपुर पुगेर तालपोखरा चोकतिर मोड्नुहोस्। हाम्रो स्टोर मुख्य सडकमै छ।
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Bike className="h-6 w-6 text-purple-600 mt-1" />
                    <div>
                      <h4 className="font-medium">मोटरसाइकलबाट:</h4>
                      <p className="text-sm text-gray-600">
                        रामपुर चोकबाट तालपोखरातिर जानुहोस्। हाम्रो स्टोर बाटोको दाहिने हातमा छ।
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Map Placeholder */}
            <Card className="border-gray-200">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
                <CardTitle className="text-gray-700">🗺️ नक्सा</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center border-2 border-dashed border-gray-300">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">Interactive Map</p>
                    <Button onClick={openInGoogleMaps} variant="outline" size="sm">
                      Google Maps मा खोल्नुहोस्
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact for Directions */}
            <Card className="border-yellow-200">
              <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50">
                <CardTitle className="text-yellow-700">📞 सहयोग चाहिन्छ?</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-gray-600 mb-4">
                  यदि तपाईंलाई हाम्रो स्टोर फेला पार्न समस्या भएमा, कृपया हामीलाई फोन गर्नुहोस्। हामी तपाईंलाई सही दिशा बताउनेछौं।
                </p>
                <div className="flex space-x-3">
                  <Button
                    onClick={() => window.open("tel:+9779876543210", "_self")}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    अहिले फोन गर्नुहोस्
                  </Button>
                  <Button
                    onClick={() => {
                      const message = "नमस्कार! म तपाईंको स्टोरको स्थान खोज्दै छु। कृपया दिशा निर्देशन दिनुहोस्।"
                      window.open(`https://wa.me/9779876543210?text=${encodeURIComponent(message)}`, "_blank")
                    }}
                    variant="outline"
                    className="border-green-200 text-green-600 hover:bg-green-50"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    WhatsApp गर्नुहोस्
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Information */}
        <Card className="mt-8 border-indigo-200">
          <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50">
            <CardTitle className="text-indigo-700">ℹ️ थप जानकारी</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">🚗 पार्किङ सुविधा:</h4>
                <p className="text-sm text-gray-600">स्टोरको अगाडि मोटरसाइकल र साइकलको लागि पार्किङ उपलब्ध छ।</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">♿ पहुँच:</h4>
                <p className="text-sm text-gray-600">हाम्रो स्टोर सबै ग्राहकहरूका लागि सजिलै पहुँचयोग्य छ।</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">🏪 स्टोर साइज:</h4>
                <p className="text-sm text-gray-600">ठूलो शोरूम र विस्तृत उत्पादन संग्रह।</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">💳 भुक्तानी:</h4>
                <p className="text-sm text-gray-600">नगद, eSewa, Khalti सबै स्वीकार्य।</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
