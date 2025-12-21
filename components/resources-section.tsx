"use client"

import dynamic from "next/dynamic"
import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, BookOpen, Server, Cloud } from "lucide-react"
import { BASE_URL } from "@/config/api"

// ✅ Dynamic import of PDFViewer with props type
const PDFViewer = dynamic<{
  resourceId: string
  fileUrl: string
  title: string
  onClose: () => void
}>(() => import("./pdf-viewer"), { ssr: false })

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

  const filteredResources = resources.filter(
    (r) => selectedCategory === "all" || r.category === selectedCategory
  )

  const handleOpenResource = (resource: Resource) => {
    if (!resource.fileUrl) {
      alert("No file uploaded for this resource")
      return
    }
    // ✅ Pass full URL here
    setViewingResource({ ...resource, fileUrl: `${BASE_URL}${resource.fileUrl}` })
  }
  const handleCloseViewer = () => setViewingResource(null)

  if (loading) return <p className="text-center py-12 text-gray-300">Loading resources...</p>
  if (error) return <p className="text-center py-12 text-red-500">{error}</p>

  return (
    <>
      <section id="resources" className="border-t border-gray-700 bg-[#0b1220]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-2 text-white">Resources</h2>
            <p className="text-gray-400">Technical documents and guides organized by category</p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
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

          {/* Resource Cards */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredResources.map((resource) => {
              const Icon = CATEGORY_ICONS[resource.category]
              return (
                <Card
                  key={resource._id}
                  className="p-4 hover:shadow-lg transition-shadow cursor-pointer bg-slate-900 border border-gray-700"
                  onClick={() => handleOpenResource(resource)}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10">
                        <Icon className="h-5 w-5 text-cyan-400" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium mb-1 text-white text-sm">{resource.title}</h3>
                      <p className="text-gray-400 text-xs mb-2 line-clamp-2">{resource.description}</p>
                      <span className="inline-block px-2 py-0.5 bg-cyan-500/10 text-cyan-400 rounded text-xs">
                        {CATEGORY_LABELS[resource.category]}
                      </span>
                    </div>
                  </div>
                </Card>
              )
            })}

            {filteredResources.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400">No resources found in this category</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* PDF Viewer */}
      {viewingResource && (
        <PDFViewer
          resourceId={viewingResource._id}
          fileUrl={viewingResource.fileUrl!}
          title={viewingResource.title}
          onClose={handleCloseViewer}
        />
      )}
    </>
  )
}
