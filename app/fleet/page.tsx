"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Truck, MapPin, Fuel, Wrench, Clock, AlertTriangle, Search, Plus, Navigation, Battery, Thermometer, Menu } from 'lucide-react'

interface Vehicle {
  id: string
  make: string
  model: string
  year: number
  licensePlate: string
  status: "active" | "maintenance" | "idle" | "out-of-service"
  driver: string
  currentLocation: string
  fuelLevel: number
  mileage: number
  lastMaintenance: string
  nextMaintenance: string
  batteryLevel: number
  engineTemp: number
  speed: number
  route?: string
  estimatedArrival?: string
}

export default function FleetPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navigationItems = [
    { href: "/dashboard", label: "Dashboard", active: false },
    { href: "/tracking", label: "Tracking", active: false },
    { href: "/fleet", label: "Fleet", active: true },
    { href: "/routes", label: "Routes", active: false },
  ]

  useEffect(() => {
    // Load vehicles from localStorage
    const savedVehicles = localStorage.getItem("vehicles")
    if (savedVehicles) {
      setVehicles(JSON.parse(savedVehicles))
    } else {
      // Initialize with sample data
      const sampleVehicles: Vehicle[] = [
        {
          id: "VH001",
          make: "Volvo",
          model: "FH16",
          year: 2022,
          licensePlate: "LOG-001",
          status: "active",
          driver: "John Smith",
          currentLocation: "New York, NY",
          fuelLevel: 85,
          mileage: 45230,
          lastMaintenance: "2024-01-01",
          nextMaintenance: "2024-04-01",
          batteryLevel: 92,
          engineTemp: 85,
          speed: 65,
          route: "NY → LA",
          estimatedArrival: "2024-01-18T14:30:00Z",
        },
        {
          id: "VH002",
          make: "Mercedes",
          model: "Actros",
          year: 2023,
          licensePlate: "LOG-002",
          status: "active",
          driver: "Sarah Johnson",
          currentLocation: "Chicago, IL",
          fuelLevel: 62,
          mileage: 32100,
          lastMaintenance: "2023-12-15",
          nextMaintenance: "2024-03-15",
          batteryLevel: 88,
          engineTemp: 82,
          speed: 70,
          route: "CHI → SEA",
          estimatedArrival: "2024-01-17T09:15:00Z",
        },
        {
          id: "VH003",
          make: "Scania",
          model: "R500",
          year: 2021,
          licensePlate: "LOG-003",
          status: "maintenance",
          driver: "Mike Davis",
          currentLocation: "Service Center - Dallas",
          fuelLevel: 45,
          mileage: 67890,
          lastMaintenance: "2024-01-15",
          nextMaintenance: "2024-04-15",
          batteryLevel: 76,
          engineTemp: 75,
          speed: 0,
        },
        {
          id: "VH004",
          make: "Peterbilt",
          model: "579",
          year: 2022,
          licensePlate: "LOG-004",
          status: "idle",
          driver: "Emily Brown",
          currentLocation: "Houston Depot",
          fuelLevel: 95,
          mileage: 28450,
          lastMaintenance: "2023-11-20",
          nextMaintenance: "2024-02-20",
          batteryLevel: 94,
          engineTemp: 70,
          speed: 0,
        },
      ]
      setVehicles(sampleVehicles)
      localStorage.setItem("vehicles", JSON.stringify(sampleVehicles))
    }
  }, [])

  const filteredVehicles = vehicles.filter((vehicle) => {
    const matchesSearch =
      vehicle.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.licensePlate.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || vehicle.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "maintenance":
        return "bg-orange-500"
      case "idle":
        return "bg-blue-500"
      case "out-of-service":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Navigation className="h-4 w-4" />
      case "maintenance":
        return <Wrench className="h-4 w-4" />
      case "idle":
        return <Clock className="h-4 w-4" />
      case "out-of-service":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <Truck className="h-4 w-4" />
    }
  }

  const getFuelColor = (level: number) => {
    if (level > 50) return "bg-green-500"
    if (level > 25) return "bg-yellow-500"
    return "bg-red-500"
  }

  const getMaintenanceStatus = (nextMaintenance: string) => {
    const next = new Date(nextMaintenance)
    const now = new Date()
    const daysUntil = Math.ceil((next.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

    if (daysUntil < 0) return { status: "overdue", color: "bg-red-500", text: "Overdue" }
    if (daysUntil <= 7) return { status: "due-soon", color: "bg-orange-500", text: `Due in ${daysUntil} days` }
    return { status: "ok", color: "bg-green-500", text: `Due in ${daysUntil} days` }
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
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">Fleet Management</h1>
            <p className="text-white/70 text-sm lg:text-base">Monitor and manage your vehicle fleet with comprehensive tracking</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Add Vehicle
          </Button>
        </div>

        {/* Fleet Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white/80">Total Vehicles</CardTitle>
              <Truck className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-xl lg:text-2xl font-bold text-white">{vehicles.length}</div>
              <p className="text-xs text-green-400">All vehicles tracked</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white/80">Active</CardTitle>
              <Navigation className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-xl lg:text-2xl font-bold text-white">
                {vehicles.filter((v) => v.status === "active").length}
              </div>
              <p className="text-xs text-green-400">Currently on route</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white/80">Maintenance</CardTitle>
              <Wrench className="h-4 w-4 text-orange-400" />
            </CardHeader>
            <CardContent>
              <div className="text-xl lg:text-2xl font-bold text-white">
                {vehicles.filter((v) => v.status === "maintenance").length}
              </div>
              <p className="text-xs text-orange-400">In service</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white/80">Avg Fuel Level</CardTitle>
              <Fuel className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-xl lg:text-2xl font-bold text-white">
                {Math.round(vehicles.reduce((acc, v) => acc + v.fuelLevel, 0) / vehicles.length)}%
              </div>
              <p className="text-xs text-blue-400">Fleet average</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
            <Input
              placeholder="Search vehicles, drivers, or license plates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={statusFilter === "all" ? "default" : "outline"}
              onClick={() => setStatusFilter("all")}
              className={
                statusFilter === "all"
                  ? "bg-blue-600"
                  : "border-blue-400 text-blue-400 hover:bg-blue-600 hover:text-white hover:border-blue-600"
              }
            >
              All
            </Button>
            <Button
              variant={statusFilter === "active" ? "default" : "outline"}
              onClick={() => setStatusFilter("active")}
              className={
                statusFilter === "active"
                  ? "bg-blue-600"
                  : "border-blue-400 text-blue-400 hover:bg-blue-600 hover:text-white hover:border-blue-600"
              }
            >
              Active
            </Button>
            <Button
              variant={statusFilter === "maintenance" ? "default" : "outline"}
              onClick={() => setStatusFilter("maintenance")}
              className={
                statusFilter === "maintenance"
                  ? "bg-blue-600"
                  : "border-blue-400 text-blue-400 hover:bg-blue-600 hover:text-white hover:border-blue-600"
              }
            >
              Maintenance
            </Button>
            <Button
              variant={statusFilter === "idle" ? "default" : "outline"}
              onClick={() => setStatusFilter("idle")}
              className={
                statusFilter === "idle"
                  ? "bg-blue-600"
                  : "border-blue-400 text-blue-400 hover:bg-blue-600 hover:text-white hover:border-blue-600"
              }
            >
              Idle
            </Button>
          </div>
        </div>

        {/* Vehicle Grid */}
        <div className="grid gap-4 lg:gap-6">
          {filteredVehicles.map((vehicle) => {
            const maintenanceStatus = getMaintenanceStatus(vehicle.nextMaintenance)
            return (
              <Card
                key={vehicle.id}
                className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/15 transition-all duration-300"
              >
                <CardHeader>
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start space-y-4 lg:space-y-0">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <img
                          src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                          alt="Truck"
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div
                          className={`absolute -top-1 -right-1 w-4 h-4 rounded-full ${getStatusColor(vehicle.status)}`}
                        ></div>
                      </div>
                      <div>
                        <CardTitle className="text-white flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                          <span>{vehicle.id}</span>
                          <Badge variant="outline" className={`${getStatusColor(vehicle.status)} text-white border-0 w-fit`}>
                            {getStatusIcon(vehicle.status)}
                            <span className="ml-1">{vehicle.status}</span>
                          </Badge>
                        </CardTitle>
                        <CardDescription className="text-white/70">
                          {vehicle.year} {vehicle.make} {vehicle.model} • {vehicle.licensePlate}
                        </CardDescription>
                        <p className="text-sm text-white/60 mt-1">Driver: {vehicle.driver}</p>
                      </div>
                    </div>
                    <div className="text-left lg:text-right">
                      <p className="text-sm text-white/70">Current Location</p>
                      <p className="text-white font-medium flex items-center lg:justify-end">
                        <MapPin className="h-4 w-4 mr-1" />
                        {vehicle.currentLocation}
                      </p>
                      {vehicle.speed > 0 && <p className="text-sm text-blue-400 mt-1">{vehicle.speed} mph</p>}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="status" className="w-full">
                    <TabsList className="bg-white/10 border-white/20 mb-4 w-full">
                      <TabsTrigger
                        value="status"
                        className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-blue-400 flex-1"
                      >
                        Status
                      </TabsTrigger>
                      <TabsTrigger
                        value="maintenance"
                        className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-blue-400 flex-1"
                      >
                        Maintenance
                      </TabsTrigger>
                      <TabsTrigger
                        value="route"
                        className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-blue-400 flex-1"
                      >
                        Route
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="status" className="space-y-4">
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-white/80 flex items-center">
                              <Fuel className="h-4 w-4 mr-1" />
                              Fuel
                            </span>
                            <span className="text-white">{vehicle.fuelLevel}%</span>
                          </div>
                          <Progress value={vehicle.fuelLevel} className={`h-2 ${getFuelColor(vehicle.fuelLevel)}`} />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-white/80 flex items-center">
                              <Battery className="h-4 w-4 mr-1" />
                              Battery
                            </span>
                            <span className="text-white">{vehicle.batteryLevel}%</span>
                          </div>
                          <Progress value={vehicle.batteryLevel} className="h-2" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-white/80 flex items-center">
                              <Thermometer className="h-4 w-4 mr-1" />
                              Engine
                            </span>
                            <span className="text-white">{vehicle.engineTemp}°C</span>
                          </div>
                          <Progress value={(vehicle.engineTemp / 120) * 100} className="h-2" />
                        </div>
                        <div>
                          <p className="text-sm text-white/80">Mileage</p>
                          <p className="text-white font-medium">{vehicle.mileage.toLocaleString()} km</p>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="maintenance" className="space-y-4">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-white/80">Last Maintenance</p>
                          <p className="text-white">{vehicle.lastMaintenance}</p>
                        </div>
                        <div>
                          <p className="text-sm text-white/80">Next Maintenance</p>
                          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                            <p className="text-white">{vehicle.nextMaintenance}</p>
                            <Badge
                              variant="outline"
                              className={`${maintenanceStatus.color} text-white border-0 text-xs w-fit`}
                            >
                              {maintenanceStatus.text}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      {maintenanceStatus.status !== "ok" && (
                        <div className="bg-orange-500/20 border border-orange-500/30 rounded-lg p-3">
                          <div className="flex items-start space-x-2">
                            <AlertTriangle className="h-4 w-4 text-orange-400 mt-0.5 flex-shrink-0" />
                            <p className="text-orange-400 text-sm">
                              {maintenanceStatus.status === "overdue"
                                ? "Maintenance is overdue. Schedule service immediately."
                                : "Maintenance due soon. Schedule service."}
                            </p>
                          </div>
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="route" className="space-y-4">
                      {vehicle.route ? (
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-white/80">Current Route</p>
                            <p className="text-white font-medium">{vehicle.route}</p>
                          </div>
                          {vehicle.estimatedArrival && (
                            <div>
                              <p className="text-sm text-white/80">Estimated Arrival</p>
                              <p className="text-white">{new Date(vehicle.estimatedArrival).toLocaleString()}</p>
                            </div>
                          )}
                          <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-3">
                            <div className="flex items-center space-x-2">
                              <Navigation className="h-4 w-4 text-blue-400" />
                              <p className="text-blue-400 text-sm">Vehicle is actively tracking route</p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <MapPin className="h-12 w-12 text-white/30 mx-auto mb-3" />
                          <p className="text-white/70">No active route assigned</p>
                          <Button className="mt-3 bg-blue-600 hover:bg-blue-700 text-white">Assign Route</Button>
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {filteredVehicles.length === 0 && (
          <div className="text-center py-12">
            <Truck className="h-16 w-16 text-white/30 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No vehicles found</h3>
            <p className="text-white/70">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}
