"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
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
  imageUrl?: string
}

interface ProfileSectionProps {
  onOpenProfile: () => void
}

export function ProfileSection({ onOpenProfile }: ProfileSectionProps) {
  const [profile, setProfile] = useState<Profile | null>(null)

  useEffect(() => {
    fetch(`${BASE_URL}/profile`)
      .then((res) => res.json())
      .then((data) => setProfile(data))
      .catch((err) => console.error("Profile load failed", err))
  }, [])

  if (!profile) {
    return (
      <section className="py-28 text-center text-gray-400">
        Loading...
      </section>
    )
  }

  return (
    <section
      id="profile"
      className="relative overflow-hidden bg-[#0b1220]"
    >
      <div className="container mx-auto px-6 py-8 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">

          {/* TEXT BLOCK */}
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-semibold text-white mb-3">
              {profile.fullName}
            </h1>

            <p className="text-lg text-cyan-400 mb-6">
              {profile.role}
            </p>

            <p className="text-gray-300 max-w-md leading-relaxed">
              I design and build thoughtful web experiences with clarity and intent.
            </p>

            <button
              onClick={onOpenProfile}
              className="mt-8 inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition"
            >
              About me <span>→</span>
            </button>
          </div>

          {/* IMAGE BLOCK */}
          <div
            onClick={onOpenProfile}
            className="relative cursor-pointer group"
          >
            {/* Gradient mask for partial reveal */}
            <div className="absolute inset-0 bg-gradient-to-l from-[#0b1220] via-transparent to-transparent z-10" />

            <div className="relative w-[320px] h-[380px] md:w-[420px] md:h-[460px] ml-auto">
              <Image
                src={profile.imageUrl || "/john1.jpeg"}
                alt="Profile image"
                fill
                priority
                className="
                  object-cover rounded-xl
                  grayscale-[15%] contrast-110
                  transition duration-500
                  group-hover:grayscale-0
                "
              />
              {/* subtle cyan glow */}
              <div className="absolute inset-0 rounded-xl ring-1 ring-cyan-400/20" />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
