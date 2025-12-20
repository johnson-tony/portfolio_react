"use client"

import { useState, useEffect } from "react"
import { X, Mail, Linkedin, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BASE_URL } from "@/config/api"

interface Profile {
  fullName: string
  role: string
  about: string
  currentFocus: string // stored as comma-separated string
  skills: string       // stored as comma-separated string
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
      <div className="fixed inset-0 flex items-center justify-center z-50">
        Loading...
      </div>
    )
  }

  // Convert comma-separated strings → arrays
  const focusList = profile.currentFocus
    ? profile.currentFocus.split(",").map((v: string) => v.trim())
    : []

  const skillsList = profile.skills
    ? profile.skills.split(",").map((v: string) => v.trim())
    : []

  const initials =
    profile.fullName
      ?.split(" ")
      .map((n) => n[0])
      .join("") || "U"

  return (
    <>
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
        onClick={onClose}
      />

      <div className="fixed top-0 right-0 bottom-0 w-full sm:w-96 bg-card border-l border-border z-50 overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                {initials}
              </div>
              <div>
                <h2 className="font-semibold text-md">
                  {profile.fullName || "Your Name"}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {profile.role || "Your Role"}
                </p>
              </div>
            </div>

            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Content */}
          <div className="space-y-6">
            {/* About */}
            <div>
              <h3 className="font-medium mb-1">About Me</h3>
              <p className="text-sm text-muted-foreground mb-3">
                {profile.about}
              </p>

              {focusList.length > 0 && (
                <>
                  <p className="font-medium mb-1">Current Focus</p>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    {focusList.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            {/* Skills */}
            {skillsList.length > 0 && (
              <div>
                <h3 className="font-medium mb-2">Technologies & Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {skillsList.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-secondary text-secondary-foreground rounded-md text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Contact */}
            <div>
              <h3 className="font-medium mb-2">Connect</h3>
              <div className="space-y-2">
                {profile.linkedin && (
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-2 rounded-lg border hover:bg-muted"
                  >
                    <Linkedin className="h-5 w-5 text-accent" />
                    <span className="text-sm font-medium">LinkedIn</span>
                  </a>
                )}

                {profile.github && (
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-2 rounded-lg border hover:bg-muted"
                  >
                    <Github className="h-5 w-5 text-accent" />
                    <span className="text-sm font-medium">GitHub</span>
                  </a>
                )}

                {profile.email && (
                  <a
                    href={`mailto:${profile.email}`}
                    className="flex items-center gap-3 p-2 rounded-lg border hover:bg-muted"
                  >
                    <Mail className="h-5 w-5 text-accent" />
                    <span className="text-sm font-medium">{profile.email}</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
