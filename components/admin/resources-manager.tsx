"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2, Edit } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Resource {
  id: string
  title: string
  category: string
  description: string
}

const MOCK_RESOURCES: Resource[] = [
  { id: "1", title: "JavaScript Best Practices", category: "coding", description: "Modern JS patterns" },
  { id: "2", title: "System Design Guide", category: "interview", description: "System design prep" },
]

export function ResourcesManager() {
  const [resources, setResources] = useState<Resource[]>(MOCK_RESOURCES)
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({ title: "", category: "coding", description: "" })

  const handleAdd = () => {
    const newResource: Resource = {
      id: Date.now().toString(),
      ...formData,
    }
    setResources([...resources, newResource])
    setFormData({ title: "", category: "coding", description: "" })
    setIsAdding(false)
  }

  const handleDelete = (id: string) => {
    setResources(resources.filter((r) => r.id !== id))
  }

  const handleEdit = (resource: Resource) => {
    setEditingId(resource.id)
    setFormData({ title: resource.title, category: resource.category, description: resource.description })
  }

  const handleUpdate = () => {
    setResources(resources.map((r) => (r.id === editingId ? { ...r, ...formData } : r)))
    setEditingId(null)
    setFormData({ title: "", category: "coding", description: "" })
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
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
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
          <Card key={resource.id} className="p-4">
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
                <Button variant="outline" size="sm" onClick={() => handleDelete(resource.id)}>
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
