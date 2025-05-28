"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Truck, Package, MapPin, BarChart3, Clock, TrendingUp, AlertTriangle, CheckCircle, Bell, Search, Settings, Menu } from 'lucide-react'

interface DashboardData {
  totalShipments: number
  activeVehicles: number
  deliveredToday: number
  pendingDeliveries: number
  onTimeDeliveryRate: number
  fuelEfficiency: number
  recentShipments: Array<{
    id: string
    destination: string
    status: "delivered" | "in-transit" | "pending" | "delayed"
    estimatedDelivery: string
    driver: string
  }>
  fleetStatus: Array<{
    id: string
    driver: string
    location: string
    status: "active" | "maintenance" | "idle"
    fuelLevel: number
  }>
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navigationItems = [
    { href: "/dashboard", label: "Dashboard", active: true },
    { href: "/tracking", label: "Tracking", active: false },
    { href: "/fleet", label: "Fleet", active: false },
    { href: "/routes", label: "Routes", active: false },
  ]

  useEffect(() => {
    // Simulate loading and fetch data from localStorage
    const timer = setTimeout(() => {
      const savedData = localStorage.getItem("logisticsData")
      if (savedData) {
        setData(JSON.parse(savedData))
      } else {
        // Initialize with sample data
        const initialData: DashboardData = {
          totalShipments: 1247,
          activeVehicles: 23,
          deliveredToday: 89,
          pendingDeliveries: 156,
          onTimeDeliveryRate: 94.5,
          fuelEfficiency: 87.2,
          recentShipments: [
            {
              id: "SH001",
              destination: "New York, NY",
              status: "delivered",
              estimatedDelivery: "2024-01-15",
              driver: "John Smith",
            },
            {
              id: "SH002",
              destination: "Los Angeles, CA",
              status: "in-transit",
              estimatedDelivery: "2024-01-16",
              driver: "Sarah Johnson",
            },
            {
              id: "SH003",
              destination: "Chicago, IL",
              status: "pending",
              estimatedDelivery: "2024-01-17",
              driver: "Mike Davis",
            },
            {
              id: "SH004",
              destination: "Houston, TX",
              status: "delayed",
              estimatedDelivery: "2024-01-15",
              driver: "Emily Brown",
            },
          ],
          fleetStatus: [
            {
              id: "VH001",
              driver: "John Smith",
              location: "New York, NY",
              status: "active",
              fuelLevel: 85,
            },
            {
              id: "VH002",
              driver: "Sarah Johnson",
              location: "Los Angeles, CA",
              status: "active",
              fuelLevel: 62,
            },
            {
              id: "VH003",
              driver: "Mike Davis",
              location: "Chicago, IL",
              status: "maintenance",
              fuelLevel: 45,
            },
          ],
        }
        setData(initialData)
        localStorage.setItem("logisticsData", JSON.stringify(initialData))
      }
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-500"
      case "in-transit":
        return "bg-blue-500"
      case "pending":
        return "bg-yellow-500"
      case "delayed":
        return "bg-red-500"
      case "active":
        return "bg-green-500"
      case "maintenance":
        return "bg-orange-500"
      case "idle":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="h-4 w-4" />
      case "in-transit":
        return <Truck className="h-4 w-4" />
      case "pending":
        return <Clock className="h-4 w-4" />
      case "delayed":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-400 mx-auto"></div>
          <p className="text-white text-lg">Loading dashboard...</p>
        </div>
      </div>
    )
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

            {/* Desktop Action Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="text-white">
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white">
                <Settings className="h-5 w-5" />
              </Button>
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

                  {/* Mobile Action Buttons */}
                  <div className="flex flex-col space-y-3 mt-auto pb-6">
                    <Button variant="outline" className="w-full border-blue-400 text-blue-400 hover:bg-blue-600 hover:text-white">
                      <Search className="mr-2 h-4 w-4" />
                      Search
                    </Button>
                    <Button variant="outline" className="w-full border-blue-400 text-blue-400 hover:bg-blue-600 hover:text-white">
                      <Bell className="mr-2 h-4 w-4" />
                      Notifications
                    </Button>
                    <Button variant="outline" className="w-full border-blue-400 text-blue-400 hover:bg-blue-600 hover:text-white">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-6 lg:py-8">
        {/* Header */}
        <div className="mb-6 lg:mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-white/70 text-sm lg:text-base">Welcome back! Here's what's happening with your logistics operations.</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white/80">Total Shipments</CardTitle>
              <Package className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-xl lg:text-2xl font-bold text-white">{data?.totalShipments.toLocaleString()}</div>
              <p className="text-xs text-green-400 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white/80">Active Vehicles</CardTitle>
              <Truck className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-xl lg:text-2xl font-bold text-white">{data?.activeVehicles}</div>
              <p className="text-xs text-green-400 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +2 from yesterday
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white/80">Delivered Today</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-xl lg:text-2xl font-bold text-white">{data?.deliveredToday}</div>
              <p className="text-xs text-green-400 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +8% from yesterday
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white/80">On-Time Rate</CardTitle>
              <BarChart3 className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-xl lg:text-2xl font-bold text-white">{data?.onTimeDeliveryRate}%</div>
              <Progress value={data?.onTimeDeliveryRate} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-white/10 border-white/20 w-full sm:w-auto">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-blue-400 flex-1 sm:flex-none"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="shipments"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-blue-400 flex-1 sm:flex-none"
            >
              Shipments
            </TabsTrigger>
            <TabsTrigger
              value="fleet"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-blue-400 flex-1 sm:flex-none"
            >
              Fleet Status
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/80">Fuel Efficiency</span>
                      <span className="text-white">{data?.fuelEfficiency}%</span>
                    </div>
                    <Progress value={data?.fuelEfficiency} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/80">On-Time Delivery</span>
                      <span className="text-white">{data?.onTimeDeliveryRate}%</span>
                    </div>
                    <Progress value={data?.onTimeDeliveryRate} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/80">Fleet Utilization</span>
                      <span className="text-white">78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link href="/tracking">
                    <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white">
                      <Package className="mr-2 h-4 w-4" />
                      Create New Shipment
                    </Button>
                  </Link>
                  <Link href="/fleet">
                    <Button
                      variant="outline"
                      className="w-full justify-start border-blue-400 text-blue-400 hover:bg-blue-600 hover:text-white hover:border-blue-600"
                    >
                      <Truck className="mr-2 h-4 w-4" />
                      Manage Fleet
                    </Button>
                  </Link>
                  <Link href="/routes">
                    <Button
                      variant="outline"
                      className="w-full justify-start border-blue-400 text-blue-400 hover:bg-blue-600 hover:text-white hover:border-blue-600"
                    >
                      <MapPin className="mr-2 h-4 w-4" />
                      Plan Route
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="shipments">
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Recent Shipments</CardTitle>
                <CardDescription className="text-white/70">Track and manage your latest shipments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data?.recentShipments.map((shipment) => (
                    <div key={shipment.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white/5 rounded-lg space-y-2 sm:space-y-0">
                      <div className="flex items-center space-x-4">
                        <div className={`p-2 rounded-full ${getStatusColor(shipment.status)}`}>
                          {getStatusIcon(shipment.status)}
                        </div>
                        <div>
                          <p className="font-medium text-white">{shipment.id}</p>
                          <p className="text-sm text-white/70">{shipment.destination}</p>
                        </div>
                      </div>
                      <div className="text-left sm:text-right">
                        <Badge variant="outline" className={`${getStatusColor(shipment.status)} text-white border-0`}>
                          {shipment.status}
                        </Badge>
                        <p className="text-sm text-white/70 mt-1">{shipment.driver}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="fleet">
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Fleet Status</CardTitle>
                <CardDescription className="text-white/70">Monitor your vehicle fleet in real-time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data?.fleetStatus.map((vehicle) => (
                    <div key={vehicle.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white/5 rounded-lg space-y-2 sm:space-y-0">
                      <div className="flex items-center space-x-4">
                        <div className={`p-2 rounded-full ${getStatusColor(vehicle.status)}`}>
                          <Truck className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium text-white">{vehicle.id}</p>
                          <p className="text-sm text-white/70">{vehicle.driver}</p>
                          <p className="text-sm text-white/50">{vehicle.location}</p>
                        </div>
                      </div>
                      <div className="text-left sm:text-right space-y-2">
                        <Badge variant="outline" className={`${getStatusColor(vehicle.status)} text-white border-0`}>
                          {vehicle.status}
                        </Badge>
                        <div className="space-y-1">
                          <p className="text-sm text-white/70">Fuel: {vehicle.fuelLevel}%</p>
                          <Progress value={vehicle.fuelLevel} className="h-1 w-20" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
