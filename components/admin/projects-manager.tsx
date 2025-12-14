"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2, Edit } from "lucide-react"

interface Project {
  id: string
  title: string
  problem: string
  decision: string
  tradeoff: string
  outcome: string
}

const MOCK_PROJECTS: Project[] = [
  {
    id: "1",
    title: "Cloud Migration Platform",
    problem: "Legacy infrastructure issues",
    decision: "Containerized microservices on AWS",
    tradeoff: "Initial time vs long-term flexibility",
    outcome: "60% cost reduction",
  },
]

export function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS)
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    problem: "",
    decision: "",
    tradeoff: "",
    outcome: "",
  })

  const handleAdd = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      ...formData,
    }
    setProjects([...projects, newProject])
    setFormData({ title: "", problem: "", decision: "", tradeoff: "", outcome: "" })
    setIsAdding(false)
  }

  const handleDelete = (id: string) => {
    setProjects(projects.filter((p) => p.id !== id))
  }

  const handleEdit = (project: Project) => {
    setEditingId(project.id)
    setFormData({
      title: project.title,
      problem: project.problem,
      decision: project.decision,
      tradeoff: project.tradeoff,
      outcome: project.outcome,
    })
  }

  const handleUpdate = () => {
    setProjects(projects.map((p) => (p.id === editingId ? { ...p, ...formData } : p)))
    setEditingId(null)
    setFormData({ title: "", problem: "", decision: "", tradeoff: "", outcome: "" })
  }

  const handleCancel = () => {
    setIsAdding(false)
    setEditingId(null)
    setFormData({ title: "", problem: "", decision: "", tradeoff: "", outcome: "" })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Manage Projects</h2>
        {!isAdding && !editingId && (
          <Button onClick={() => setIsAdding(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Project
          </Button>
        )}
      </div>

      {(isAdding || editingId) && (
        <Card className="p-6">
          <h3 className="font-semibold mb-4">{editingId ? "Edit Project" : "Add New Project"}</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Project title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Problem</label>
              <Textarea
                value={formData.problem}
                onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                placeholder="What problem did this project solve?"
                rows={2}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Decision</label>
              <Textarea
                value={formData.decision}
                onChange={(e) => setFormData({ ...formData, decision: e.target.value })}
                placeholder="What technical decisions were made?"
                rows={2}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Trade-offs</label>
              <Textarea
                value={formData.tradeoff}
                onChange={(e) => setFormData({ ...formData, tradeoff: e.target.value })}
                placeholder="What trade-offs were considered?"
                rows={2}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Outcome</label>
              <Textarea
                value={formData.outcome}
                onChange={(e) => setFormData({ ...formData, outcome: e.target.value })}
                placeholder="What was the result?"
                rows={2}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={editingId ? handleUpdate : handleAdd}>{editingId ? "Update" : "Add"}</Button>
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      <div className="grid gap-4">
        {projects.map((project) => (
          <Card key={project.id} className="p-4">
            <div className="flex items-start justify-between gap-4 mb-4">
              <h3 className="font-semibold text-lg">{project.title}</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(project)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDelete(project.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium text-accent">Problem:</span> {project.problem}
              </div>
              <div>
                <span className="font-medium text-accent">Decision:</span> {project.decision}
              </div>
              <div>
                <span className="font-medium text-accent">Trade-offs:</span> {project.tradeoff}
              </div>
              <div>
                <span className="font-medium text-accent">Outcome:</span> {project.outcome}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
