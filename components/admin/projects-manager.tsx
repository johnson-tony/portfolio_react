"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2, Edit } from "lucide-react"
import { BASE_URL } from "@/config/api"

interface Project {
  _id: string
  title: string
  problem: string
  decision: string
  tradeoff: string
  outcome: string
}

export function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    problem: "",
    decision: "",
    tradeoff: "",
    outcome: "",
  })

  // Fetch projects from backend on load
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${BASE_URL}/projects`)
        const data = await res.json()
        setProjects(data)
      } catch (err) {
        console.error("Failed to fetch projects", err)
      }
    }
    fetchProjects()
  }, [])

  // Add new project
  const handleAdd = async () => {
    try {
      const res = await fetch(`${BASE_URL}/projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const newProject = await res.json()
      setProjects([...projects, newProject])
      setFormData({ title: "", problem: "", decision: "", tradeoff: "", outcome: "" })
      setIsAdding(false)
    } catch (err) {
      console.error("Failed to add project", err)
    }
  }

  // Update existing project
  const handleUpdate = async () => {
    if (!editingId) return
    try {
      const res = await fetch(`${BASE_URL}/projects/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const updatedProject = await res.json()
      setProjects(projects.map((p) => (p._id === editingId ? updatedProject : p)))
      setEditingId(null)
      setFormData({ title: "", problem: "", decision: "", tradeoff: "", outcome: "" })
    } catch (err) {
      console.error("Failed to update project", err)
    }
  }

  // Delete project
  const handleDelete = async (id: string) => {
    try {
      await fetch(`${BASE_URL}/projects/${id}`, { method: "DELETE" })
      setProjects(projects.filter((p) => p._id !== id))
    } catch (err) {
      console.error("Failed to delete project", err)
    }
  }

  const handleEdit = (project: Project) => {
    setEditingId(project._id)
    setFormData({
      title: project.title,
      problem: project.problem,
      decision: project.decision,
      tradeoff: project.tradeoff,
      outcome: project.outcome,
    })
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
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Project title"
            />
            <Textarea
              value={formData.problem}
              onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
              placeholder="Problem"
              rows={2}
            />
            <Textarea
              value={formData.decision}
              onChange={(e) => setFormData({ ...formData, decision: e.target.value })}
              placeholder="Decision"
              rows={2}
            />
            <Textarea
              value={formData.tradeoff}
              onChange={(e) => setFormData({ ...formData, tradeoff: e.target.value })}
              placeholder="Trade-offs"
              rows={2}
            />
            <Textarea
              value={formData.outcome}
              onChange={(e) => setFormData({ ...formData, outcome: e.target.value })}
              placeholder="Outcome"
              rows={2}
            />

            <div className="flex gap-2">
              <Button onClick={editingId ? handleUpdate : handleAdd}>{editingId ? "Update" : "Add"}</Button>
              <Button variant="outline" onClick={handleCancel}>Cancel</Button>
            </div>
          </div>
        </Card>
      )}

      <div className="grid gap-4">
        {projects.map((project) => (
          <Card key={project._id} className="p-4">
            <div className="flex items-start justify-between gap-4 mb-4">
              <h3 className="font-semibold text-lg">{project.title}</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(project)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDelete(project._id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div><span className="font-medium text-accent">Problem:</span> {project.problem}</div>
              <div><span className="font-medium text-accent">Decision:</span> {project.decision}</div>
              <div><span className="font-medium text-accent">Trade-offs:</span> {project.tradeoff}</div>
              <div><span className="font-medium text-accent">Outcome:</span> {project.outcome}</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
