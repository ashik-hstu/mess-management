"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Building2, Users, Phone, Mail, Home, Plus, X, Loader2 } from "lucide-react"

const AMENITIES_OPTIONS = [
  "WiFi",
  "24/7 Security",
  "Laundry",
  "Study Room",
  "Common Room",
  "Parking",
  "Generator",
  "CCTV",
  "Common Kitchen",
  "Garden",
  "Female Caretaker",
  "Female Security",
]

export default function CreateMessGroup() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

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
  const [customAmenity, setCustomAmenity] = useState("")

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addAmenity = (amenity: string) => {
    if (amenity && !selectedAmenities.includes(amenity)) {
      setSelectedAmenities((prev) => [...prev, amenity])
    }
  }

  const removeAmenity = (amenity: string) => {
    setSelectedAmenities((prev) => prev.filter((a) => a !== amenity))
  }

  const addCustomAmenity = () => {
    if (customAmenity.trim()) {
      addAmenity(customAmenity.trim())
      setCustomAmenity("")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      const token = localStorage.getItem("token")
      if (!token) {
        router.push("/owner/login")
        return
      }

      const response = await fetch("/api/mess-groups", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          single_seats: Number.parseInt(formData.single_seats) || 0,
          single_price: Number.parseInt(formData.single_price) || 0,
          double_seats: Number.parseInt(formData.double_seats) || 0,
          double_price: Number.parseInt(formData.double_price) || 0,
          amenities: selectedAmenities,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to create mess group")
      }

      setSuccess("Mess group created successfully! Redirecting...")

      setTimeout(() => {
        router.push("/admin/dashboard")
      }, 2000)
    } catch (error: any) {
      setError(error.message || "Failed to create mess group")
    } finally {
      setLoading(false)
    }
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
            <p className="text-lg text-slate-600">Add a new mess accommodation to your listings</p>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="border-green-200 bg-green-50 text-green-800 mb-6">
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Building2 className="w-6 h-6 mr-3" />
                Mess Information
              </CardTitle>
              <CardDescription>Provide detailed information about your mess facility</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="name" className="text-base font-medium">
                      Mess Name *
                    </Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="e.g., Royal Palace Mess"
                      className="h-12"
                      disabled={loading}
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="location" className="text-base font-medium">
                      Location *
                    </Label>
                    <Select onValueChange={(value) => handleInputChange("location", value)} disabled={loading}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mohabolipur">Mohabolipur</SelectItem>
                        <SelectItem value="bcs-gali">BCS Gali</SelectItem>
                        <SelectItem value="kornai">Kornai</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="category" className="text-base font-medium">
                      Category *
                    </Label>
                    <Select onValueChange={(value) => handleInputChange("category", value)} disabled={loading}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="boys">Boys</SelectItem>
                        <SelectItem value="girls">Girls</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="address" className="text-base font-medium">
                      Address
                    </Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      placeholder="Full address"
                      className="h-12"
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-3">
                  <Label htmlFor="description" className="text-base font-medium">
                    Description *
                  </Label>
                  <Textarea
                    id="description"
                    required
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Describe your mess facility, amenities, and what makes it special..."
                    className="min-h-[120px]"
                    disabled={loading}
                  />
                </div>

                {/* Seat Information */}
                <div className="grid md:grid-cols-2 gap-8">
                  <Card className="bg-blue-50 border-blue-200">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg flex items-center">
                        <Users className="w-5 h-5 mr-2" />
                        Single Seats
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="single_seats">Number of Seats</Label>
                        <Input
                          id="single_seats"
                          type="number"
                          min="0"
                          value={formData.single_seats}
                          onChange={(e) => handleInputChange("single_seats", e.target.value)}
                          placeholder="0"
                          disabled={loading}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="single_price">Price per Month (৳)</Label>
                        <Input
                          id="single_price"
                          type="number"
                          min="0"
                          value={formData.single_price}
                          onChange={(e) => handleInputChange("single_price", e.target.value)}
                          placeholder="0"
                          disabled={loading}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-green-50 border-green-200">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg flex items-center">
                        <Users className="w-5 h-5 mr-2" />
                        Double Seats
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="double_seats">Number of Seats</Label>
                        <Input
                          id="double_seats"
                          type="number"
                          min="0"
                          value={formData.double_seats}
                          onChange={(e) => handleInputChange("double_seats", e.target.value)}
                          placeholder="0"
                          disabled={loading}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="double_price">Price per Person (৳)</Label>
                        <Input
                          id="double_price"
                          type="number"
                          min="0"
                          value={formData.double_price}
                          onChange={(e) => handleInputChange("double_price", e.target.value)}
                          placeholder="0"
                          disabled={loading}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Contact Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="contact_phone" className="text-base font-medium">
                      Contact Phone
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        id="contact_phone"
                        type="tel"
                        value={formData.contact_phone}
                        onChange={(e) => handleInputChange("contact_phone", e.target.value)}
                        placeholder="01XXXXXXXXX"
                        className="pl-10 h-12"
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="contact_email" className="text-base font-medium">
                      Contact Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        id="contact_email"
                        type="email"
                        value={formData.contact_email}
                        onChange={(e) => handleInputChange("contact_email", e.target.value)}
                        placeholder="contact@mess.com"
                        className="pl-10 h-12"
                        disabled={loading}
                      />
                    </div>
                  </div>
                </div>

                {/* Amenities */}
                <div className="space-y-4">
                  <Label className="text-base font-medium">Amenities</Label>

                  {/* Selected Amenities */}
                  {selectedAmenities.length > 0 && (
                    <div className="flex flex-wrap gap-2 p-4 bg-slate-50 rounded-lg">
                      {selectedAmenities.map((amenity) => (
                        <Badge key={amenity} variant="secondary" className="flex items-center gap-1">
                          {amenity}
                          <button
                            type="button"
                            onClick={() => removeAmenity(amenity)}
                            className="ml-1 hover:bg-slate-300 rounded-full p-0.5"
                            disabled={loading}
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Available Amenities */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                    {AMENITIES_OPTIONS.filter((amenity) => !selectedAmenities.includes(amenity)).map((amenity) => (
                      <Button
                        key={amenity}
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => addAmenity(amenity)}
                        className="justify-start h-auto py-2 px-3 text-sm"
                        disabled={loading}
                      >
                        <Plus className="w-3 h-3 mr-2" />
                        {amenity}
                      </Button>
                    ))}
                  </div>

                  {/* Custom Amenity */}
                  <div className="flex gap-2">
                    <Input
                      value={customAmenity}
                      onChange={(e) => setCustomAmenity(e.target.value)}
                      placeholder="Add custom amenity..."
                      className="flex-1"
                      disabled={loading}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          addCustomAmenity()
                        }
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addCustomAmenity}
                      disabled={loading || !customAmenity.trim()}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end gap-4 pt-6 border-t">
                  <Link href="/admin/dashboard">
                    <Button type="button" variant="outline" disabled={loading}>
                      Cancel
                    </Button>
                  </Link>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white px-8"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      "Create Mess Group"
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
