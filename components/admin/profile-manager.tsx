"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Save } from "lucide-react"

export function ProfileManager() {
  const [profile, setProfile] = useState({
    fullName: "Johnson Maria Tony",
    role: "Full-stack Developer",
    about: "I specialize in building modern web applications using Angular, Python, SQL, and AWS.",
    currentFocus: "Web applications, Cloud solutions, Developer tools",
    skills: "Angular, Python, SQL, AWS, TypeScript, Node.js, Docker, Git",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    email: "johnson@example.com",
  })

  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    // In production, this would save to a database
    localStorage.setItem("admin-profile", JSON.stringify(profile))
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Profile Settings</h2>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          {saved ? "Saved!" : "Save Changes"}
        </Button>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <Input
                value={profile.fullName}
                onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                placeholder="Your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Role</label>
              <Input
                value={profile.role}
                onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                placeholder="Your role/title"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">About Me</label>
            <Textarea
              value={profile.about}
              onChange={(e) => setProfile({ ...profile, about: e.target.value })}
              placeholder="Brief introduction"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Current Focus</label>
            <Input
              value={profile.currentFocus}
              onChange={(e) => setProfile({ ...profile, currentFocus: e.target.value })}
              placeholder="What you're currently working on"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Skills & Technologies</label>
            <Textarea
              value={profile.skills}
              onChange={(e) => setProfile({ ...profile, skills: e.target.value })}
              placeholder="Comma-separated list of skills"
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
                  placeholder="https://linkedin.com/in/..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">GitHub URL</label>
                <Input
                  value={profile.github}
                  onChange={(e) => setProfile({ ...profile, github: e.target.value })}
                  placeholder="https://github.com/..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  placeholder="your@email.com"
                />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
