import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 text-white py-8 sm:py-12 md:py-16 lg:py-20 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="text-4xl sm:text-6xl md:text-7xl lg:text-9xl absolute top-2 sm:top-5 md:top-10 left-2 sm:left-5 md:left-10">
          🏔️
        </div>
        <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl absolute top-4 sm:top-10 md:top-20 right-4 sm:right-10 md:right-20">
          🌸
        </div>
        <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl absolute bottom-2 sm:bottom-5 md:bottom-10 left-1/4">
          🕉️
        </div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6">
          <span className="block text-white">नबिन निर्मल स्टोरमा</span>
          <span className="block text-yellow-200">स्वागत छ!</span>
        </h1>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-6 sm:mb-8 max-w-4xl mx-auto px-4">
          दैनिक आवश्यकताका सामानदेखि सौन्दर्य उत्पादनहरूसम्म - सबै एकै ठाउँमा। गुणस्तरीय उत्पादन, उचित मूल्य र भरपर्दो सेवा।
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-md sm:max-w-none mx-auto">
          <Link href="/products" className="w-full sm:w-auto">
            <Button
              size="lg"
              className="bg-white text-red-600 hover:bg-gray-100 font-semibold px-6 sm:px-8 w-full sm:w-auto text-sm sm:text-base"
            >
              🛒 किनमेल सुरु गर्नुहोस्
            </Button>
          </Link>
          <Link href="/about" className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="outline"
              className="border-white text-black hover:bg-white hover:text-red-600 font-semibold px-6 sm:px-8 w-full sm:w-auto text-sm sm:text-base"
            >
              📖 थप जान्नुहोस्
            </Button>
          </Link>
        </div>

        {/* Special Offers Banner */}
        <div className="mt-8 sm:mt-12 bg-white/20 backdrop-blur-sm rounded-lg p-3 sm:p-4 max-w-2xl mx-auto">
          <p className="text-sm sm:text-base lg:text-lg font-semibold">
            🎉 विशेष छुट: रु. ५००० भन्दा माथिको किनमेलमा निःशुल्क डेलिभरी!
          </p>
        </div>
      </div>
    </section>
  )
}
