"use client"

import { useState, useEffect } from "react"
import { ProfilePanel } from "./profile-panel"
import { Menu, X, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [profileOpen, setProfileOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Close mobile menu on larger screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false)
      }
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const headerOffset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })
      
      setMobileMenuOpen(false)
    }
  }

  const navigationItems = [
    { id: "resources", label: "Resources" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ]

  return (
    <>
      <header className={`sticky top-0 z-50 border-b transition-all duration-200 ${
        scrolled 
          ? "bg-background/95 backdrop-blur-xl border-border/50 shadow-sm" 
          : "bg-background/80 backdrop-blur-lg border-border/40"
      }`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 sm:h-16 items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" })
                setMobileMenuOpen(false)
              }}
              className="flex items-center gap-2 group"
            >
              <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-semibold text-sm transition-transform group-hover:scale-105">
                JMT
              </div>
              <span className="hidden sm:inline text-lg font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
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
                  className="rounded-lg px-4 font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200"
                >
                  {item.label}
                </Button>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              {/* Profile Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setProfileOpen(true)}
                className="hidden sm:flex items-center gap-2 rounded-full px-4 border"
              >
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-xs">
                  JMT
                </div>
                <span className="text-sm font-medium">Profile</span>
              </Button>

              <button
                onClick={() => setProfileOpen(true)}
                className="sm:hidden flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 border border-primary/20 text-primary font-medium text-sm hover:bg-primary/20 transition-colors"
                aria-label="Open profile"
              >
                JMT
              </button>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden ml-1"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation - Enhanced */}
          {mobileMenuOpen && (
            <div className="md:hidden animate-in slide-in-from-top duration-200">
              <div className="px-2 py-3 space-y-1 border-t border-border/50">
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="w-full flex items-center justify-between px-4 py-3.5 text-base font-medium rounded-lg hover:bg-muted/50 active:bg-muted transition-colors group"
                  >
                    <span className="text-foreground/90">{item.label}</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
                  </button>
                ))}
                
                {/* Profile in mobile menu */}
                <button
                  onClick={() => {
                    setProfileOpen(true)
                    setMobileMenuOpen(false)
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3.5 text-base font-medium rounded-lg bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/10 mt-2"
                >
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground font-medium">
                    JMT
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="font-semibold">John M. Tesh</span>
                    <span className="text-sm text-muted-foreground">View full profile</span>
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      </header>
      <ProfilePanel open={profileOpen} onClose={() => setProfileOpen(false)} />
    </>
  )
}