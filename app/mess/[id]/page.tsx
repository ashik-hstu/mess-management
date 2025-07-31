"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Home,
  ArrowLeft,
  MapPin,
  Users,
  Star,
  Phone,
  Mail,
  Building2,
  Bed,
  Shield,
  Wifi,
  Car,
  Loader2,
} from "lucide-react"

interface MessGroup {
  id: number
  name: string
  location: string
  category: string
  description: string
  single_seats: number
  single_price: number
  double_seats: number
  double_price: number
  rating: number
  amenities: string[]
  contact_phone: string
  contact_email: string
  address: string
  is_active: boolean
  created_at: string
  owner_name?: string
  owner_mobile?: string
  owner_email?: string
}

interface MessDetailPageProps {
  params: {
    id: string
  }
}

export default function MessDetailPage({ params }: MessDetailPageProps) {
  const { id } = params
  const [messGroup, setMessGroup] = useState<MessGroup | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchMessGroup()
  }, [id])

  const fetchMessGroup = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/mess-groups/${id}`)

      if (!response.ok) {
        throw new Error("Mess group not found")
      }

      const data = await response.json()
      setMessGroup(data.messGroup)
    } catch (error: any) {
      setError(error.message || "Failed to load mess details")
    } finally {
      setLoading(false)
    }
  }

  const getAmenityIcon = (amenity: string) => {
    const iconMap: { [key: string]: any } = {
      WiFi: Wifi,
      Wifi: Wifi,
      Parking: Car,
      Security: Shield,
      "24/7 Security": Shield,
      CCTV: Shield,
    }
    return iconMap[amenity] || Building2
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-orange-600 mx-auto mb-4" />
          <p className="text-slate-600">Loading mess details...</p>
        </div>
      </div>
    )
  }

  if (error || !messGroup) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-10 h-10 text-red-600" />
          </div>
          <h3 className="text-xl font-semibold text-slate-800 mb-2">Mess Not Found</h3>
          <p className="text-slate-600 mb-6">{error}</p>
          <Link href="/">
            <Button>
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const colorClasses =
    messGroup.category === "boys"
      ? { gradient: "from-blue-600 to-cyan-600", bg: "from-blue-50 to-cyan-50" }
      : { gradient: "from-pink-600 to-rose-600", bg: "from-pink-50 to-rose-50" }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-slate-800">
              HSTU Mess Finder
            </Link>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" onClick={() => window.history.back()}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Link href="/">
                <Button variant="outline" size="sm">
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Header */}
      <div className={`relative overflow-hidden bg-gradient-to-r ${colorClasses.gradient}`}>
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative container mx-auto px-4 py-16">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-4">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <Building2 className="w-4 h-4 mr-1" />
                {messGroup.category.charAt(0).toUpperCase() + messGroup.category.slice(1)} Mess
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <MapPin className="w-4 h-4 mr-1" />
                {messGroup.location.charAt(0).toUpperCase() + messGroup.location.slice(1)}
              </Badge>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{messGroup.name}</h1>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(messGroup.rating) ? "text-yellow-400 fill-current" : "text-white/50"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-white text-lg font-medium">{messGroup.rating}</span>
              </div>
              <Separator orientation="vertical" className="h-6 bg-white/30" />
              <div className="flex items-center gap-2 text-white">
                <Users className="w-5 h-5" />
                <span>{messGroup.single_seats + messGroup.double_seats} Total Seats</span>
              </div>
            </div>
            <p className="text-xl text-white/90 leading-relaxed">{messGroup.description}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Pricing Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Bed className="w-8 h-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-2xl">Single Occupancy</CardTitle>
                  <CardDescription>Private room for individual students</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="mb-4">
                    <div className="text-4xl font-bold text-slate-800 mb-2">৳{messGroup.single_price}</div>
                    <div className="text-slate-600">per month</div>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-700 mb-4">
                    {messGroup.single_seats} seats available
                  </Badge>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Book Single Seat</Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-green-600" />
                  </div>
                  <CardTitle className="text-2xl">Double Occupancy</CardTitle>
                  <CardDescription>Shared room for two students</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="mb-4">
                    <div className="text-4xl font-bold text-slate-800 mb-2">৳{messGroup.double_price}</div>
                    <div className="text-slate-600">per person/month</div>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-700 mb-4">
                    {messGroup.double_seats} seats available
                  </Badge>
                  <Button className="w-full bg-green-600 hover:bg-green-700">Book Double Seat</Button>
                </CardContent>
              </Card>
            </div>

            {/* Amenities */}
            {messGroup.amenities && messGroup.amenities.length > 0 && (
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">Amenities & Facilities</CardTitle>
                  <CardDescription>Everything you need for comfortable living</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {messGroup.amenities.map((amenity, index) => {
                      const IconComponent = getAmenityIcon(amenity)
                      return (
                        <div key={index} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                            <IconComponent className="w-5 h-5 text-slate-600" />
                          </div>
                          <span className="font-medium text-slate-800">{amenity}</span>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Address */}
            {messGroup.address && (
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <MapPin className="w-6 h-6 mr-3" />
                    Location & Address
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-slate-700">{messGroup.address}</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-amber-50">
              <CardHeader>
                <CardTitle className="text-xl">Contact Information</CardTitle>
                <CardDescription>Get in touch with the mess owner</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {messGroup.owner_name && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">{messGroup.owner_name}</p>
                      <p className="text-sm text-slate-600">Owner</p>
                    </div>
                  </div>
                )}

                {(messGroup.contact_phone || messGroup.owner_mobile) && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Phone className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">{messGroup.contact_phone || messGroup.owner_mobile}</p>
                      <p className="text-sm text-slate-600">Phone</p>
                    </div>
                  </div>
                )}

                {(messGroup.contact_email || messGroup.owner_email) && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Mail className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">{messGroup.contact_email || messGroup.owner_email}</p>
                      <p className="text-sm text-slate-600">Email</p>
                    </div>
                  </div>
                )}

                <Separator />

                <div className="space-y-3">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Mail className="w-4 h-4 mr-2" />
                    Send Email
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Category</span>
                  <Badge
                    variant="secondary"
                    className={`${
                      messGroup.category === "boys" ? "bg-blue-100 text-blue-700" : "bg-pink-100 text-pink-700"
                    }`}
                  >
                    {messGroup.category.charAt(0).toUpperCase() + messGroup.category.slice(1)}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Location</span>
                  <span className="font-medium text-slate-800">
                    {messGroup.location.charAt(0).toUpperCase() + messGroup.location.slice(1)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Total Seats</span>
                  <span className="font-medium text-slate-800">{messGroup.single_seats + messGroup.double_seats}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-medium text-slate-800">{messGroup.rating}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Status</span>
                  <Badge variant={messGroup.is_active ? "default" : "secondary"}>
                    {messGroup.is_active ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-xl font-bold mb-4">HSTU Mess Finder</h3>
          <Separator className="bg-slate-700 mb-6" />
          <p className="text-slate-400 mb-2">&copy; 2025 HSTU Mess Finder. All rights reserved.</p>
          <p className="text-slate-500">
            Developed with ❤️ by <span className="text-orange-400 font-medium">Samiul Islam Sami</span>
          </p>
        </div>
      </footer>
    </div>
  )
}
