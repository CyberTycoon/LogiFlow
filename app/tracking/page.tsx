"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Truck, Package, Search, Plus, Clock, CheckCircle, AlertTriangle, Navigation, Phone, Mail, Menu } from 'lucide-react'

interface Shipment {
  id: string
  trackingNumber: string
  origin: string
  destination: string
  status: "pending" | "picked-up" | "in-transit" | "out-for-delivery" | "delivered" | "delayed"
  estimatedDelivery: string
  actualDelivery?: string
  driver: string
  driverPhone: string
  vehicle: string
  weight: number
  dimensions: string
  specialInstructions?: string
  timeline: Array<{
    status: string
    location: string
    timestamp: string
    description: string
  }>
}

export default function TrackingPage() {
  const [shipments, setShipments] = useState<Shipment[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [newShipment, setNewShipment] = useState({
    origin: "",
    destination: "",
    weight: "",
    dimensions: "",
    specialInstructions: "",
  })

  const navigationItems = [
    { href: "/dashboard", label: "Dashboard", active: false },
    { href: "/tracking", label: "Tracking", active: true },
    { href: "/fleet", label: "Fleet", active: false },
    { href: "/routes", label: "Routes", active: false },
  ]

  useEffect(() => {
    // Load shipments from localStorage
    const savedShipments = localStorage.getItem("shipments")
    if (savedShipments) {
      setShipments(JSON.parse(savedShipments))
    } else {
      // Initialize with sample data
      const sampleShipments: Shipment[] = [
        {
          id: "SH001",
          trackingNumber: "LF2024001",
          origin: "New York, NY",
          destination: "Los Angeles, CA",
          status: "in-transit",
          estimatedDelivery: "2024-01-18",
          driver: "John Smith",
          driverPhone: "+1-555-0123",
          vehicle: "VH001",
          weight: 1500,
          dimensions: "120x80x60 cm",
          specialInstructions: "Fragile - Handle with care",
          timeline: [
            {
              status: "picked-up",
              location: "New York, NY",
              timestamp: "2024-01-15T08:00:00Z",
              description: "Package picked up from origin",
            },
            {
              status: "in-transit",
              location: "Philadelphia, PA",
              timestamp: "2024-01-15T14:30:00Z",
              description: "Package in transit - Philadelphia hub",
            },
            {
              status: "in-transit",
              location: "Chicago, IL",
              timestamp: "2024-01-16T09:15:00Z",
              description: "Package in transit - Chicago hub",
            },
          ],
        },
        {
          id: "SH002",
          trackingNumber: "LF2024002",
          origin: "Miami, FL",
          destination: "Seattle, WA",
          status: "delivered",
          estimatedDelivery: "2024-01-16",
          actualDelivery: "2024-01-16",
          driver: "Sarah Johnson",
          driverPhone: "+1-555-0124",
          vehicle: "VH002",
          weight: 800,
          dimensions: "80x60x40 cm",
          timeline: [
            {
              status: "picked-up",
              location: "Miami, FL",
              timestamp: "2024-01-14T10:00:00Z",
              description: "Package picked up from origin",
            },
            {
              status: "delivered",
              location: "Seattle, WA",
              timestamp: "2024-01-16T15:30:00Z",
              description: "Package delivered successfully",
            },
          ],
        },
      ]
      setShipments(sampleShipments)
      localStorage.setItem("shipments", JSON.stringify(sampleShipments))
    }
  }, [])

  const filteredShipments = shipments.filter(
    (shipment) =>
      shipment.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.origin.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-500"
      case "out-for-delivery":
        return "bg-blue-500"
      case "in-transit":
        return "bg-yellow-500"
      case "picked-up":
        return "bg-orange-500"
      case "pending":
        return "bg-gray-500"
      case "delayed":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="h-4 w-4" />
      case "out-for-delivery":
        return <Truck className="h-4 w-4" />
      case "in-transit":
        return <Navigation className="h-4 w-4" />
      case "picked-up":
        return <Package className="h-4 w-4" />
      case "pending":
        return <Clock className="h-4 w-4" />
      case "delayed":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  const createShipment = () => {
    const shipment: Shipment = {
      id: `SH${String(shipments.length + 1).padStart(3, "0")}`,
      trackingNumber: `LF2024${String(shipments.length + 1).padStart(3, "0")}`,
      origin: newShipment.origin,
      destination: newShipment.destination,
      status: "pending",
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      driver: "Assigned automatically",
      driverPhone: "+1-555-0000",
      vehicle: "TBD",
      weight: Number.parseFloat(newShipment.weight) || 0,
      dimensions: newShipment.dimensions,
      specialInstructions: newShipment.specialInstructions,
      timeline: [
        {
          status: "pending",
          location: newShipment.origin,
          timestamp: new Date().toISOString(),
          description: "Shipment created and pending pickup",
        },
      ],
    }

    const updatedShipments = [...shipments, shipment]
    setShipments(updatedShipments)
    localStorage.setItem("shipments", JSON.stringify(updatedShipments))
    setIsCreateDialogOpen(false)
    setNewShipment({
      origin: "",
      destination: "",
      weight: "",
      dimensions: "",
      specialInstructions: "",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Navigation */}
      <nav className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <Truck className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold text-white">LogiFlow</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={item.active ? "text-blue-400 font-medium" : "text-white/80 hover:text-white transition-colors"}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden text-white">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-slate-900 border-slate-700 w-[300px] sm:w-[400px]">
                <div className="flex flex-col h-full">
                  {/* Mobile Menu Header */}
                  <div className="flex items-center justify-between pb-6 border-b border-slate-700">
                    <div className="flex items-center space-x-2">
                      <Truck className="h-6 w-6 text-blue-400" />
                      <span className="text-xl font-bold text-white">LogiFlow</span>
                    </div>
                  </div>

                  {/* Mobile Navigation Links */}
                  <div className="flex flex-col space-y-4 py-6">
                    {navigationItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`text-lg py-2 transition-colors ${item.active ? "text-blue-400 font-medium" : "text-white/80 hover:text-white"
                          }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-6 lg:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 lg:mb-8 space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">Shipment Tracking</h1>
            <p className="text-white/70 text-sm lg:text-base">Track and manage all your shipments with automated status updates</p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
                <Plus className="mr-2 h-4 w-4" />
                New Shipment
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-800 border-slate-700 mx-4 max-w-md">
              <DialogHeader>
                <DialogTitle className="text-white">Create New Shipment</DialogTitle>
                <DialogDescription className="text-white/70">Enter the details for your new shipment</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="origin" className="text-white">
                    Origin
                  </Label>
                  <Input
                    id="origin"
                    value={newShipment.origin}
                    onChange={(e) => setNewShipment({ ...newShipment, origin: e.target.value })}
                    placeholder="Enter pickup location"
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="destination" className="text-white">
                    Destination
                  </Label>
                  <Input
                    id="destination"
                    value={newShipment.destination}
                    onChange={(e) => setNewShipment({ ...newShipment, destination: e.target.value })}
                    placeholder="Enter delivery location"
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="weight" className="text-white">
                      Weight (kg)
                    </Label>
                    <Input
                      id="weight"
                      type="number"
                      value={newShipment.weight}
                      onChange={(e) => setNewShipment({ ...newShipment, weight: e.target.value })}
                      placeholder="0"
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dimensions" className="text-white">
                      Dimensions
                    </Label>
                    <Input
                      id="dimensions"
                      value={newShipment.dimensions}
                      onChange={(e) => setNewShipment({ ...newShipment, dimensions: e.target.value })}
                      placeholder="L x W x H cm"
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instructions" className="text-white">
                    Special Instructions
                  </Label>
                  <Input
                    id="instructions"
                    value={newShipment.specialInstructions}
                    onChange={(e) => setNewShipment({ ...newShipment, specialInstructions: e.target.value })}
                    placeholder="Any special handling requirements"
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
                <Button onClick={createShipment} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Create Shipment
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
            <Input
              placeholder="Search by tracking number, origin, or destination..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
        </div>

        {/* Shipments List */}
        <div className="grid gap-4 lg:gap-6">
          {filteredShipments.map((shipment) => (
            <Card
              key={shipment.id}
              className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/15 transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedShipment(shipment)}
            >
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start space-y-2 sm:space-y-0">
                  <div>
                    <CardTitle className="text-white flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                      <span>{shipment.trackingNumber}</span>
                      <Badge variant="outline" className={`${getStatusColor(shipment.status)} text-white border-0 w-fit`}>
                        {getStatusIcon(shipment.status)}
                        <span className="ml-1">{shipment.status}</span>
                      </Badge>
                    </CardTitle>
                    <CardDescription className="text-white/70 text-sm lg:text-base">
                      {shipment.origin} → {shipment.destination}
                    </CardDescription>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-sm text-white/70">Est. Delivery</p>
                    <p className="text-white font-medium">{shipment.estimatedDelivery}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-white/70">Driver</p>
                    <p className="text-white">{shipment.driver}</p>
                  </div>
                  <div>
                    <p className="text-sm text-white/70">Vehicle</p>
                    <p className="text-white">{shipment.vehicle}</p>
                  </div>
                  <div>
                    <p className="text-sm text-white/70">Weight</p>
                    <p className="text-white">{shipment.weight} kg</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Shipment Details Dialog */}
        {selectedShipment && (
          <Dialog open={!!selectedShipment} onOpenChange={() => setSelectedShipment(null)}>
            <DialogContent className="bg-slate-800 border-slate-700 mx-4 max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-white flex items-center space-x-2">
                  <Package className="h-5 w-5" />
                  <span>{selectedShipment.trackingNumber}</span>
                </DialogTitle>
                <DialogDescription className="text-white/70">Detailed tracking information</DialogDescription>
              </DialogHeader>

              <Tabs defaultValue="details" className="w-full">
                <TabsList className="bg-slate-700 w-full">
                  <TabsTrigger value="details" className="flex-1">Details</TabsTrigger>
                  <TabsTrigger value="timeline" className="flex-1">Timeline</TabsTrigger>
                  <TabsTrigger value="contact" className="flex-1">Contact</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-white/70">Origin</p>
                      <p className="text-white">{selectedShipment.origin}</p>
                    </div>
                    <div>
                      <p className="text-sm text-white/70">Destination</p>
                      <p className="text-white">{selectedShipment.destination}</p>
                    </div>
                    <div>
                      <p className="text-sm text-white/70">Status</p>
                      <Badge
                        variant="outline"
                        className={`${getStatusColor(selectedShipment.status)} text-white border-0 w-fit`}
                      >
                        {getStatusIcon(selectedShipment.status)}
                        <span className="ml-1">{selectedShipment.status}</span>
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-white/70">Est. Delivery</p>
                      <p className="text-white">{selectedShipment.estimatedDelivery}</p>
                    </div>
                    <div>
                      <p className="text-sm text-white/70">Weight</p>
                      <p className="text-white">{selectedShipment.weight} kg</p>
                    </div>
                    <div>
                      <p className="text-sm text-white/70">Dimensions</p>
                      <p className="text-white">{selectedShipment.dimensions}</p>
                    </div>
                  </div>
                  {selectedShipment.specialInstructions && (
                    <div>
                      <p className="text-sm text-white/70">Special Instructions</p>
                      <p className="text-white">{selectedShipment.specialInstructions}</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="timeline" className="space-y-4">
                  <div className="space-y-4">
                    {selectedShipment.timeline.map((event, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className={`p-2 rounded-full ${getStatusColor(event.status)} mt-1 flex-shrink-0`}>
                          {getStatusIcon(event.status)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-medium">{event.description}</p>
                          <p className="text-sm text-white/70">{event.location}</p>
                          <p className="text-xs text-white/50">{new Date(event.timestamp).toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="contact" className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-white/70">Driver</p>
                      <p className="text-white font-medium">{selectedShipment.driver}</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        variant="outline"
                        className="border-blue-400 text-blue-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 flex-1"
                      >
                        <Phone className="mr-2 h-4 w-4" />
                        {selectedShipment.driverPhone}
                      </Button>
                      <Button
                        variant="outline"
                        className="border-blue-400 text-blue-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 flex-1"
                      >
                        <Mail className="mr-2 h-4 w-4" />
                        Contact Support
                      </Button>
                    </div>
                    <div>
                      <p className="text-sm text-white/70">Vehicle ID</p>
                      <p className="text-white">{selectedShipment.vehicle}</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  )
}
