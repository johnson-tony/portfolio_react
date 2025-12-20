"use client"

import { useState, useEffect } from "react"
import { BASE_URL } from "@/config/api"

interface Profile {
  fullName: string
  role: string
  about: string
  currentFocus: string
  skills: string
  linkedin: string
  github: string
  email: string
}

export function ProfileSection() {
  const [profile, setProfile] = useState<Profile>({
    fullName: "",
    role: "",
    about: "",
    currentFocus: "",
    skills: "",
    linkedin: "",
    github: "",
    email: "",
  })

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${BASE_URL}/profile`)
        const data = await res.json()

        if (data) {
          setProfile(data)
        }
      } catch (err) {
        console.error("Failed to fetch profile", err)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  if (loading) {
    return (
      <section className="container mx-auto px-4 py-16">
        <p>Loading profile...</p>
      </section>
    )
  }

  return (
    <section
      id="profile"
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24"
    >
      <div className="max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-balance">
          {profile.fullName || "Your Name"}
        </h1>

        <p className="text-xl text-muted-foreground mb-6">
          {profile.role || "Your Role"}
        </p>

        <p className="text-lg text-muted-foreground leading-relaxed">
          {profile.about || "Your bio goes here."}
        </p>
      </div>
    </section>
  )
}
