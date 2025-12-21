"use client"

import { useState, useEffect } from "react"
import { X, Mail, Linkedin, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BASE_URL } from "@/config/api"
import Image from "next/image"

interface Profile {
  fullName: string
  role: string
  about: string
  currentFocus: string // comma-separated
  skills: string       // comma-separated
  linkedin: string
  github: string
  email: string
}

interface ProfilePanelProps {
  open: boolean
  onClose: () => void
}

export function ProfilePanel({ open, onClose }: ProfilePanelProps) {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!open) return

    const fetchProfile = async () => {
      setLoading(true)
      try {
        const res = await fetch(`${BASE_URL}/profile`)
        const data: Profile | null = await res.json()
        setProfile(
          data || {
            fullName: "",
            role: "",
            about: "",
            currentFocus: "",
            skills: "",
            linkedin: "",
            github: "",
            email: "",
          }
        )
      } catch (err) {
        console.error("Failed to load profile", err)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [open])

  if (!open) return null

  if (loading || !profile) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm text-white">
        Loading...
      </div>
    )
  }

  const focusList = profile.currentFocus
    ? profile.currentFocus.split(",").map((v) => v.trim())
    : []

  const skillsList = profile.skills
    ? profile.skills.split(",").map((v) => v.trim())
    : []

  const initials =
    profile.fullName
      ?.split(" ")
      .map((n) => n[0])
      .join("") || "U"

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed top-0 right-0 bottom-0 w-full sm:w-96 bg-[#0b1220] border-l border-gray-700 z-50 overflow-y-auto shadow-2xl transition-transform transform translate-x-0">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 relative rounded-full overflow-hidden">
  <Image
    src={"/john1.jpeg"} // fallback if no image
    alt={"Profile"}
    fill
    className="object-cover"
  />
</div>
              <div>
                <h2 className="text-lg font-semibold text-white">
                  {profile.fullName || "Your Name"}
                </h2>
                <p className="text-sm text-cyan-300">{profile.role || "Your Role"}</p>
              </div>
            </div>

            <Button variant="ghost" size="icon" onClick={onClose} className="text-cyan-400 hover:text-cyan-300">
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* About Section */}
          <div className="space-y-3">
            <h3 className="text-md font-semibold text-white">About Me</h3>
            <p className="text-sm text-gray-300 leading-relaxed">{profile.about}</p>

            {focusList.length > 0 && (
              <>
                <h4 className="text-sm font-medium text-cyan-300">Current Focus</h4>
                <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                  {focusList.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </>
            )}
          </div>

          {/* Skills Section */}
          {skillsList.length > 0 && (
            <div>
              <h3 className="text-md font-semibold text-white mb-2">Technologies & Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skillsList.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-md text-xs font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Contact Section */}
          <div>
            <h3 className="text-md font-semibold text-white mb-2">Connect</h3>
            <div className="flex flex-col gap-2">
              {profile.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-2 rounded-lg border border-gray-700 hover:bg-gray-800 transition"
                >
                  <Linkedin className="h-5 w-5 text-cyan-400" />
                  <span className="text-sm text-gray-200 font-medium">LinkedIn</span>
                </a>
              )}
              {profile.github && (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-2 rounded-lg border border-gray-700 hover:bg-gray-800 transition"
                >
                  <Github className="h-5 w-5 text-cyan-400" />
                  <span className="text-sm text-gray-200 font-medium">GitHub</span>
                </a>
              )}
              {profile.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-3 p-2 rounded-lg border border-gray-700 hover:bg-gray-800 transition"
                >
                  <Mail className="h-5 w-5 text-cyan-400" />
                  <span className="text-sm text-gray-200 font-medium">{profile.email}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
