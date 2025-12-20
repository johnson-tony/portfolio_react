"use client"

import { useState, useEffect } from "react"
import { X, Mail, Linkedin, Github } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Profile {
  fullName: string
  role: string
  about: string
  currentFocus: string[]
  skills: string[]
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

  useEffect(() => {
    if (!open) return
    fetch("/api/profile") // replace with your backend endpoint
      .then((res) => res.json())
      .then((data) => setProfile(data))
      .catch(console.error)
  }, [open])

  if (!open) return null
  if (!profile) return <div className="fixed inset-0 flex items-center justify-center">Loading...</div>

  return (
    <>
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50" onClick={onClose} />
      <div className="fixed top-0 right-0 bottom-0 w-full sm:w-96 bg-card border-l border-border z-50 overflow-y-auto">
        <div className="p-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                {profile.fullName.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <h2 className="font-semibold text-lg">{profile.fullName}</h2>
                <p className="text-sm text-muted-foreground">{profile.role}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-3">About Me</h3>
              <p className="text-sm text-muted-foreground">{profile.about}</p>
              <div>
                <p className="text-foreground font-medium mb-2">Current Focus:</p>
                <ul className="space-y-1 list-disc list-inside">
                  {profile.currentFocus.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-3">Technologies & Skills</h3>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-secondary text-secondary-foreground rounded-md text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-3">Connect</h3>
              <div className="space-y-2">
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted transition-colors">
                  <Linkedin className="h-5 w-5 text-accent" />
                  <div>
                    <p className="text-sm font-medium">LinkedIn</p>
                    <p className="text-xs text-muted-foreground">Professional network</p>
                  </div>
                </a>
                <a href={profile.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted transition-colors">
                  <Github className="h-5 w-5 text-accent" />
                  <div>
                    <p className="text-sm font-medium">GitHub</p>
                    <p className="text-xs text-muted-foreground">Code repositories</p>
                  </div>
                </a>
                <a href={`mailto:${profile.email}`} className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted transition-colors">
                  <Mail className="h-5 w-5 text-accent" />
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-xs text-muted-foreground">{profile.email}</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
