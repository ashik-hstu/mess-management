"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Building2, MapPin, Users, Bed, DollarSign, Phone, Mail, Home, ArrowLeft, Loader2, Plus, X } from "lucide-react"

interface User {
  id: number
  name: string
  email: string
  mobile?: string
  role: string
}

const availableAmenities = [
  "WiFi",
  "AC",
  "Generator",
  "Parking",
  "24/7 Security",
  "CCTV",
  "Laundry",
  "Common Room",
  "Study Room",
  "Library",
  "Garden",
  "Gym",
  "Common Kitchen",
  "Balcony",
  "Female Caretaker",
  "Female Security",
]

const locations = [
  { value: "mohabolipur", label: "Mohabolipur" },
  { value: "bcs-gali", label: "BCS Gali" },
  { value: "kornai", label: "Kornai" },
]

export default function CreateMessGroup() {
  const [user, setUser] = useState<User | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    category: "",
    description: "",
    single_seats: "",
    single_price: "",
    double_seats: "",
    double_price: "",
    contact_phone: "",
    contact_email: "",
    address: "",
  })
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
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
      // Pre-fill contact info
      setFormData((prev) => ({
        ...prev,
        contact_email: parsedUser.email,
        contact_phone: parsedUser.mobile || "",
      }))
    } catch (error) {
      router.push("/owner/login")
    }
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/owner/login")
      return
    }

    try {
      const response = await fetch("/api/mess-groups", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          single_seats: Number.parseInt(formData.single_seats) || 0,
          single_price: Number.parseFloat(formData.single_price) || 0,
          double_seats: Number.parseInt(formData.double_seats) || 0,
          double_price: Number.parseFloat(formData.double_price) || 0,
          amenities: selectedAmenities,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to create mess group")
      }

      setSuccess("Mess group created successfully!")
      setTimeout(() => {
        router.push("/admin/dashboard")
      }, 2000)
    } catch (error: any) {
      setError(error.message || "An error occurred while creating the mess group")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleAmenityToggle = (amenity: string) => {
    setSelectedAmenities((prev) => (prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]))
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-orange-600 mx-auto mb-4" />
          <p className="text-slate-600">Loading...</p>
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
              <Link href="/admin/dashboard">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
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

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-800 mb-2">Create New Mess Group</h1>
            <p className="text-lg text-slate-600">Add your mess facility to connect with students</p>
          </div>

          {/* Form */}
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Building2 className="w-6 h-6 mr-3" />
                Mess Information
              </CardTitle>
              <CardDescription>Fill in the details about your mess facility</CardDescription>
            </CardHeader>

            <CardContent>
              {error && (
                <Alert className="mb-6 border-red-200 bg-red-50">
                  <AlertDescription className="text-red-700">{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="mb-6 border-green-200 bg-green-50">
                  <AlertDescription className="text-green-700">{success}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-base font-medium">
                      Mess Name *
                    </Label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="pl-12 h-12"
                        placeholder="Enter mess name"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-base font-medium">
                      Location *
                    </Label>
                    <Select
                      value={formData.location}
                      onValueChange={(value) => setFormData({ ...formData, location: value })}
                    >
                      <SelectTrigger className="h-12">
                        <div className="flex items-center">
                          <MapPin className="w-5 h-5 text-slate-400 mr-3" />
                          <SelectValue placeholder="Select location" />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        {locations.map((location) => (
                          <SelectItem key={location.value} value={location.value}>
                            {location.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-base font-medium">
                      Category *
                    </Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger className="h-12">
                        <div className="flex items-center">
                          <Users className="w-5 h-5 text-slate-400 mr-3" />
                          <SelectValue placeholder="Select category" />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="boys">Boys</SelectItem>
                        <SelectItem value="girls">Girls</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-base font-medium">
                      Address
                    </Label>
                    <Input
                      id="address"
                      name="address"
                      type="text"
                      value={formData.address}
                      onChange={handleChange}
                      className="h-12"
                      placeholder="Enter full address"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-base font-medium">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="min-h-24"
                    placeholder="Describe your mess facility, amenities, and what makes it special..."
                  />
                </div>

                {/* Pricing and Capacity */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-slate-800 flex items-center">
                    <Bed className="w-5 h-5 mr-2" />
                    Pricing & Capacity
                  </h3>

                  <div className="grid md:grid-cols-2 gap-8">
                    <Card className="border border-blue-200 bg-blue-50/50">
                      <CardHeader className="pb-4">
                        <CardTitle className="text-lg text-blue-800">Single Occupancy</CardTitle>
                        <CardDescription>Private rooms for individual students</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="single_seats" className="text-sm font-medium">
                            Number of Seats
                          </Label>
                          <Input
                            id="single_seats"
                            name="single_seats"
                            type="number"
                            min="0"
                            value={formData.single_seats}
                            onChange={handleChange}
                            className="h-10"
                            placeholder="0"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="single_price" className="text-sm font-medium">
                            Price per Month (৳)
                          </Label>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <Input
                              id="single_price"
                              name="single_price"
                              type="number"
                              min="0"
                              step="0.01"
                              value={formData.single_price}
                              onChange={handleChange}
                              className="pl-10 h-10"
                              placeholder="0.00"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border border-green-200 bg-green-50/50">
                      <CardHeader className="pb-4">
                        <CardTitle className="text-lg text-green-800">Double Occupancy</CardTitle>
                        <CardDescription>Shared rooms for two students</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="double_seats" className="text-sm font-medium">
                            Number of Seats
                          </Label>
                          <Input
                            id="double_seats"
                            name="double_seats"
                            type="number"
                            min="0"
                            value={formData.double_seats}
                            onChange={handleChange}
                            className="h-10"
                            placeholder="0"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="double_price" className="text-sm font-medium">
                            Price per Person/Month (৳)
                          </Label>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <Input
                              id="double_price"
                              name="double_price"
                              type="number"
                              min="0"
                              step="0.01"
                              value={formData.double_price}
                              onChange={handleChange}
                              className="pl-10 h-10"
                              placeholder="0.00"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Amenities */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-slate-800">Amenities & Facilities</h3>
                  <p className="text-slate-600">Select all amenities available at your mess</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {availableAmenities.map((amenity) => (
                      <div key={amenity} className="flex items-center space-x-2">
                        <Checkbox
                          id={amenity}
                          checked={selectedAmenities.includes(amenity)}
                          onCheckedChange={() => handleAmenityToggle(amenity)}
                        />
                        <Label htmlFor={amenity} className="text-sm font-medium cursor-pointer">
                          {amenity}
                        </Label>
                      </div>
                    ))}
                  </div>
                  {selectedAmenities.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {selectedAmenities.map((amenity) => (
                        <div
                          key={amenity}
                          className="flex items-center gap-2 bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm"
                        >
                          <span>{amenity}</span>
                          <button
                            type="button"
                            onClick={() => handleAmenityToggle(amenity)}
                            className="hover:bg-orange-200 rounded-full p-1"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Contact Information */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-slate-800">Contact Information</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="contact_phone" className="text-base font-medium">
                        Contact Phone
                      </Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <Input
                          id="contact_phone"
                          name="contact_phone"
                          type="tel"
                          value={formData.contact_phone}
                          onChange={handleChange}
                          className="pl-12 h-12"
                          placeholder="Enter contact number"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contact_email" className="text-base font-medium">
                        Contact Email
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <Input
                          id="contact_email"
                          name="contact_email"
                          type="email"
                          value={formData.contact_email}
                          onChange={handleChange}
                          className="pl-12 h-12"
                          placeholder="Enter contact email"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end gap-4 pt-6 border-t">
                  <Link href="/admin/dashboard">
                    <Button type="button" variant="outline" size="lg">
                      Cancel
                    </Button>
                  </Link>
                  <Button
                    type="submit"
                    disabled={loading}
                    size="lg"
                    className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <Plus className="w-5 h-5 mr-2" />
                        Create Mess Group
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
