import Link from "next/link"
import { Facebook, Instagram, Mail, Phone, MapPin, Clock } from "lucide-react"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <Image
                src="nns.png?height=32&width=32"
                alt="NabinNirmal Store Logo"
                width={32}
                height={32}
                className="rounded-lg border border-red-400"
              />
              <div>
                <h3 className="text-xl font-bold text-red-400">नबिन निर्मल स्टोर</h3>
                <p className="text-sm text-gray-400">NabinNirmal Store</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              रामपुरको भरपर्दो अनलाइन पसल। गुणस्तरीय उत्पादन र उत्कृष्ट सेवाको लागि हामीलाई भरोसा गर्नुहोस्।
            </p>
            <div className="flex space-x-4">
             <a href="https://www.facebook.com/dhakakhemraj45" target="_blank"> <Facebook className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer" /></a>
              
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-orange-400">द्रुत लिङ्कहरू</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white">
                  गृहपृष्ठ
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-400 hover:text-white">
                  उत्पादनहरू
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white">
                  हाम्रो बारे
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white">
                  सम्पर्क
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-orange-400">श्रेणीहरू</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/products?category=grocery" className="text-gray-400 hover:text-white">
                  🍚 खाद्य सामग्री
                </Link>
              </li>
              <li>
                <Link href="/products?category=cosmetics" className="text-gray-400 hover:text-white">
                  💄 सौन्दर्य उत्पादन
                </Link>
              </li>
              <li>
                <Link href="/products?category=daily-essentials" className="text-gray-400 hover:text-white">
                  🛒 दैनिक सामान
                </Link>
              </li>
              <li>
                <Link href="/products?category=household" className="text-gray-400 hover:text-white">
                  🏠 घरायसी सामान
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-orange-400">सम्पर्क विवरण</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-red-400" />
                <span className="text-gray-400">nirmalbsccsit2@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-red-400" />
                <span className="text-gray-400">+977-9748845865</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-red-400" />
                <span className="text-gray-400">
                  रामपुर पाल्पा
                  <br />
                  नेपाल
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-red-400" />
                <span className="text-gray-400">
                  आइत - शुक्र: बिहान ६ - बेलुका ९
                  <br />
                  शनि: बिहान १० - बेलुका ६
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">© 2025 नबिन निर्मल स्टोर। सबै अधिकार सुरक्षित।</p>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <a href="https://shreeks.com.np" target="_blank"><span>Developed By: Shreeks Softwares</span></a>
              <span>•</span>
              <span>💚 पर्यावरण मैत्री</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
