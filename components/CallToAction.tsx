import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CallToAction() {
  return (
    <section className="bg-gradient-to-r from-red-800 via-red-600 to-orange-600 text-white py-16 relative overflow-hidden">
      {/* Decorative Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="text-8xl absolute top-5 left-10">🏔️</div>
        <div className="text-6xl absolute top-10 right-20">🌺</div>
        <div className="text-7xl absolute bottom-5 left-1/3">🕉️</div>
        <div className="text-5xl absolute bottom-10 right-10">🎋</div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">🛍️ किनमेल सुरु गर्न तयार हुनुहुन्छ?</h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto">
          हजारौं सन्तुष्ट ग्राहकहरूको साथमा सामेल हुनुहोस् जसले गुणस्तरीय उत्पादन र उत्कृष्ट सेवाको लागि नबिन निर्मल स्टोरलाई भरोसा गर्छन्।
        </p>

        {/* Special Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-8 max-w-4xl mx-auto">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
            <div className="text-2xl mb-2">🚚</div>
            <h3 className="font-semibold mb-1">छिटो डेलिभरी</h3>
            <p className="text-sm">रामपुर पाल्पा उपत्यकामा २४ घण्टामा</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
            <div className="text-2xl mb-2">💰</div>
            <h3 className="font-semibold mb-1">उचित मूल्य</h3>
            <p className="text-sm">बजारमा सबैभन्दा राम्रो दाम</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
            <div className="text-2xl mb-2">🔄</div>
            <h3 className="font-semibold mb-1">सजिलो फिर्ता</h3>
            <p className="text-sm">७ दिनको फिर्ता नीति</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/products">
            <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 font-semibold px-8">
              🛒 उत्पादनहरू हेर्नुहोस्
            </Button>
          </Link>
          <Link href="/signup">
            <Button
              size="lg"
              variant="outline"
              className="border-white text-black hover:bg-white hover:text-red-600 font-semibold px-8"
            >
              📝 खाता खोल्नुहोस्
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
