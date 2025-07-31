import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, MapPin, Building2, Star, Shield, Clock } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-slate-800">
              HSTU Mess Finder
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/owner/login">
                <Button variant="outline" size="sm">
                  Owner Login
                </Button>
              </Link>
              <Link href="/owner/signup">
                <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                  Register Mess
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-20 text-center text-white">
          <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30">
            🏠 HSTU Official Mess Finder
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            Find Your Perfect Mess
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Discover the best mess services at HSTU with our comprehensive platform. Compare prices, check availability,
            and find your ideal accommodation.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
              <Star className="w-4 h-4" />
              <span>Verified Listings</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
              <Shield className="w-4 h-4" />
              <span>Secure Platform</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
              <Clock className="w-4 h-4" />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Main Selection Cards */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Boys Section */}
          <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50 overflow-hidden">
            <div className="relative h-64 overflow-hidden">
              <Image
                src="/images/boys-mess-building.png"
                alt="Boys Mess Building"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30 mb-2">
                  <Building2 className="w-4 h-4 mr-1" />
                  Premium Facilities
                </Badge>
              </div>
            </div>
            <CardHeader className="text-center pb-4">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-12 h-12 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold text-slate-800 mb-2">Boys Accommodation</CardTitle>
              <CardDescription className="text-lg text-slate-600">
                Explore comfortable and affordable mess options for male students
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3">
                <Link href="/location/mohabalipur-boys" className="block">
                  <Button className="w-full h-14 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300">
                    <MapPin className="w-5 h-5 mr-3" />
                    Mohabalipur Area
                    <Badge variant="secondary" className="ml-auto bg-white/20 text-white">
                      12+ Options
                    </Badge>
                  </Button>
                </Link>
                <Link href="/location/bcs-gali-boys" className="block">
                  <Button className="w-full h-14 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300">
                    <MapPin className="w-5 h-5 mr-3" />
                    BCS Gali
                    <Badge variant="secondary" className="ml-auto bg-white/20 text-white">
                      8+ Options
                    </Badge>
                  </Button>
                </Link>
                <Link href="/location/kornai-boys" className="block">
                  <Button className="w-full h-14 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300">
                    <MapPin className="w-5 h-5 mr-3" />
                    Kornai
                    <Badge variant="secondary" className="ml-auto bg-white/20 text-white">
                      6+ Options
                    </Badge>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Girls Section */}
          <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-pink-50 to-rose-50 overflow-hidden">
            <div className="relative h-64 overflow-hidden">
              <Image
                src="/images/girls-mess-building.png"
                alt="Girls Mess Building"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30 mb-2">
                  <Shield className="w-4 h-4 mr-1" />
                  Safe & Secure
                </Badge>
              </div>
            </div>
            <CardHeader className="text-center pb-4">
              <div className="w-24 h-24 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-12 h-12 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold text-slate-800 mb-2">Girls Accommodation</CardTitle>
              <CardDescription className="text-lg text-slate-600">
                Safe and comfortable mess facilities designed for female students
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3">
                <Link href="/location/mohabalipur-girls" className="block">
                  <Button className="w-full h-14 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300">
                    <MapPin className="w-5 h-5 mr-3" />
                    Mohabalipur Area
                    <Badge variant="secondary" className="ml-auto bg-white/20 text-white">
                      10+ Options
                    </Badge>
                  </Button>
                </Link>
                <Link href="/location/bcs-gali-girls" className="block">
                  <Button className="w-full h-14 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300">
                    <MapPin className="w-5 h-5 mr-3" />
                    BCS Gali
                    <Badge variant="secondary" className="ml-auto bg-white/20 text-white">
                      7+ Options
                    </Badge>
                  </Button>
                </Link>
                <Link href="/location/kornai-girls" className="block">
                  <Button className="w-full h-14 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300">
                    <MapPin className="w-5 h-5 mr-3" />
                    Kornai
                    <Badge variant="secondary" className="ml-auto bg-white/20 text-white">
                      5+ Options
                    </Badge>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Featured Facilities Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Premium Facilities</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Experience world-class amenities designed for student comfort and convenience
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/images/mess-inner-view.jpg"
                  alt="Comfortable Living Spaces"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-semibold text-lg">Comfortable Rooms</h3>
                  <p className="text-white/90 text-sm">Modern furnished accommodations</p>
                </div>
              </div>
            </Card>
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/images/kitchen.jpg"
                  alt="Modern Kitchen Facilities"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-semibold text-lg">Modern Kitchen</h3>
                  <p className="text-white/90 text-sm">Hygienic food preparation areas</p>
                </div>
              </div>
            </Card>
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/images/washroom.jpg"
                  alt="Clean Washroom Facilities"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-semibold text-lg">Clean Washrooms</h3>
                  <p className="text-white/90 text-sm">Sanitized bathroom facilities</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* About Section */}
        <Card className="mb-16 border-0 shadow-xl bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50">
          <CardHeader className="text-center pb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Building2 className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-4xl font-bold text-slate-800 mb-4">About HSTU Mess Finder</CardTitle>
          </CardHeader>
          <CardContent className="max-w-4xl mx-auto">
            <p className="text-lg text-slate-700 leading-relaxed text-center mb-8">
              HSTU Mess Finder is your comprehensive solution for finding the perfect accommodation near Hajee Mohammad
              Danesh Science and Technology University. We connect students with verified mess services, offering
              detailed information about pricing, availability, and amenities.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-white/50 rounded-xl">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">Verified Listings</h3>
                <p className="text-sm text-slate-600">All mess services are verified for quality and authenticity</p>
              </div>
              <div className="text-center p-6 bg-white/50 rounded-xl">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">Prime Locations</h3>
                <p className="text-sm text-slate-600">Strategic locations near campus for easy commuting</p>
              </div>
              <div className="text-center p-6 bg-white/50 rounded-xl">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">Safe & Secure</h3>
                <p className="text-sm text-slate-600">Prioritizing student safety and security in all listings</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Owner Section */}
        <Card className="max-w-4xl mx-auto border-0 shadow-xl bg-gradient-to-r from-orange-50 via-amber-50 to-yellow-50">
          <CardHeader className="text-center pb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Building2 className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold text-slate-800 mb-2">Mess Owner Portal</CardTitle>
            <CardDescription className="text-lg text-slate-600">
              Join our platform to showcase your mess services to HSTU students
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-slate-700 mb-8 max-w-2xl mx-auto">
              Are you a mess owner looking to connect with students? Register your mess service on our platform and
              reach hundreds of potential residents.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/owner/signup">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white px-8 py-3 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Register Your Mess
                </Button>
              </Link>
              <Link href="/owner/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-orange-600 text-orange-600 hover:bg-orange-50 px-8 py-3 text-lg font-medium transition-all duration-300 bg-transparent"
                >
                  Owner Login
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">HSTU Mess Finder</h3>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
              Connecting HSTU students with quality accommodation since 2025. Your trusted partner in finding the
              perfect mess service.
            </p>
            <div className="border-t border-slate-700 pt-6">
              <p className="text-slate-400 mb-2">&copy; 2025 HSTU Mess Finder. All rights reserved.</p>
              <p className="text-slate-500">
                Developed with ❤️ by <span className="text-orange-400 font-medium">Samiul Islam Sami</span>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
