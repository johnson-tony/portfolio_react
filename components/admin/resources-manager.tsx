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
  fileUrl?: string | null
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
        // Ensure always an array and filter out invalid entries
        setResources(Array.isArray(data) ? data.filter(r => r && r._id) : [])
      } catch (err) {
        console.error("Failed to fetch resources", err)
      }
    }
    fetchResources()
  }, [])

  const handleAdd = async () => {
    try {
      const form = new FormData()
      form.append("title", formData.title)
      form.append("category", formData.category)
      form.append("description", formData.description)
      if (file) form.append("file", file)

      const res = await fetch(`${BASE_URL}/resources`, {
        method: "POST",
        body: form,
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message || "Failed to add resource")

      setResources(prev => [...prev, data])
      setFormData({ title: "", category: "coding", description: "" })
      setFile(null)
      setIsAdding(false)
    } catch (err) {
      console.error(err)
    }
  }

  const handleUpdate = async () => {
    if (!editingId) return
    try {
      const form = new FormData()
      form.append("title", formData.title)
      form.append("category", formData.category)
      form.append("description", formData.description)
      if (file) form.append("file", file)

      const res = await fetch(`${BASE_URL}/resources/${editingId}`, {
        method: "PUT",
        body: form,
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message || "Failed to update resource")

      setResources(prev => prev.map(r => (r._id === editingId ? data : r)))
      setEditingId(null)
      setFormData({ title: "", category: "coding", description: "" })
      setFile(null)
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await fetch(`${BASE_URL}/resources/${id}`, { method: "DELETE" })
      setResources(prev => prev.filter(r => r._id !== id))
    } catch (err) {
      console.error("Failed to delete resource", err)
    }
  }

  const handleEdit = (resource: Resource) => {
    setEditingId(resource._id)
    setFormData({
      title: resource.title || "",
      category: resource.category || "coding",
      description: resource.description || "",
    })
  }

  const handleCancel = () => {
    setIsAdding(false)
    setEditingId(null)
    setFormData({ title: "", category: "coding", description: "" })
    setFile(null)
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
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                placeholder="Resource title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <Select value={formData.category} onValueChange={value => setFormData({ ...formData, category: value })}>
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
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">File</label>
              <input
                type="file"
                onChange={e => setFile(e.target.files ? e.target.files[0] : null)}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={editingId ? handleUpdate : handleAdd}>
                {editingId ? "Update" : "Add"}
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      <div className="grid gap-4">
        {resources.map(resource =>
          resource ? (
            <Card key={resource._id} className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{resource.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{resource.description}</p>
                  <span className="inline-block px-2 py-0.5 bg-secondary text-secondary-foreground rounded text-xs">
                    {resource.category}
                  </span>
                  {resource.fileUrl && (
                    <div className="mt-2">
                      <a
                        href={`${BASE_URL}${resource.fileUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline text-sm"
                      >
                        View File
                      </a>
                    </div>
                  )}
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
          ) : null
        )}
      </div>
    </div>
  )
}
