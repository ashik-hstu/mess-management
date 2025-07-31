"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Search,
  Home,
  ExternalLink,
  Filter,
  MapPin,
  Users,
  Bed,
  DollarSign,
  X,
  Building2,
  Loader2,
  AlertCircle,
} from "lucide-react"

// Mock data for different locations - Updated with correct location mappings
const messData = {
  "mohabalipur-boys": {
    title: "Mohabalipur Boys Accommodation",
    description:
      "Premium mess services in the heart of Mohabalipur area, offering comfortable living spaces for male students.",
    color: "blue",
    location: "mohabolipur", // This should match what's stored in database
    category: "boys",
    image: "/images/boys-mess-building.png",
  },
  "mohabalipur-girls": {
    title: "Mohabalipur Girls Accommodation",
    description:
      "Safe and comfortable mess facilities in Mohabalipur, specially designed for female students with enhanced security.",
    color: "pink",
    location: "mohabolipur", // This should match what's stored in database
    category: "girls",
    image: "/images/girls-mess-building.png",
  },
  "bcs-gali-boys": {
    title: "BCS Gali Boys Accommodation",
    description:
      "Convenient mess services in BCS Gali area, providing easy access to campus and local amenities for male students.",
    color: "blue",
    location: "bcs-gali",
    category: "boys",
    image: "/images/boys-mess-building.png",
  },
  "bcs-gali-girls": {
    title: "BCS Gali Girls Accommodation",
    description:
      "Secure and well-maintained mess facilities in BCS Gali, offering a comfortable environment for female students.",
    color: "pink",
    location: "bcs-gali",
    category: "girls",
    image: "/images/girls-mess-building.png",
  },
  "kornai-boys": {
    title: "Kornai Boys Accommodation",
    description:
      "Quality mess services in the peaceful Kornai area, perfect for male students seeking a quiet study environment.",
    color: "blue",
    location: "kornai",
    category: "boys",
    image: "/images/boys-mess-building.png",
  },
  "kornai-girls": {
    title: "Kornai Girls Accommodation",
    description: "Comfortable and secure mess facilities in Kornai, providing a safe haven for female students.",
    color: "pink",
    location: "kornai",
    category: "girls",
    image: "/images/girls-mess-building.png",
  },
}

interface LocationPageProps {
  params: {
    slug: string
  }
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
  owner_name?: string
  owner_mobile?: string
  owner_email?: string
}

export default function LocationPage({ params }: LocationPageProps) {
  const { slug } = params
  const [singlePriceFilter, setSinglePriceFilter] = useState("")
  const [doublePriceFilter, setDoublePriceFilter] = useState("")
  const [messGroups, setMessGroups] = useState<MessGroup[]>([])
  const [filteredMesses, setFilteredMesses] = useState<MessGroup[]>([])
  const [hasFilters, setHasFilters] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const locationData = messData[slug as keyof typeof messData] || {
    title: "Mess Accommodation",
    description: "Find the best mess services in this location.",
    color: "blue",
    location: "",
    category: "",
    image: "/images/boys-mess-building.png",
  }

  useEffect(() => {
    fetchMessGroups()
  }, [slug, locationData.location, locationData.category])

  const fetchMessGroups = async () => {
    try {
      setLoading(true)
      setError("")

      console.log("Fetching mess groups for:", {
        location: locationData.location,
        category: locationData.category,
        slug,
      })

      if (!locationData.location || !locationData.category) {
        console.log("Missing location or category data")
        setError("Invalid location or category")
        setLoading(false)
        return
      }

      const url = `/api/mess-groups?location=${encodeURIComponent(locationData.location)}&category=${encodeURIComponent(locationData.category)}`
      console.log("Fetching from URL:", url)

      const response = await fetch(url)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.details || errorData.error || `HTTP ${response.status}`)
      }

      const data = await response.json()
      console.log("Received data:", data)

      setMessGroups(data.messGroups || [])
      setFilteredMesses(data.messGroups || [])
    } catch (error: any) {
      console.error("Error fetching mess groups:", error)
      setError(error.message || "Failed to load mess groups")
    } finally {
      setLoading(false)
    }
  }

  const searchSingleSeat = () => {
    if (!singlePriceFilter) {
      setFilteredMesses(messGroups)
      setHasFilters(false)
      return
    }
    const filtered = messGroups.filter((mess) => mess.single_price <= Number.parseInt(singlePriceFilter))
    setFilteredMesses(filtered)
    setHasFilters(true)
  }

  const searchDoubleSeat = () => {
    if (!doublePriceFilter) {
      setFilteredMesses(messGroups)
      setHasFilters(false)
      return
    }
    const filtered = messGroups.filter((mess) => mess.double_price <= Number.parseInt(doublePriceFilter))
    setFilteredMesses(filtered)
    setHasFilters(true)
  }

  const resetFilters = () => {
    setSinglePriceFilter("")
    setDoublePriceFilter("")
    setFilteredMesses(messGroups)
    setHasFilters(false)
  }

  const colorClasses = {
    blue: {
      gradient: "from-blue-600 to-cyan-600",
      bg: "from-blue-50 to-cyan-50",
      button: "from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700",
    },
    pink: {
      gradient: "from-pink-600 to-rose-600",
      bg: "from-pink-50 to-rose-50",
      button: "from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700",
    },
  }

  const colors = colorClasses[locationData.color as keyof typeof colorClasses]

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-orange-600 mx-auto mb-4" />
          <p className="text-slate-600">Loading mess groups...</p>
        </div>
      </div>
    )
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
              <Link href="/">
                <Button variant="outline" size="sm">
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Button>
              </Link>
              <Link href="/owner/login">
                <Button variant="outline" size="sm">
                  Owner Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Header with Image */}
      <div className="relative overflow-hidden h-96">
        <Image
          src={locationData.image || "/placeholder.svg?height=400&width=800"}
          alt={locationData.title}
          fill
          className="object-cover"
        />
        <div className={`absolute inset-0 bg-gradient-to-r ${colors.gradient} bg-opacity-80`}></div>
        <div className="relative container mx-auto px-4 py-16 h-full flex flex-col justify-center">
          <div className="flex items-center justify-between mb-6">
            <Link href="/">
              <Button
                variant="secondary"
                size="sm"
                className="bg-white/20 text-white border-white/30 hover:bg-white/30"
              >
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              <MapPin className="w-4 h-4 mr-1" />
              {filteredMesses.length} Available Options
            </Badge>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{locationData.title}</h1>
          <p className="text-xl text-white/90 max-w-3xl leading-relaxed">{locationData.description}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <div>
              <p className="text-red-700 font-medium">Error loading mess groups</p>
              <p className="text-red-600 text-sm">{error}</p>
              <Button
                onClick={fetchMessGroups}
                variant="outline"
                size="sm"
                className="mt-2 border-red-300 text-red-700 hover:bg-red-50 bg-transparent"
              >
                Try Again
              </Button>
            </div>
          </div>
        )}

        {/* Debug Info (remove in production) */}
        {process.env.NODE_ENV === "development" && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-medium text-blue-800 mb-2">Debug Info:</h3>
            <p className="text-sm text-blue-700">Slug: {slug}</p>
            <p className="text-sm text-blue-700">Location: {locationData.location}</p>
            <p className="text-sm text-blue-700">Category: {locationData.category}</p>
            <p className="text-sm text-blue-700">Mess Groups Found: {messGroups.length}</p>
          </div>
        )}

        {/* Search Section */}
        <Card className="mb-8 border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Filter className="w-6 h-6 mr-3" />
              Filter by Price Range
            </CardTitle>
            <CardDescription>Find mess services that fit your budget by setting maximum price limits</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <Label htmlFor="singlePrice" className="text-base font-medium">
                  Single Seat Maximum Price
                </Label>
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      id="singlePrice"
                      type="number"
                      placeholder="e.g., 1500"
                      value={singlePriceFilter}
                      onChange={(e) => setSinglePriceFilter(e.target.value)}
                      className="pl-10 h-12"
                    />
                  </div>
                  <Button
                    onClick={searchSingleSeat}
                    className={`bg-gradient-to-r ${colors.button} text-white px-6 h-12 shadow-lg hover:shadow-xl transition-all duration-300`}
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <Label htmlFor="doublePrice" className="text-base font-medium">
                  Double Seat Maximum Price
                </Label>
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      id="doublePrice"
                      type="number"
                      placeholder="e.g., 1200"
                      value={doublePriceFilter}
                      onChange={(e) => setDoublePriceFilter(e.target.value)}
                      className="pl-10 h-12"
                    />
                  </div>
                  <Button
                    onClick={searchDoubleSeat}
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 h-12 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </Button>
                </div>
              </div>
            </div>

            {hasFilters && (
              <div className="mt-6 flex items-center gap-4">
                <Badge variant="secondary" className="bg-slate-100 text-slate-700">
                  Filters Applied
                </Badge>
                <Button variant="outline" onClick={resetFilters} size="sm">
                  <X className="w-4 h-4 mr-2" />
                  Clear All Filters
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            {hasFilters
              ? `Filtered Results (${filteredMesses.length})`
              : `All Available Options (${filteredMesses.length})`}
          </h2>
          <p className="text-slate-600">
            {hasFilters
              ? "Showing mess services matching your price criteria"
              : "Browse all available mess services in this area"}
          </p>
        </div>

        {/* Mess Table */}
        <Card className="border-0 shadow-xl overflow-hidden">
          <CardContent className="p-0">
            {filteredMesses.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gradient-to-r from-slate-50 to-slate-100">
                      <TableHead className="text-center font-semibold text-slate-700 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <Building2 className="w-4 h-4" />
                          Mess Name
                        </div>
                      </TableHead>
                      <TableHead colSpan={2} className="text-center font-semibold text-slate-700 border-l">
                        <div className="flex items-center justify-center gap-2">
                          <Bed className="w-4 h-4" />
                          Single Seat
                        </div>
                      </TableHead>
                      <TableHead colSpan={2} className="text-center font-semibold text-slate-700 border-l">
                        <div className="flex items-center justify-center gap-2">
                          <Users className="w-4 h-4" />
                          Double Seat
                        </div>
                      </TableHead>
                      <TableHead className="text-center font-semibold text-slate-700 border-l py-4">Details</TableHead>
                    </TableRow>
                    <TableRow className="bg-slate-50">
                      <TableHead className="text-center text-sm text-slate-600 py-2">Rating</TableHead>
                      <TableHead className="text-center text-sm text-slate-600 border-l">Available</TableHead>
                      <TableHead className="text-center text-sm text-slate-600">Price</TableHead>
                      <TableHead className="text-center text-sm text-slate-600 border-l">Available</TableHead>
                      <TableHead className="text-center text-sm text-slate-600">Price</TableHead>
                      <TableHead className="text-center text-sm text-slate-600 border-l">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMesses.map((mess, index) => (
                      <TableRow key={mess.id || index} className="hover:bg-slate-50/50 transition-colors">
                        <TableCell className="font-medium py-6">
                          <div className="text-center">
                            <div className="font-semibold text-slate-800 mb-1">{mess.name}</div>
                            <div className="flex items-center justify-center gap-1">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <div
                                    key={i}
                                    className={`w-3 h-3 ${
                                      i < Math.floor(mess.rating || 0) ? "text-yellow-400" : "text-slate-300"
                                    }`}
                                  >
                                    ⭐
                                  </div>
                                ))}
                              </div>
                              <span className="text-sm text-slate-600 ml-1">{mess.rating || 0}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center border-l">
                          <Badge variant="secondary" className="bg-green-100 text-green-700">
                            {mess.single_seats || 0} seats
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="font-semibold text-lg text-slate-800">৳{mess.single_price || 0}</div>
                          <div className="text-sm text-slate-500">per month</div>
                        </TableCell>
                        <TableCell className="text-center border-l">
                          <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                            {mess.double_seats || 0} seats
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="font-semibold text-lg text-slate-800">৳{mess.double_price || 0}</div>
                          <div className="text-sm text-slate-500">per month</div>
                        </TableCell>
                        <TableCell className="text-center border-l">
                          <Link href={`/mess/${mess.id}`}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="hover:bg-slate-50 transition-colors bg-transparent"
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              View Details
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-10 h-10 text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">
                  {error ? "Unable to Load Results" : "No Results Found"}
                </h3>
                <p className="text-slate-600 mb-6">
                  {error
                    ? "There was an error loading the mess groups. Please try again."
                    : hasFilters
                      ? "No mess services match your current price criteria. Try adjusting your filters."
                      : "No mess services are currently available in this area."}
                </p>
                {hasFilters && !error && (
                  <Button onClick={resetFilters} variant="outline">
                    <X className="w-4 h-4 mr-2" />
                    Clear Filters
                  </Button>
                )}
                {error && (
                  <Button onClick={fetchMessGroups} variant="outline">
                    Try Again
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-12 mt-16">
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
