"use client"

import { useState, useEffect } from "react"
import { ProfilePanel } from "./profile-panel"
import { Menu, X, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [profileOpen, setProfileOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState<string>("")

  const navigationItems = [
    { id: "resources", label: "Resources" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ]

  // Scroll listener for header shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)

      // Update active section
      navigationItems.forEach((item) => {
        const el = document.getElementById(item.id)
        if (el) {
          const offsetTop = el.offsetTop - 120
          const offsetBottom = offsetTop + el.offsetHeight
          if (window.scrollY >= offsetTop && window.scrollY < offsetBottom) {
            setActiveSection(item.id)
          }
        }
      })
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileMenuOpen(false)
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const headerOffset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({ top: offsetPosition, behavior: "smooth" })
      setMobileMenuOpen(false)
    }
  }

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b transition-all duration-200 ${
          scrolled
            ? "bg-[#0b1220]/95 backdrop-blur-xl border-gray-700/50 shadow-sm"
            : "bg-[#0b1220]/80 backdrop-blur-lg border-gray-700/40"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 sm:h-16 items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-2 group"
            >
              <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-cyan-400 text-white font-semibold text-sm transition-transform group-hover:scale-105">
                JMT
              </div>
              <span className="hidden sm:inline text-lg font-bold tracking-tight text-white">
                Portfolio
              </span>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navigationItems.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  size="sm"
                  onClick={() => scrollToSection(item.id)}
                  className={`rounded-lg px-4 font-medium transition-all duration-200 ${
                    activeSection === item.id
                      ? "text-cyan-400 border-b-2 border-cyan-400"
                      : "text-gray-400 hover:text-cyan-400 hover:border-b-2 hover:border-cyan-400"
                  }`}
                >
                  {item.label}
                </Button>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              {/* Profile Button Desktop */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setProfileOpen(true)}
                className="hidden sm:flex items-center gap-2 rounded-full px-4 border border-gray-700 hover:bg-cyan-500/10 transition-all duration-200"
              >
                <div className="h-6 w-6 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-medium text-xs">
                  JMT
                </div>
                <span className="text-sm font-medium text-white">Profile</span>
              </Button>

              {/* Profile Button Mobile */}
              <button
                onClick={() => setProfileOpen(true)}
                className="sm:hidden flex h-9 w-9 items-center justify-center rounded-full bg-cyan-500/20 border border-cyan-400 text-white font-medium text-sm hover:bg-cyan-500/30 transition-colors"
                aria-label="Open profile"
              >
                JMT
              </button>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden ml-1"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="h-5 w-5 text-white" /> : <Menu className="h-5 w-5 text-white" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden animate-in slide-in-from-top duration-200">
              <div className="px-2 py-3 space-y-1 border-t border-gray-700/50">
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="w-full flex items-center justify-between px-4 py-3.5 text-base font-medium rounded-lg hover:bg-cyan-500/10 transition-colors group text-white"
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                  </button>
                ))}

                {/* Profile in Mobile Menu */}
                <button
                  onClick={() => {
                    setProfileOpen(true)
                    setMobileMenuOpen(false)
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3.5 text-base font-medium rounded-lg bg-gradient-to-r from-cyan-500/5 to-cyan-400/10 border border-cyan-400 mt-2"
                >
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-400 flex items-center justify-center text-white font-medium">
                    JMT
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="font-semibold">John M. Tesh</span>
                    <span className="text-sm text-gray-400">View full profile</span>
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Profile Panel */}
      <ProfilePanel open={profileOpen} onClose={() => setProfileOpen(false)} />
    </>
  )
}
