"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Save } from "lucide-react"
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

export function ProfileManager() {
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
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")

  // Load profile from backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${BASE_URL}/profile`)
        if (!res.ok) throw new Error("Failed to fetch profile")
        const data = await res.json()
        setProfile(data)
      } catch (err) {
        console.error(err)
        setMessage("Failed to load profile")
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      const res = await fetch(`${BASE_URL}/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      })
      if (!res.ok) throw new Error("Failed to save profile")
      setMessage("Profile saved successfully!")
      setTimeout(() => setMessage(""), 3000)
    } catch (err) {
      console.error(err)
      setMessage("Failed to save profile")
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p>Loading profile...</p>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Profile Settings</h2>
        <Button onClick={handleSave} disabled={saving}>
          <Save className="h-4 w-4 mr-2" />
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      {message && <p className="text-sm text-accent">{message}</p>}

      <Card className="p-6">
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <Input
                value={profile.fullName}
                onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Role</label>
              <Input
                value={profile.role}
                onChange={(e) => setProfile({ ...profile, role: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">About Me</label>
            <Textarea
              value={profile.about}
              onChange={(e) => setProfile({ ...profile, about: e.target.value })}
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Current Focus</label>
            <Input
              value={profile.currentFocus}
              onChange={(e) => setProfile({ ...profile, currentFocus: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Skills & Technologies</label>
            <Textarea
              value={profile.skills}
              onChange={(e) => setProfile({ ...profile, skills: e.target.value })}
              rows={2}
            />
          </div>

          <div className="border-t border-border pt-6">
            <h3 className="font-semibold mb-4">Contact Links</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">LinkedIn URL</label>
                <Input
                  value={profile.linkedin}
                  onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">GitHub URL</label>
                <Input
                  value={profile.github}
                  onChange={(e) => setProfile({ ...profile, github: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
