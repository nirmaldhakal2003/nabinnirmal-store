import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">🏪 नबिन निर्मल स्टोरको बारेमा</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            नबिन र निर्मलद्वारा स्थापित, हाम्रो पसलले तपाईंलाई उत्कृष्ट गुणस्तर र अतुलनीय ग्राहक सेवाका साथ उत्तम उत्पादनहरू प्रदान गर्न
            प्रतिबद्ध छ।
          </p>
        </div>

        {/* Founders Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <Card className="border-orange-200 overflow-hidden">
            <CardContent className="p-8 text-center bg-gradient-to-br from-red-50 to-orange-50">
              <Image
                src="IMG_0122.JPG?height=200&width=200"
                alt="नबिन"
                width={200}
                height={200}
                className="rounded-full mx-auto mb-6 border-4 border-red-200"
              />
              <h3 className="text-2xl font-bold mb-2 text-red-700">खेम राज ढकाल</h3>
              <p className="text-sm text-gray-500 mb-4">संस्थापक सह-साझेदार</p>
             
            </CardContent>
          </Card>

          <Card className="border-orange-200 overflow-hidden">
            <CardContent className="p-8 text-center bg-gradient-to-br from-orange-50 to-yellow-50">
              <Image
                src="IMG_E0136.jpg?height=200&width=200"
                alt="निर्मल"
                width={200}
                height={200}
                className="rounded-full mx-auto mb-6 border-4 border-orange-200"
              />
              <h3 className="text-2xl font-bold mb-2 text-orange-700">गोमा देवी ढकाल</h3>
              <p className="text-sm text-gray-500 mb-4">संस्थापक सह-साझेदार</p>
              
            </CardContent>
          </Card>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-lg p-8 mb-16 border border-orange-200 shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-8 text-red-700">🎯 हाम्रो लक्ष्य</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-red-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🏆</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-red-700">गुणस्तर पहिलो</h3>
              <p className="text-gray-600">
                हामी हरेक उत्पादनलाई सावधानीपूर्वक छान्छौं ताकि यो गुणस्तर र टिकाउपनाका लागि हाम्रो उच्च मापदण्डहरू पूरा गर्छ।
              </p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">😊</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-orange-700">ग्राहक सन्तुष्टि</h3>
              <p className="text-gray-600">
                तपाईंको खुशी नै हाम्रो प्राथमिकता हो। हामी हरेक ग्राहकलाई अद्भुत अनुभव दिन सधैं तत्पर छौं।
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🌱</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-green-700">दिगोपना</h3>
              <p className="text-gray-600">हामी पर्यावरण-मैत्री उत्पादनहरू र दिगो व्यापारिक अभ्यासहरू प्रदान गर्न प्रतिबद्ध छौं।</p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-8 text-red-700">🤝 हामीलाई किन रोज्ने?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-lg shadow-md border border-orange-200">
              <div className="text-3xl mb-3">🚚</div>
              <h4 className="font-semibold text-lg mb-2 text-red-700">छिटो डेलिभरी</h4>
              <p className="text-gray-600">रामपुर पाल्पा उपत्यकामा २४ घण्टामा भरपर्दो डेलिभरी</p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-6 rounded-lg shadow-md border border-orange-200">
              <div className="text-3xl mb-3">💰</div>
              <h4 className="font-semibold text-lg mb-2 text-orange-700">उचित मूल्य</h4>
              <p className="text-gray-600">गुणस्तरमा कुनै सम्झौता नगरी प्रतिस्पर्धी मूल्य निर्धारण</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-lg shadow-md border border-orange-200">
              <div className="text-3xl mb-3">🔄</div>
              <h4 className="font-semibold text-lg mb-2 text-green-700">सजिलो फिर्ता</h4>
              <p className="text-gray-600">तपाईंको मानसिक शान्तिको लागि ७ दिनको फिर्ता नीति</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg shadow-md border border-orange-200">
              <div className="text-3xl mb-3">🎧</div>
              <h4 className="font-semibold text-lg mb-2 text-blue-700">२४/७ सहयोग</h4>
              <p className="text-gray-600">कुनै पनि प्रश्न वा चिन्ताको लागि सधैं यहाँ छौं</p>
            </div>
          </div>
        </div>

        {/* Nepal Pride Section */}
        <div className="mt-16 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">🇳🇵 रामपुरको गर्व</h2>
          <p className="text-lg max-w-3xl mx-auto">
            हामी नेपाली उत्पादनहरूलाई प्राथमिकता दिन्छौं र स्थानीय उत्पादकहरूलाई समर्थन गर्छौं। हाम्रो लक्ष्य रामपुरको अर्थतन्त्रमा योगदान
            पुर्याउनु र "मेड इन नेपाल" ब्राण्डलाई विश्वव्यापी बनाउनु हो।
          </p>
        </div>
      </div>
    </div>
  )
}
