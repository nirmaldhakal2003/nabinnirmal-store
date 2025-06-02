import { Truck, Shield, Clock, Phone } from "lucide-react"

export default function Features() {
  const features = [
    {
      icon: <Truck className="h-8 w-8 text-orange-600" />,
      title: "घर पुर्याउने सेवा",
      description: "रामपुर पाल्पा उपत्यकामा निःशुल्क डेलिभरी",
    },
    {
      icon: <Shield className="h-8 w-8 text-orange-600" />,
      title: "गुणस्तरको ग्यारेन्टी",
      description: "१००% प्राकृतिक र शुद्ध उत्पादनहरू",
    },
    {
      icon: <Clock className="h-8 w-8 text-orange-600" />,
      title: "छिटो सेवा",
      description: "२४ घण्टा भित्र डेलिभरी",
    },
    {
      icon: <Phone className="h-8 w-8 text-orange-600" />,
      title: "२४/७ सहयोग",
      description: "जुनसुकै समय सम्पर्क गर्नुहोस्",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">हाम्रा विशेषताहरू</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            नबिन निर्मल स्टोरमा तपाईंलाई उत्कृष्ट सेवा र गुणस्तरीय उत्पादनहरू प्रदान गर्छौं
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
