"use client"
import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2, Edit } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BASE_URL } from "@/config/api"

interface Resource {
  _id: string
  title: string
  category: string
  description: string
}
export function ResourcesManager() {
  const [resources, setResources] = useState<Resource[]>([])
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({ title: "", category: "coding", description: "" })
const [file, setFile] = useState<File | null>(null)
  // Fetch resources from backend
  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await fetch(`${BASE_URL}/resources`)
        const data = await res.json()
        setResources(data)
      } catch (err) {
        console.error("Failed to fetch resources", err)
      }
    }
    fetchResources()
  }, [])

  const handleAdd = async () => {
    try {
      const res = await fetch(`${BASE_URL}/resources`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const newResource = await res.json()
      setResources([...resources, newResource])
      setFormData({ title: "", category: "coding", description: "" })
      setIsAdding(false)
    } catch (err) {
      console.error("Failed to add resource", err)
    }
  }

  const handleUpdate = async () => {
  if (!editingId) return
  try {
    const form = new FormData()
    form.append("title", formData.title)
    form.append("category", formData.category)
    form.append("description", formData.description)
    if (file) form.append("file", file) // include file only if selected

    const res = await fetch(`${BASE_URL}/resources/${editingId}`, {
      method: "PUT",
      body: form, // do NOT set Content-Type
    })

    if (!res.ok) throw new Error("Failed to update resource")

    const updatedResource = await res.json()
    setResources(resources.map((r) => (r._id === editingId ? updatedResource.resource : r)))
    setEditingId(null)
    setFormData({ title: "", category: "coding", description: "" })
    setFile(null)
  } catch (err) {
    console.error("Failed to update resource", err)
  }
}

  const handleDelete = async (id: string) => {
    try {
      await fetch(`${BASE_URL}/resources/${id}`, { method: "DELETE" })
      setResources(resources.filter((r) => r._id !== id))
    } catch (err) {
      console.error("Failed to delete resource", err)
    }
  }

  const handleEdit = (resource: Resource) => {
    setEditingId(resource._id)
    setFormData({ title: resource.title, category: resource.category, description: resource.description })
  }

  const handleCancel = () => {
    setIsAdding(false)
    setEditingId(null)
    setFormData({ title: "", category: "coding", description: "" })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Manage Resources</h2>
        {!isAdding && !editingId && (
          <Button onClick={() => setIsAdding(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Resource
          </Button>
        )}
      </div>

      {(isAdding || editingId) && (
        <Card className="p-6">
          <h3 className="font-semibold mb-4">{editingId ? "Edit Resource" : "Add New Resource"}</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Resource title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="coding">Coding</SelectItem>
                  <SelectItem value="interview">Interview Prep</SelectItem>
                  <SelectItem value="backend">Backend</SelectItem>
                  <SelectItem value="cloud">Cloud</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description"
                rows={3}
              />
            </div>
            <div>
  <label className="block text-sm font-medium mb-2">File</label>
  <input
    type="file"
    onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
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
        {resources.map((resource) => (
          <Card key={resource._id} className="p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-semibold mb-1">{resource.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{resource.description}</p>
                <span className="inline-block px-2 py-0.5 bg-secondary text-secondary-foreground rounded text-xs">
                  {resource.category}
                </span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(resource)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDelete(resource._id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
