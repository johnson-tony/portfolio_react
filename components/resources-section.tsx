"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, FileText, BookOpen, Server, Cloud, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PDFViewer } from "./pdf-viewer"

interface Resource {
  id: string
  title: string
  category: "coding" | "interview" | "backend" | "cloud"
  description: string
  url?: string
}

const MOCK_RESOURCES: Resource[] = [
  {
    id: "1",
    title: "JavaScript Best Practices",
    category: "coding",
    description: "Comprehensive guide to modern JavaScript patterns and practices",
  },
  {
    id: "2",
    title: "System Design Interview Guide",
    category: "interview",
    description: "Preparation material for technical system design interviews",
  },
  {
    id: "3",
    title: "RESTful API Design",
    category: "backend",
    description: "Guidelines for designing scalable REST APIs",
  },
  {
    id: "4",
    title: "AWS Architecture Patterns",
    category: "cloud",
    description: "Common cloud architecture patterns and best practices",
  },
  {
    id: "5",
    title: "TypeScript Deep Dive",
    category: "coding",
    description: "Advanced TypeScript concepts and type system mastery",
  },
  {
    id: "6",
    title: "Behavioral Interview Framework",
    category: "interview",
    description: "STAR method and common behavioral questions guide",
  },
  {
    id: "7",
    title: "Database Optimization",
    category: "backend",
    description: "SQL query optimization and indexing strategies",
  },
  {
    id: "8",
    title: "Serverless Best Practices",
    category: "cloud",
    description: "Building scalable serverless applications on AWS Lambda",
  },
]

const CATEGORY_ICONS = {
  coding: FileText,
  interview: BookOpen,
  backend: Server,
  cloud: Cloud,
}

const CATEGORY_LABELS = {
  coding: "Coding",
  interview: "Interview Prep",
  backend: "Backend",
  cloud: "Cloud",
}

export function ResourcesSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [viewingResource, setViewingResource] = useState<Resource | null>(null)
  const [readingProgress, setReadingProgress] = useState<Record<string, { page: number; lastAccessed: string }>>({})

  // Load reading progress from localStorage
  useEffect(() => {
    const progress: Record<string, { page: number; lastAccessed: string }> = {}
    MOCK_RESOURCES.forEach((resource) => {
      const saved = localStorage.getItem(`pdf-progress-${resource.id}`)
      if (saved) {
        progress[resource.id] = JSON.parse(saved)
      }
    })
    setReadingProgress(progress)
  }, [])

  const filteredResources = MOCK_RESOURCES.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getProgressText = (resourceId: string) => {
    const progress = readingProgress[resourceId]
    if (progress) {
      return `Page ${progress.page}`
    }
    return "Not started"
  }

  const handleOpenResource = (resource: Resource) => {
    setViewingResource(resource)
  }

  const handleCloseViewer = () => {
    setViewingResource(null)
    // Reload progress after closing viewer
    const progress: Record<string, { page: number; lastAccessed: string }> = {}
    MOCK_RESOURCES.forEach((resource) => {
      const saved = localStorage.getItem(`pdf-progress-${resource.id}`)
      if (saved) {
        progress[resource.id] = JSON.parse(saved)
      }
    })
    setReadingProgress(progress)
  }

  return (
    <>
      <section id="resources" className="border-t border-border bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight mb-2">Resources</h2>
            <p className="text-muted-foreground">Technical documents and guides organized by category</p>
          </div>

          <div className="space-y-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("all")}
              >
                All
              </Button>
              {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                <Button
                  key={key}
                  variant={selectedCategory === key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(key)}
                >
                  {label}
                </Button>
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredResources.map((resource) => {
                const Icon = CATEGORY_ICONS[resource.category]
                const progress = readingProgress[resource.id]
                return (
                  <Card
                    key={resource.id}
                    className="p-4 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => handleOpenResource(resource)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                          <Icon className="h-5 w-5 text-accent" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium mb-1 text-sm">{resource.title}</h3>
                        <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{resource.description}</p>
                        <div className="flex items-center justify-between gap-2">
                          <span className="inline-block px-2 py-0.5 bg-secondary text-secondary-foreground rounded text-xs">
                            {CATEGORY_LABELS[resource.category]}
                          </span>
                          {progress && (
                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {getProgressText(resource.id)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>

            {filteredResources.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No resources found matching your criteria</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {viewingResource && (
        <PDFViewer resourceId={viewingResource.id} title={viewingResource.title} onClose={handleCloseViewer} />
      )}
    </>
  )
}
