"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Building2,
  Users,
  Star,
  Plus,
  Home,
  LogOut,
  Settings,
  Eye,
  Edit,
  Trash2,
  Phone,
  Mail,
  MapPin,
  Loader2,
  AlertCircle,
} from "lucide-react"

interface User {
  id: number
  name: string
  email: string
  mobile: string
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
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [messGroups, setMessGroups] = useState<MessGroup[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    // Check if user is logged in
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
      console.error("Error parsing user data:", error)
      router.push("/owner/login")
    }
  }, [router])

  const fetchMessGroups = async (token: string) => {
    try {
      setLoading(true)
      setError("")

      const response = await fetch("/api/mess-groups", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      const responseText = await response.text()
      console.log("Dashboard: Raw response:", responseText.substring(0, 200))

      let data
      try {
        data = JSON.parse(responseText)
      } catch (parseError) {
        console.error("Dashboard: JSON parse error:", parseError)
        throw new Error(`Invalid response: ${responseText.substring(0, 100)}`)
      }

      if (!data.success) {
        throw new Error(data.error || "Failed to fetch mess groups")
      }

      setMessGroups(data.messGroups || [])
    } catch (error: any) {
      console.error("Dashboard: Error fetching mess groups:", error)
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

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Owner Dashboard</h1>
          <p className="text-slate-600">Manage your mess listings and view analytics</p>
        </div>

        {/* Error Display */}
        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-700">{error}</AlertDescription>
          </Alert>
        )}

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Total Listings</p>
                  <p className="text-3xl font-bold text-slate-800">{messGroups.length}</p>
                </div>
                <Building2 className="w-12 h-12 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Total Seats</p>
                  <p className="text-3xl font-bold text-slate-800">{totalSeats}</p>
                </div>
                <Users className="w-12 h-12 text-emerald-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Average Rating</p>
                  <p className="text-3xl font-bold text-slate-800">{averageRating.toFixed(1)}</p>
                </div>
                <Star className="w-12 h-12 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Active Listings</p>
                  <p className="text-3xl font-bold text-slate-800">{messGroups.filter((m) => m.is_active).length}</p>
                </div>
                <Settings className="w-12 h-12 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800">Your Mess Listings</h2>
          <Link href="/admin/mess-groups/create">
            <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
              <Plus className="w-4 h-4 mr-2" />
              Add New Mess
            </Button>
          </Link>
        </div>

        {/* Mess Listings */}
        {loading ? (
          <div className="text-center py-12">
            <Loader2 className="w-12 h-12 animate-spin text-orange-600 mx-auto mb-4" />
            <p className="text-slate-600">Loading your mess listings...</p>
          </div>
        ) : messGroups.length > 0 ? (
          <div className="grid gap-6">
            {messGroups.map((mess) => (
              <Card key={mess.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-800 mb-2">{mess.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-slate-600">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {mess.address}
                        </div>
                        <Badge variant="secondary" className="capitalize">
                          {mess.category}
                        </Badge>
                        <Badge variant={mess.is_active ? "default" : "secondary"}>
                          {mess.is_active ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="font-semibold">{mess.rating}</span>
                    </div>
                  </div>

                  <p className="text-slate-600 mb-4 line-clamp-2">{mess.description}</p>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <div className="text-sm text-slate-600">Single Room</div>
                      <div className="font-semibold">৳{mess.single_price}/month</div>
                      <div className="text-sm text-slate-500">{mess.single_seats} seats</div>
                    </div>
                    <div className="bg-emerald-50 p-3 rounded-lg">
                      <div className="text-sm text-slate-600">Double Room</div>
                      <div className="font-semibold">৳{mess.double_price}/month</div>
                      <div className="text-sm text-slate-500">{mess.double_seats} seats</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-slate-600">
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-1" />
                        {mess.contact_phone}
                      </div>
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 mr-1" />
                        {mess.contact_email}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/mess/${mess.id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      </Link>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="border-0 shadow-lg">
            <CardContent className="p-12 text-center">
              <Building2 className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-800 mb-2">No Mess Listings Yet</h3>
              <p className="text-slate-600 mb-6">
                Get started by creating your first mess listing to attract students.
              </p>
              <Link href="/admin/mess-groups/create">
                <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Listing
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-xl font-bold mb-4">HSTU Mess Finder</h3>
          <Separator className="bg-slate-700 mb-6" />
          <p className="text-slate-400 mb-2">&copy; 2025 HSTU Mess Finder. All rights reserved.</p>
          <p className="text-slate-500">
            Developed with ❤️ by <span className="text-orange-400 font-medium">Ashik HentaiSami</span>
          </p>
        </div>
      </footer>
    </div>
  )
}
