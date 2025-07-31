"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Home, Plus, Building2, Users, MapPin, Star, LogOut, Edit, Eye } from "lucide-react"

interface User {
  id: number
  name: string
  email: string
  mobile: string
  location: string
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

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
              <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                {user.name}
              </Badge>
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
          <p className="text-lg text-slate-600">Manage your mess listings and view analytics</p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
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
                  <p className="text-3xl font-bold text-slate-800">
                    {messGroups.reduce((acc, mess) => acc + mess.single_seats + mess.double_seats, 0)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Average Rating</p>
                  <p className="text-3xl font-bold text-slate-800">
                    {messGroups.length > 0
                      ? (messGroups.reduce((acc, mess) => acc + mess.rating, 0) / messGroups.length).toFixed(1)
                      : "0.0"}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Star className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800">Your Mess Groups</h2>
          <Link href="/admin/mess-groups/create">
            <Button className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
              <Plus className="w-4 h-4 mr-2" />
              Add New Mess Group
            </Button>
          </Link>
        </div>

        {/* Mess Groups List */}
        {messGroups.length === 0 ? (
          <Card className="border-0 shadow-lg">
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">No Mess Groups Yet</h3>
              <p className="text-slate-600 mb-6">Create your first mess group to start managing accommodations</p>
              <Link href="/admin/mess-groups/create">
                <Button className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Mess Group
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {messGroups.map((mess) => (
              <Card key={mess.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-slate-800">{mess.name}</h3>
                        <Badge
                          variant="secondary"
                          className={`${
                            mess.category === "boys" ? "bg-blue-100 text-blue-700" : "bg-pink-100 text-pink-700"
                          }`}
                        >
                          {mess.category}
                        </Badge>
                        <Badge variant="outline" className="bg-slate-50">
                          <MapPin className="w-3 h-3 mr-1" />
                          {mess.location}
                        </Badge>
                      </div>
                      <p className="text-slate-600 mb-4 line-clamp-2">{mess.description}</p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="text-center p-3 bg-slate-50 rounded-lg">
                          <p className="text-sm text-slate-600">Single Seats</p>
                          <p className="text-lg font-bold text-slate-800">{mess.single_seats}</p>
                          <p className="text-sm text-slate-500">৳{mess.single_price}</p>
                        </div>
                        <div className="text-center p-3 bg-slate-50 rounded-lg">
                          <p className="text-sm text-slate-600">Double Seats</p>
                          <p className="text-lg font-bold text-slate-800">{mess.double_seats}</p>
                          <p className="text-sm text-slate-500">৳{mess.double_price}</p>
                        </div>
                        <div className="text-center p-3 bg-slate-50 rounded-lg">
                          <p className="text-sm text-slate-600">Rating</p>
                          <div className="flex items-center justify-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <p className="text-lg font-bold text-slate-800">{mess.rating}</p>
                          </div>
                        </div>
                        <div className="text-center p-3 bg-slate-50 rounded-lg">
                          <p className="text-sm text-slate-600">Status</p>
                          <Badge variant={mess.is_active ? "default" : "secondary"} className="mt-1">
                            {mess.is_active ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                      </div>

                      {mess.amenities && mess.amenities.length > 0 && (
                        <div className="mb-4">
                          <p className="text-sm font-medium text-slate-700 mb-2">Amenities:</p>
                          <div className="flex flex-wrap gap-2">
                            {mess.amenities.slice(0, 4).map((amenity, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {amenity}
                              </Badge>
                            ))}
                            {mess.amenities.length > 4 && (
                              <Badge variant="outline" className="text-xs">
                                +{mess.amenities.length - 4} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 ml-4">
                      <Link href={`/admin/mess-groups/${mess.id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Link href={`/admin/mess-groups/${mess.id}/edit`}>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
