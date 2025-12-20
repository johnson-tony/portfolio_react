"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, FileText, BookOpen, Server, Cloud, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PDFViewer } from "./pdf-viewer"
import { BASE_URL } from "@/config/api"

interface Resource {
  _id: string
  title: string
  category: "coding" | "interview" | "backend" | "cloud"
  description: string
  fileUrl?: string
}

const CATEGORY_ICONS = { coding: FileText, interview: BookOpen, backend: Server, cloud: Cloud }
const CATEGORY_LABELS = { coding: "Coding", interview: "Interview Prep", backend: "Backend", cloud: "Cloud" }

export function ResourcesSection() {
  const [resources, setResources] = useState<Resource[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [viewingResource, setViewingResource] = useState<Resource | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await fetch(`${BASE_URL}/resources`)
        if (!res.ok) throw new Error("Failed to fetch resources")
        const data: Resource[] = await res.json()
        setResources(data)
      } catch (err: any) {
        setError(err.message || "Something went wrong")
      } finally {
        setLoading(false)
      }
    }
    fetchResources()
  }, [])

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleOpenResource = (resource: Resource) => setViewingResource(resource)
  const handleCloseViewer = () => setViewingResource(null)

  if (loading) return <p className="text-center py-12">Loading resources...</p>
  if (error) return <p className="text-center py-12 text-red-500">{error}</p>

  return (
    <>
      <section id="resources" className="border-t border-border bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="mb-8">
            <h2 className="text-lg sm:text-3xl  font-bold tracking-tight mb-2">Resources</h2>
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
                return (
                  <Card
                    key={resource._id}
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
                        <span className="inline-block px-2 py-0.5 bg-secondary text-secondary-foreground rounded text-xs">
                          {CATEGORY_LABELS[resource.category]}
                        </span>
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
        <PDFViewer resourceId={viewingResource._id} title={viewingResource.title} onClose={handleCloseViewer} />
      )}
    </>
  )
}
