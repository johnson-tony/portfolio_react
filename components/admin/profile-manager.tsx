"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Save } from "lucide-react"
import { BASE_URL } from "@/config/api"

/* ---------------- TYPES ---------------- */

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

interface InputBlockProps {
  label: string
  value: string
  type?: string
  onChange: (value: string) => void
}

interface TextBlockProps {
  label: string
  value: string
  rows?: number
  onChange: (value: string) => void
}

/* ---------------- HELPERS ---------------- */

function InputBlock({
  label,
  value,
  onChange,
  type = "text",
}: InputBlockProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">{label}</label>
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

function TextBlock({
  label,
  value,
  rows = 3,
  onChange,
}: TextBlockProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">{label}</label>
      <Textarea
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

/* ---------------- MAIN COMPONENT ---------------- */

export function ProfileManager() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")

  /* -------- FETCH PROFILE -------- */

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${BASE_URL}/profile`)
        const data = await res.json()

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
      } catch (error) {
        console.error("Failed to fetch profile", error)
        setProfile({
          fullName: "",
          role: "",
          about: "",
          currentFocus: "",
          skills: "",
          linkedin: "",
          github: "",
          email: "",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  /* -------- SAVE PROFILE -------- */

  const handleSave = async () => {
    if (!profile) return
    setSaving(true)

    try {
      const res = await fetch(`${BASE_URL}/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      })

      if (!res.ok) throw new Error("Save failed")

      setMessage("Profile saved successfully ✅")
      setTimeout(() => setMessage(""), 3000)
    } catch (error) {
      console.error("Save error", error)
      setMessage("Failed to save profile ❌")
    } finally {
      setSaving(false)
    }
  }

  /* -------- UI STATES -------- */

  if (loading || !profile) {
    return <p className="text-sm text-muted-foreground">Loading profile...</p>
  }

  /* -------- RENDER -------- */

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Profile Settings</h2>
        <Button onClick={handleSave} disabled={saving}>
          <Save className="h-4 w-4 mr-2" />
          {saving ? "Saving..." : "Save"}
        </Button>
      </div>

      {message && <p className="text-sm text-accent">{message}</p>}

      <Card className="p-6 space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <InputBlock
            label="Full Name"
            value={profile.fullName}
            onChange={(v) => setProfile({ ...profile, fullName: v })}
          />

          <InputBlock
            label="Role"
            value={profile.role}
            onChange={(v) => setProfile({ ...profile, role: v })}
          />
        </div>

        <TextBlock
          label="About Me"
          value={profile.about}
          rows={4}
          onChange={(v) => setProfile({ ...profile, about: v })}
        />

        <InputBlock
          label="Current Focus"
          value={profile.currentFocus}
          onChange={(v) => setProfile({ ...profile, currentFocus: v })}
        />

        <TextBlock
          label="Skills & Technologies"
          value={profile.skills}
          rows={2}
          onChange={(v) => setProfile({ ...profile, skills: v })}
        />

        <div className="border-t pt-6 space-y-4">
          <h3 className="font-semibold">Contact Links</h3>

          <InputBlock
            label="LinkedIn"
            value={profile.linkedin}
            onChange={(v) => setProfile({ ...profile, linkedin: v })}
          />

          <InputBlock
            label="GitHub"
            value={profile.github}
            onChange={(v) => setProfile({ ...profile, github: v })}
          />

          <InputBlock
            label="Email"
            type="email"
            value={profile.email}
            onChange={(v) => setProfile({ ...profile, email: v })}
          />
        </div>
      </Card>
    </div>
  )
}
