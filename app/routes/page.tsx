"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Truck, MapPin, Navigation, Clock, Route, Plus, Search, Zap, TrendingDown, Calendar, AlertCircle, Menu } from 'lucide-react'

interface RouteData {
  id: string
  name: string
  origin: string
  destination: string
  distance: number
  estimatedTime: number
  fuelCost: number
  status: "planned" | "active" | "completed" | "delayed"
  assignedVehicle?: string
  driver?: string
  waypoints: string[]
  optimizationScore: number
  createdAt: string
  startTime?: string
  completedTime?: string
}

export default function RoutesPage() {
  const [routes, setRoutes] = useState<RouteData[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [newRoute, setNewRoute] = useState({
    name: "",
    origin: "",
    destination: "",
    waypoints: "",
    vehicle: "",
  })

  const navigationItems = [
    { href: "/dashboard", label: "Dashboard", active: false },
    { href: "/tracking", label: "Tracking", active: false },
    { href: "/fleet", label: "Fleet", active: false },
    { href: "/routes", label: "Routes", active: true },
  ]

  useEffect(() => {
    // Load routes from localStorage
    const savedRoutes = localStorage.getItem("routes")
    if (savedRoutes) {
      setRoutes(JSON.parse(savedRoutes))
    } else {
      // Initialize with sample data
      const sampleRoutes: RouteData[] = [
        {
          id: "RT001",
          name: "East Coast Express",
          origin: "New York, NY",
          destination: "Miami, FL",
          distance: 1280,
          estimatedTime: 18,
          fuelCost: 320,
          status: "active",
          assignedVehicle: "VH001",
          driver: "John Smith",
          waypoints: ["Philadelphia, PA", "Washington, DC", "Savannah, GA"],
          optimizationScore: 94,
          createdAt: "2024-01-15T08:00:00Z",
          startTime: "2024-01-15T09:00:00Z",
        },
        {
          id: "RT002",
          name: "West Coast Corridor",
          origin: "Los Angeles, CA",
          destination: "Seattle, WA",
          distance: 1135,
          estimatedTime: 16,
          fuelCost: 285,
          status: "planned",
          waypoints: ["San Francisco, CA", "Portland, OR"],
          optimizationScore: 89,
          createdAt: "2024-01-16T10:00:00Z",
        },
        {
          id: "RT003",
          name: "Central Hub Route",
          origin: "Chicago, IL",
          destination: "Dallas, TX",
          distance: 925,
          estimatedTime: 13,
          fuelCost: 235,
          status: "completed",
          assignedVehicle: "VH002",
          driver: "Sarah Johnson",
          waypoints: ["St. Louis, MO", "Oklahoma City, OK"],
          optimizationScore: 96,
          createdAt: "2024-01-14T07:00:00Z",
          startTime: "2024-01-14T08:00:00Z",
          completedTime: "2024-01-14T21:30:00Z",
        },
        {
          id: "RT004",
          name: "Mountain Express",
          origin: "Denver, CO",
          destination: "Phoenix, AZ",
          distance: 860,
          estimatedTime: 12,
          fuelCost: 215,
          status: "delayed",
          assignedVehicle: "VH003",
          driver: "Mike Davis",
          waypoints: ["Albuquerque, NM"],
          optimizationScore: 78,
          createdAt: "2024-01-15T12:00:00Z",
          startTime: "2024-01-15T13:00:00Z",
        },
      ]
      setRoutes(sampleRoutes)
      localStorage.setItem("routes", JSON.stringify(sampleRoutes))
    }
  }, [])

  const filteredRoutes = routes.filter(
    (route) =>
      route.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.destination.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500"
      case "active":
        return "bg-blue-500"
      case "planned":
        return "bg-yellow-500"
      case "delayed":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <Navigation className="h-4 w-4" />
      case "active":
        return <Truck className="h-4 w-4" />
      case "planned":
        return <Calendar className="h-4 w-4" />
      case "delayed":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Route className="h-4 w-4" />
    }
  }

  const getOptimizationColor = (score: number) => {
    if (score >= 90) return "text-green-400"
    if (score >= 75) return "text-yellow-400"
    return "text-red-400"
  }

  const createRoute = () => {
    const route: RouteData = {
      id: `RT${String(routes.length + 1).padStart(3, "0")}`,
      name: newRoute.name,
      origin: newRoute.origin,
      destination: newRoute.destination,
      distance: Math.floor(Math.random() * 1000) + 500, // Simulated
      estimatedTime: Math.floor(Math.random() * 20) + 8, // Simulated
      fuelCost: Math.floor(Math.random() * 300) + 150, // Simulated
      status: "planned",
      waypoints: newRoute.waypoints ? newRoute.waypoints.split(",").map((w) => w.trim()) : [],
      optimizationScore: Math.floor(Math.random() * 30) + 70, // Simulated
      createdAt: new Date().toISOString(),
    }

    const updatedRoutes = [...routes, route]
    setRoutes(updatedRoutes)
    localStorage.setItem("routes", JSON.stringify(updatedRoutes))
    setIsCreateDialogOpen(false)
    setNewRoute({
      name: "",
      origin: "",
      destination: "",
      waypoints: "",
      vehicle: "",
    })
  }

  const totalDistance = routes.reduce((acc, route) => acc + route.distance, 0)
  const totalFuelCost = routes.reduce((acc, route) => acc + route.fuelCost, 0)
  const avgOptimization = routes.reduce((acc, route) => acc + route.optimizationScore, 0) / routes.length

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
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">Route Planning</h1>
            <p className="text-white/70 text-sm lg:text-base">Optimize your delivery routes with AI-powered planning</p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto">
                <Plus className="mr-2 h-4 w-4" />
                Plan New Route
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-800 border-slate-700 mx-4 max-w-md">
              <DialogHeader>
                <DialogTitle className="text-white">Plan New Route</DialogTitle>
                <DialogDescription className="text-white/70">
                  Create an optimized route for your delivery
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="routeName" className="text-white">
                    Route Name
                  </Label>
                  <Input
                    id="routeName"
                    value={newRoute.name}
                    onChange={(e) => setNewRoute({ ...newRoute, name: e.target.value })}
                    placeholder="Enter route name"
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="origin" className="text-white">
                      Origin
                    </Label>
                    <Input
                      id="origin"
                      value={newRoute.origin}
                      onChange={(e) => setNewRoute({ ...newRoute, origin: e.target.value })}
                      placeholder="Starting point"
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="destination" className="text-white">
                      Destination
                    </Label>
                    <Input
                      id="destination"
                      value={newRoute.destination}
                      onChange={(e) => setNewRoute({ ...newRoute, destination: e.target.value })}
                      placeholder="End point"
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="waypoints" className="text-white">
                    Waypoints (Optional)
                  </Label>
                  <Input
                    id="waypoints"
                    value={newRoute.waypoints}
                    onChange={(e) => setNewRoute({ ...newRoute, waypoints: e.target.value })}
                    placeholder="City 1, City 2, City 3..."
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vehicle" className="text-white">
                    Assign Vehicle (Optional)
                  </Label>
                  <Select
                    value={newRoute.vehicle}
                    onValueChange={(value) => setNewRoute({ ...newRoute, vehicle: value })}
                  >
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue placeholder="Select vehicle" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="VH001">VH001 - John Smith</SelectItem>
                      <SelectItem value="VH002">VH002 - Sarah Johnson</SelectItem>
                      <SelectItem value="VH003">VH003 - Mike Davis</SelectItem>
                      <SelectItem value="VH004">VH004 - Emily Brown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={createRoute} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  <Zap className="mr-2 h-4 w-4" />
                  Optimize & Create Route
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Route Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white/80">Total Routes</CardTitle>
              <Route className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-xl lg:text-2xl font-bold text-white">{routes.length}</div>
              <p className="text-xs text-green-400">All planned routes</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white/80">Total Distance</CardTitle>
              <MapPin className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-xl lg:text-2xl font-bold text-white">{totalDistance.toLocaleString()} km</div>
              <p className="text-xs text-blue-400">Across all routes</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white/80">Fuel Cost</CardTitle>
              <TrendingDown className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-xl lg:text-2xl font-bold text-white">${totalFuelCost.toLocaleString()}</div>
              <p className="text-xs text-green-400">15% savings vs manual</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white/80">Avg Optimization</CardTitle>
              <Zap className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-xl lg:text-2xl font-bold text-white">{Math.round(avgOptimization)}%</div>
              <p className="text-xs text-yellow-400">AI optimization score</p>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
            <Input
              placeholder="Search routes by name, origin, or destination..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
        </div>

        {/* Routes Grid */}
        <div className="grid gap-4 lg:gap-6">
          {filteredRoutes.map((route) => (
            <Card
              key={route.id}
              className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/15 transition-all duration-300"
            >
              <CardHeader>
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start space-y-4 lg:space-y-0">
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <div className="relative">
                      <img
                        src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                        alt="Route Map"
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div
                        className={`absolute -top-1 -right-1 w-4 h-4 rounded-full ${getStatusColor(route.status)}`}
                      ></div>
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-white flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                        <span>{route.name}</span>
                        <Badge variant="outline" className={`${getStatusColor(route.status)} text-white border-0 w-fit`}>
                          {getStatusIcon(route.status)}
                          <span className="ml-1">{route.status}</span>
                        </Badge>
                      </CardTitle>
                      <CardDescription className="text-white/70">
                        {route.origin} → {route.destination}
                      </CardDescription>
                      <p className="text-sm text-white/60 mt-1">
                        {route.waypoints.length > 0 && `Via: ${route.waypoints.join(", ")}`}
                      </p>
                    </div>
                  </div>
                  <div className="text-left lg:text-right">
                    <p className="text-sm text-white/70">Optimization Score</p>
                    <p className={`text-2xl font-bold ${getOptimizationColor(route.optimizationScore)}`}>
                      {route.optimizationScore}%
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-white/70 flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      Distance
                    </p>
                    <p className="text-white font-medium">{route.distance} km</p>
                  </div>
                  <div>
                    <p className="text-sm text-white/70 flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      Est. Time
                    </p>
                    <p className="text-white font-medium">{route.estimatedTime}h</p>
                  </div>
                  <div>
                    <p className="text-sm text-white/70">Fuel Cost</p>
                    <p className="text-white font-medium">${route.fuelCost}</p>
                  </div>
                  <div>
                    <p className="text-sm text-white/70">Created</p>
                    <p className="text-white font-medium">{new Date(route.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>

                {route.assignedVehicle && (
                  <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-3 mb-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                      <div className="flex items-center space-x-2">
                        <Truck className="h-4 w-4 text-blue-400" />
                        <span className="text-blue-400 text-sm">
                          Assigned to {route.assignedVehicle} - {route.driver}
                        </span>
                      </div>
                      {route.startTime && (
                        <span className="text-blue-400 text-sm">
                          Started: {new Date(route.startTime).toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0">
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-blue-400 text-blue-400 hover:bg-blue-600 hover:text-white hover:border-blue-600"
                    >
                      View Details
                    </Button>
                    {route.status === "planned" && (
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                        Start Route
                      </Button>
                    )}
                    {route.status === "active" && (
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                        Track Live
                      </Button>
                    )}
                  </div>
                  <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300 w-full sm:w-auto">
                    <Zap className="h-4 w-4 mr-1" />
                    Re-optimize
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredRoutes.length === 0 && (
          <div className="text-center py-12">
            <Route className="h-16 w-16 text-white/30 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No routes found</h3>
            <p className="text-white/70">Create your first optimized route to get started</p>
            <Button
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => setIsCreateDialogOpen(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Plan New Route
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
