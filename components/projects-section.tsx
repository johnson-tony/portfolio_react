"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { ArrowUpRight } from "lucide-react"
import { BASE_URL } from "@/config/api"

interface Project {
  _id: string
  title: string
  problem: string
  decision: string
  tradeoff: string
  outcome: string
}

export function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${BASE_URL}/projects`)
        if (!res.ok) throw new Error("Failed to fetch projects")
        const data: Project[] = await res.json()
        setProjects(data)
      } catch (err: any) {
        setError(err.message || "Something went wrong")
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  if (loading)
    return <p className="text-center py-12 text-cyan-400">Loading projects...</p>
  if (error)
    return <p className="text-center py-12 text-red-500">{error}</p>

  return (
    <section
  id="projects"
  className="border-t border-gray-700 bg-[#0b1220] relative overflow-hidden"
>
  {/* Optional subtle gradient overlay */}
  <div className="absolute inset-0 bg-gradient-to-b from-[#0b1220]/40 to-[#0b1220]/0 pointer-events-none" />

  <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-12 ">
    {/* Header */}
    <div className="mb-12 text-center">
      <h2 className="text-4xl font-bold tracking-tight text-white mb-2">
        Projects
      </h2>
      <p className="text-gray-400 max-w-2xl mx-auto">
        Key projects with technical decisions, trade-offs, and outcomes.
      </p>
    </div>

    {/* Horizontal scroll wrapper */}
    <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory">
      {projects.map((project) => (
        <Card
          key={project._id}
          className="flex-shrink-0 w-[300px] sm:w-[320px] md:w-[360px] lg:w-[380px] p-6 bg-gradient-to-br from-gray-900/70 via-gray-800/50 to-gray-900/70 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300 snap-start"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-cyan-400">
              {project.title}
            </h3>
            <ArrowUpRight className="h-5 w-5 text-cyan-400" />
          </div>

          {/* Details */}
          <div className="space-y-3">
            <div>
              <h4 className="text-sm font-medium text-cyan-300 mb-1">Problem</h4>
              <p className="text-gray-300 text-sm">{project.problem}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-cyan-300 mb-1">Decision</h4>
              <p className="text-gray-300 text-sm">{project.decision}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-cyan-300 mb-1">Trade-offs</h4>
              <p className="text-gray-300 text-sm">{project.tradeoff}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-cyan-300 mb-1">Outcome</h4>
              <p className="text-gray-300 text-sm">{project.outcome}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>

    {projects.length === 0 && (
      <div className="text-center py-12">
        <p className="text-gray-400">No projects found</p>
      </div>
    )}
  </div>
</section>

  )
}
