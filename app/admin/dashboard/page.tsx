"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Building2, Users, Plus, Home, LogOut, Star, MapPin, Bed, TrendingUp, Eye, Edit, Loader2 } from "lucide-react"

interface User {
  id: number
  name: string
  email: string
  mobile?: string
  role: string
}

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
}

export default function AdminDashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [messGroups, setMessGroups] = useState<MessGroup[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const router = useRouter()

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem("token")
    const userData = localStorage.getItem("user")

    if (!token || !userData) {
      router.push("/owner/login")
      return
    }

    try {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      fetchMessGroups(token)
    } catch (error) {
      router.push("/owner/login")
    }
  }, [router])

  const fetchMessGroups = async (token: string) => {
    try {
      setLoading(true)
      const response = await fetch("/api/mess-groups", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch mess groups")
      }

      const data = await response.json()
      setMessGroups(data.messGroups || [])
    } catch (error: any) {
      setError(error.message || "Failed to load mess groups")
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    router.push("/")
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-orange-600 mx-auto mb-4" />
          <p className="text-slate-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  const totalSeats = messGroups.reduce((sum, mess) => sum + mess.single_seats + mess.double_seats, 0)
  const averageRating =
    messGroups.length > 0 ? messGroups.reduce((sum, mess) => sum + mess.rating, 0) / messGroups.length : 0
  const totalRevenue = messGroups.reduce(
    (sum, mess) => sum + mess.single_seats * mess.single_price + mess.double_seats * mess.double_price,
    0,
  )

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
              <span className="text-slate-600">Welcome, {user.name}</span>
              <Link href="/">
                <Button variant="outline" size="sm">
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Admin Dashboard</h1>
          <p className="text-lg text-slate-600">Manage your mess listings and track performance</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Mess Groups</p>
                  <p className="text-3xl font-bold text-slate-800">{messGroups.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Seats</p>
                  <p className="text-3xl font-bold text-slate-800">{totalSeats}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Bed className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-orange-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Average Rating</p>
                  <p className="text-3xl font-bold text-slate-800">{averageRating.toFixed(1)}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Star className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Monthly Revenue</p>
                  <p className="text-3xl font-bold text-slate-800">৳{totalRevenue.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800">Your Mess Listings</h2>
          <Link href="/admin/mess-groups/create">
            <Button className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 shadow-lg hover:shadow-xl transition-all duration-300">
              <Plus className="w-4 h-4 mr-2" />
              Add New Mess
            </Button>
          </Link>
        </div>

        {/* Error Display */}
        {error && <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">{error}</div>}

        {/* Mess Groups List */}
        {loading ? (
          <div className="text-center py-12">
            <Loader2 className="w-12 h-12 animate-spin text-orange-600 mx-auto mb-4" />
            <p className="text-slate-600">Loading mess groups...</p>
          </div>
        ) : messGroups.length > 0 ? (
          <div className="grid gap-6">
            {messGroups.map((mess) => (
              <Card key={mess.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-800 mb-2">{mess.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-slate-600">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{mess.location.charAt(0).toUpperCase() + mess.location.slice(1)}</span>
                        </div>
                        <Badge
                          variant="secondary"
                          className={`${
                            mess.category === "boys" ? "bg-blue-100 text-blue-700" : "bg-pink-100 text-pink-700"
                          }`}
                        >
                          {mess.category.charAt(0).toUpperCase() + mess.category.slice(1)}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span>{mess.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link href={`/mess/${mess.id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                      </Link>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    </div>
                  </div>

                  <p className="text-slate-600 mb-4 line-clamp-2">{mess.description}</p>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Bed className="w-4 h-4 text-blue-600" />
                        <span className="font-medium text-slate-800">Single Seats</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-slate-800">{mess.single_seats} seats</div>
                        <div className="text-sm text-slate-600">৳{mess.single_price}/month</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-green-600" />
                        <span className="font-medium text-slate-800">Double Seats</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-slate-800">{mess.double_seats} seats</div>
                        <div className="text-sm text-slate-600">৳{mess.double_price}/month</div>
                      </div>
                    </div>
                  </div>

                  {mess.amenities && mess.amenities.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {mess.amenities.slice(0, 4).map((amenity, index) => (
                        <Badge key={index} variant="secondary" className="bg-slate-100 text-slate-700">
                          {amenity}
                        </Badge>
                      ))}
                      {mess.amenities.length > 4 && (
                        <Badge variant="secondary" className="bg-slate-100 text-slate-700">
                          +{mess.amenities.length - 4} more
                        </Badge>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="border-0 shadow-lg">
            <CardContent className="text-center py-12">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">No Mess Groups Yet</h3>
              <p className="text-slate-600 mb-6">Start by creating your first mess listing to connect with students.</p>
              <Link href="/admin/mess-groups/create">
                <Button className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Mess
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
