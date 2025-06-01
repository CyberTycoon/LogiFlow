"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Truck, Package, MapPin, BarChart3, ArrowRight, Shield, Zap, Menu, X } from 'lucide-react'

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const navigationItems = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/tracking", label: "Tracking" },
    { href: "/fleet", label: "Fleet" },
    { href: "/routes", label: "Routes" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
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
                  className="text-white/80 hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Desktop CTA Button */}
            <div className="hidden md:block">
              <Link href="/dashboard">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">Get Started</Button>
              </Link>
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
                        className="text-white/80 hover:text-white transition-colors text-lg py-2"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>

                  {/* Mobile CTA Button */}
                  <div className="mt-auto pb-6">
                    <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        Get Started
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div
              className={`space-y-6 lg:space-y-8 transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
            >
              <div className="space-y-4">
                <Badge className="bg-blue-600/20 text-blue-300 border-blue-600/30">Next-Gen Logistics Platform</Badge>
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight">
                  Streamline Your
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                    {" "}
                    Supply Chain
                  </span>
                </h1>
                <p className="text-lg sm:text-xl text-white/70 leading-relaxed">
                  Revolutionize your logistics operations with real-time tracking, intelligent route optimization, and
                  comprehensive fleet management.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/dashboard">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 lg:px-8 py-3 lg:py-4 text-base lg:text-lg"
                  >
                    Start With Logiflow
                    <ArrowRight className="ml-2 h-4 w-4 lg:h-5 lg:w-5" />
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-4 lg:gap-6 pt-6 lg:pt-8">
                <div className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold text-white">99.9%</div>
                  <div className="text-sm lg:text-base text-white/60">Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold text-white">50K+</div>
                  <div className="text-sm lg:text-base text-white/60">Shipments</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold text-white">24/7</div>
                  <div className="text-sm lg:text-base text-white/60">Support</div>
                </div>
              </div>
            </div>

            <div
              className={`relative mt-8 lg:mt-0 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
            >
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Logistics Hub"
                  className="rounded-2xl shadow-2xl w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-20 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Powerful Features</h2>
            <p className="text-lg lg:text-xl text-white/70">Everything you need to manage your logistics operations</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                icon: Package,
                title: "Shipment Tracking",
                description: "Track your shipments with automated status updates and delivery confirmations.",
                image:
                  "/tracking.jpg",
              },
              {
                icon: MapPin,
                title: "Route Optimization",
                description: "AI-powered route planning to reduce costs and delivery times.",
                image:
                  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
              },
              {
                icon: Truck,
                title: "Fleet Management",
                description: "Comprehensive fleet monitoring with maintenance scheduling and performance analytics.",
                image:
                  "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
              },
              {
                icon: BarChart3,
                title: "Analytics Dashboard",
                description: "Detailed insights and reports to optimize your operations.",
                image:
                  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
              },
              {
                icon: Shield,
                title: "Secure & Reliable",
                description: "Enterprise-grade security with 99.9% uptime guarantee.",
                image:
                  "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
              },
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Optimized performance for instant data processing and updates.",
                image:
                  "/fast.jpg",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/15 transition-all duration-300 group overflow-hidden"
              >
                <div className="relative h-40 sm:h-48 overflow-hidden">
                  <img
                    src={feature.image || "/placeholder.svg"}
                    alt={feature.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <feature.icon className="h-6 w-6 lg:h-8 lg:w-8 text-blue-400" />
                  </div>
                </div>
                <CardHeader className="p-4 lg:p-6">
                  <CardTitle className="text-white text-lg lg:text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-white/70 text-sm lg:text-base">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6 lg:space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-white">Ready to Transform Your Logistics?</h2>
            <p className="text-lg lg:text-xl text-white/70 pb-4">
              Join thousands of companies already using LogiFlow to streamline their operations.
            </p>
            <Link href="/dashboard">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 lg:px-12 py-4 lg:py-6 text-lg lg:text-xl"
              >
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5 lg:h-6 lg:w-6" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
