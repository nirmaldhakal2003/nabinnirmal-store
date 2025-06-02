import { Suspense } from "react"
import Hero from "@/components/Hero"
import FeaturedProducts from "@/components/FeaturedProducts"
import Categories from "@/components/Categories"
import CallToAction from "@/components/CallToAction"
import QuickBuy from "@/components/QuickBuy"
import Loading from "@/components/Loading"

export default function Home() {
  return (
    <div className="bg-gray-50">
      <Hero />
      <Suspense fallback={<Loading />}>
        <FeaturedProducts />
      </Suspense>
      <Categories />
      <CallToAction />
      <section className="py-16 bg-gradient-to-b from-white to-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <QuickBuy />
          </div>
        </div>
      </section>
    </div>
  )
}
