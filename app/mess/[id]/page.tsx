"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  MapPin,
  Phone,
  Mail,
  Star,
  Users,
  Bed,
  Home,
  ArrowLeft,
  Wifi,
  Car,
  Shield,
  Zap,
  Loader2,
  AlertCircle,
  Menu,
  X,
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

const amenityIcons: { [key: string]: any } = {
  WiFi: Wifi,
  Parking: Car,
  Security: Shield,
  Generator: Zap,
  "24/7 Security": Shield,
  AC: Zap,
  "Study Room": Users,
  "Common Room": Users,
  Garden: MapPin,
  Laundry: Users,
}

// Define MobileMenu outside of the component to avoid duplication and ensure consistency
function MobileMenu({ open, setOpen }: { open: boolean, setOpen: (v: boolean) => void }) {
  return (
    <div className="relative">
      <Button variant="outline" size="icon" onClick={() => setOpen(!open)} aria-label="Open menu">
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-slate-200 z-50">
          <Link href="/">
            <Button variant="ghost" className="w-full justify-start" onClick={() => setOpen(false)}>
              <Home className="w-4 h-4 mr-2" /> Home
            </Button>
          </Link>
          <Link href="/owner/login">
            <Button variant="ghost" className="w-full justify-start" onClick={() => setOpen(false)}>
              Login
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default function MessDetailPage({ params }: MessDetailPageProps) {
  const { id } = params; // Destructure id from params

  const router = require('next/navigation').useRouter();
  const [user, setUser] = useState<any>(null);
  const [messGroup, setMessGroup] = useState<MessGroup | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userRating, setUserRating] = useState<number>(0);
  const [ratingLoading, setRatingLoading] = useState(false);
  const [ratingError, setRatingError] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      const currentPath = window.location.pathname;
      router.replace(`/owner/login?redirect_back=${encodeURIComponent(currentPath)}`);
      return;
    }
    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    } catch {
      const currentPath = window.location.pathname;
      router.replace(`/owner/login?redirect_back=${encodeURIComponent(currentPath)}`);
    }
  }, [router]);

  useEffect(() => {
    fetchMessGroup();
  }, [id]);

  const handleStarClick = (star: number) => {
    setUserRating(star)
  }

  const handleRatingSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!userRating) return
    setRatingLoading(true)
    setRatingError("")
    try {
      const res = await fetch(`/api/mess-groups/${id}/rating`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating: userRating }),
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.error || "Failed to update rating")
      setMessGroup((prev) => prev ? { ...prev, rating: userRating } : prev)
    } catch (err: any) {
      setRatingError(err.message || "Failed to update rating")
    } finally {
      setRatingLoading(false)
    }
  }

  const fetchMessGroup = async () => {
    try {
      setLoading(true)
      setError("")

      console.log("Frontend: Fetching mess group with ID:", id)

      const response = await fetch(`/api/mess-groups/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })

      console.log("Frontend: Response status:", response.status)

      const responseText = await response.text()
      console.log("Frontend: Raw response:", responseText.substring(0, 200))

      let data
      try {
        data = JSON.parse(responseText)
      } catch (parseError) {
        console.error("Frontend: JSON parse error:", parseError)
        throw new Error(`Invalid JSON response: ${responseText.substring(0, 100)}`)
      }

      if (!data.success) {
        throw new Error(data.error || "Failed to fetch mess group")
      }

      setMessGroup(data.data)
    } catch (error: any) {
      console.error("Frontend: Error fetching mess group:", error)
      setError(error.message || "Failed to load mess group")
    } finally {
      setLoading(false)
    }
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
          <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md">
            <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-red-800 mb-2">Error Loading Mess Details</h2>
            <p className="text-red-600 mb-4">{error || "Mess group not found"}</p>
            <div className="flex gap-2 justify-center">
              <Button onClick={fetchMessGroup} variant="outline" className="border-red-300 text-red-700 bg-transparent">
                Try Again
              </Button>
              <Link href="/">
                <Button variant="outline">Go Home</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const categoryColor = messGroup.category === "boys" ? "blue" : "pink"
  const gradientClass = categoryColor === "blue" ? "from-blue-600 to-cyan-600" : "from-pink-600 to-rose-600"
  const imageUrl = categoryColor === "blue" ? "/images/boys-mess-building.png" : "/images/girls-mess-building.png"

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-slate-800">
              HSTU Mess Finder
            </Link>
            {/* Desktop nav */}
            <div className="hidden sm:flex items-center gap-4">
              <Link href="/">
                <Button variant="outline" size="sm">
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Button>
              </Link>
              {user ? (
                <div className="relative">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  >
                    Profile
                  </Button>
                  {mobileMenuOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-slate-200 z-50">
                      <Link href="/user">
                        <Button variant="ghost" className="w-full justify-start">
                          Profile
                        </Button>
                      </Link>
                      {user.role === "owner" && (
                        <Link href="/admin/dashboard">
                          <Button variant="ghost" className="w-full justify-start">
                            Admin Dashboard
                          </Button>
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <Link href="/owner/login">
                  <Button variant="outline" size="sm">
                    Login
                  </Button>
                </Link>
              )}
            </div>
            {/* Mobile nav */}
            <div className="sm:hidden">
              <MobileMenu open={mobileMenuOpen} setOpen={setMobileMenuOpen} />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden h-96">
        <Image src={imageUrl || "/placeholder.svg"} alt={messGroup.name} fill className="object-cover" />
        <div className={`absolute inset-0 bg-gradient-to-r ${gradientClass} bg-opacity-80`}></div>
        <div className="relative container mx-auto px-4 py-16 h-full flex flex-col justify-center">
          <div className="flex items-center mb-6">
            <Link href="/">
              <Button
                variant="secondary"
                size="sm"
                className="bg-white/20 text-white border-white/30 hover:bg-white/30 mr-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30 capitalize">
              {messGroup.category} Mess
            </Badge>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{messGroup.name}</h1>
          <div className="flex items-center text-white/90 text-lg">
            <MapPin className="w-5 h-5 mr-2" />
            {messGroup.address}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl">About This Mess</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 leading-relaxed">{messGroup.description}</p>
              </CardContent>
            </Card>

            {/* Pricing */}
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl">Pricing & Availability</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
                    <div className="flex items-center mb-4">
                      <Bed className="w-6 h-6 text-blue-600 mr-3" />
                      <h3 className="text-xl font-semibold text-blue-800">Single Room</h3>
                    </div>
                    <div className="text-3xl font-bold text-blue-900 mb-2">৳{messGroup.single_price}</div>
                    <div className="text-blue-700 mb-4">per month</div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 text-blue-600 mr-2" />
                      <span className="text-blue-700">{messGroup.single_seats} seats available</span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 rounded-xl">
                    <div className="flex items-center mb-4">
                      <Users className="w-6 h-6 text-emerald-600 mr-3" />
                      <h3 className="text-xl font-semibold text-emerald-800">Double Room</h3>
                    </div>
                    <div className="text-3xl font-bold text-emerald-900 mb-2">৳{messGroup.double_price}</div>
                    <div className="text-emerald-700 mb-4">per month</div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 text-emerald-600 mr-2" />
                      <span className="text-emerald-700">{messGroup.double_seats} seats available</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl">Amenities & Facilities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {messGroup.amenities.map((amenity, index) => {
                    const IconComponent = amenityIcons[amenity] || Users
                    return (
                      <div key={index} className="flex items-center p-3 bg-slate-50 rounded-lg">
                        <IconComponent className="w-5 h-5 text-slate-600 mr-3" />
                        <span className="text-slate-700 font-medium">{amenity}</span>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Rating */}
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl">Rating</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-4">
                  <div className="text-4xl font-bold text-slate-800 mr-3">{messGroup.rating}</div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-6 h-6 cursor-pointer ${
                          i < (userRating || Math.floor(messGroup.rating)) ? "text-yellow-400 fill-current" : "text-slate-300"
                        }`}
                        onClick={() => handleStarClick(i + 1)}
                      />
                    ))}
                  </div>
                </div>
                <form onSubmit={handleRatingSubmit} className="flex items-center gap-2 mb-2">
                  <Button type="submit" size="sm" disabled={ratingLoading || !userRating}>
                    {ratingLoading ? "Saving..." : "Submit Rating"}
                  </Button>
                  {ratingError && <span className="text-red-600 text-sm">{ratingError}</span>}
                </form>
                <p className="text-slate-600">Based on student reviews</p>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {messGroup.owner_name && (
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-1">Owner</h4>
                    <p className="text-slate-600">{messGroup.owner_name}</p>
                  </div>
                )}

                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-slate-600 mr-3" />
                  <div>
                    <div className="font-medium text-slate-800">{messGroup.contact_phone}</div>
                    <div className="text-sm text-slate-500">Primary contact</div>
                  </div>
                </div>

                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-slate-600 mr-3" />
                  <div>
                    <div className="font-medium text-slate-800">{messGroup.contact_email}</div>
                    <div className="text-sm text-slate-500">Email address</div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Button asChild className="w-full">
                    <a href={`tel:${messGroup.contact_phone}`}>
                      <Phone className="w-4 h-4 mr-2" />
                      Call Now
                    </a>
                  </Button>
                  <Button variant="outline" asChild className="w-full bg-transparent">
                    <a href={`mailto:${messGroup.contact_email}`}>
                      <Mail className="w-4 h-4 mr-2" />
                      Send Email
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Info */}
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl">Quick Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-600">Location</span>
                  <span className="font-medium capitalize">{messGroup.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Category</span>
                  <span className="font-medium capitalize">{messGroup.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Total Seats</span>
                  <span className="font-medium">{messGroup.single_seats + messGroup.double_seats}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Status</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    Active
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-xl font-bold mb-4">HSTU Mess Finder</h3>
          <Separator className="bg-slate-700 mb-6" />
          <p className="text-slate-400 mb-2">&copy; 2025 HSTU Mess Finder. All rights reserved.</p>
          <p className="text-slate-500">
            Developed with ❤️ by <span className="text-orange-400 font-medium">Ashik Hentai</span>
          </p>
        </div>
      </footer>
    </div>
  )
}
