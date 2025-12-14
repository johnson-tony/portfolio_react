"use client"

import { X, Mail, Linkedin, Github } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProfilePanelProps {
  open: boolean
  onClose: () => void
}

export function ProfilePanel({ open, onClose }: ProfilePanelProps) {
  if (!open) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50" onClick={onClose} />

      {/* Panel */}
      <div className="fixed top-0 right-0 bottom-0 w-full sm:w-96 bg-card border-l border-border z-50 overflow-y-auto">
        <div className="p-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                JMT
              </div>
              <div>
                <h2 className="font-semibold text-lg">Johnson Maria Tony</h2>
                <p className="text-sm text-muted-foreground">Full-stack Developer</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-3">About Me</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                  I specialize in building modern web applications using Angular, Python, SQL, and AWS. My work focuses
                  on creating scalable, efficient solutions that solve real problems.
                </p>
                <div>
                  <p className="text-foreground font-medium mb-2">Current Focus:</p>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>Web applications</li>
                    <li>Cloud solutions</li>
                    <li>Developer tools</li>
                  </ul>
                </div>
                <p>
                  I believe in writing clean, maintainable code and continuously learning new technologies to stay at
                  the forefront of web development.
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-3">Technologies & Skills</h3>
              <div className="flex flex-wrap gap-2">
                {["Angular", "Python", "SQL", "AWS", "TypeScript", "Node.js", "Docker", "Git"].map((tech) => (
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
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted transition-colors"
                >
                  <Linkedin className="h-5 w-5 text-accent" />
                  <div>
                    <p className="text-sm font-medium">LinkedIn</p>
                    <p className="text-xs text-muted-foreground">Professional network</p>
                  </div>
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted transition-colors"
                >
                  <Github className="h-5 w-5 text-accent" />
                  <div>
                    <p className="text-sm font-medium">GitHub</p>
                    <p className="text-xs text-muted-foreground">Code repositories</p>
                  </div>
                </a>
                <a
                  href="mailto:johnson@example.com"
                  className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted transition-colors"
                >
                  <Mail className="h-5 w-5 text-accent" />
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-xs text-muted-foreground">johnson@example.com</p>
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
