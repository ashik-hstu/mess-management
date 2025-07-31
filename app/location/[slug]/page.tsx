"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Search, Home, ExternalLink, Filter, MapPin, Users, Bed, DollarSign, X, Building2, Loader2 } from "lucide-react"

// Mock data for different locations
const messData = {
  "mohabalipur-boys": {
    title: "Mohabalipur Boys Accommodation",
    description:
      "Premium mess services in the heart of Mohabalipur area, offering comfortable living spaces for male students.",
    color: "blue",
    location: "mohabolipur",
    category: "boys",
  },
  "mohabalipur-girls": {
    title: "Mohabalipur Girls Accommodation",
    description:
      "Safe and comfortable mess facilities in Mohabalipur, specially designed for female students with enhanced security.",
    color: "pink",
    location: "mohabolipur",
    category: "girls",
  },
  "bcs-gali-boys": {
    title: "BCS Gali Boys Accommodation",
    description:
      "Convenient mess services in BCS Gali area, providing easy access to campus and local amenities for male students.",
    color: "blue",
    location: "bcs-gali",
    category: "boys",
  },
  "bcs-gali-girls": {
    title: "BCS Gali Girls Accommodation",
    description:
      "Secure and well-maintained mess facilities in BCS Gali, offering a comfortable environment for female students.",
    color: "pink",
    location: "bcs-gali",
    category: "girls",
  },
  "kornai-boys": {
    title: "Kornai Boys Accommodation",
    description:
      "Quality mess services in the peaceful Kornai area, perfect for male students seeking a quiet study environment.",
    color: "blue",
    location: "kornai",
    category: "boys",
  },
  "kornai-girls": {
    title: "Kornai Girls Accommodation",
    description: "Comfortable and secure mess facilities in Kornai, providing a safe haven for female students.",
    color: "pink",
    location: "kornai",
    category: "girls",
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
  }

  useEffect(() => {
    fetchMessGroups()
  }, [slug])

  const fetchMessGroups = async () => {
    try {
      setLoading(true)
      const response = await fetch(
        `/api/mess-groups?location=${locationData.location}&category=${locationData.category}`,
      )

      if (!response.ok) {
        throw new Error("Failed to fetch mess groups")
      }

      const data = await response.json()
      setMessGroups(data.messGroups || [])
      setFilteredMesses(data.messGroups || [])
    } catch (error: any) {
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

      {/* Hero Header */}
      <div className={`relative overflow-hidden bg-gradient-to-r ${colors.gradient}`}>
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative container mx-auto px-4 py-16">
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
        {error && <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">{error}</div>}

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
                      <TableRow key={index} className="hover:bg-slate-50/50 transition-colors">
                        <TableCell className="font-medium py-6">
                          <div className="text-center">
                            <div className="font-semibold text-slate-800 mb-1">{mess.name}</div>
                            <div className="flex items-center justify-center gap-1">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <div
                                    key={i}
                                    className={`w-3 h-3 ${
                                      i < Math.floor(mess.rating) ? "text-yellow-400" : "text-slate-300"
                                    }`}
                                  >
                                    ⭐
                                  </div>
                                ))}
                              </div>
                              <span className="text-sm text-slate-600 ml-1">{mess.rating}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center border-l">
                          <Badge variant="secondary" className="bg-green-100 text-green-700">
                            {mess.single_seats} seats
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="font-semibold text-lg text-slate-800">৳{mess.single_price}</div>
                          <div className="text-sm text-slate-500">per month</div>
                        </TableCell>
                        <TableCell className="text-center border-l">
                          <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                            {mess.double_seats} seats
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="font-semibold text-lg text-slate-800">৳{mess.double_price}</div>
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
                <h3 className="text-xl font-semibold text-slate-800 mb-2">No Results Found</h3>
                <p className="text-slate-600 mb-6">
                  No mess services match your current price criteria. Try adjusting your filters.
                </p>
                <Button onClick={resetFilters} variant="outline">
                  <X className="w-4 h-4 mr-2" />
                  Clear Filters
                </Button>
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
