"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2, Mail } from "lucide-react"

interface Message {
  id: string
  email: string
  message: string
  timestamp: string
  read: boolean
}

export function MessagesManager() {
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    // Load messages from localStorage
    const saved = localStorage.getItem("contact-messages")
    if (saved) {
      try {
        setMessages(JSON.parse(saved))
      } catch {
        setMessages([])
      }
    }
  }, [])

  const handleDelete = (id: string) => {
    const updated = messages.filter((m) => m.id !== id)
    setMessages(updated)
    localStorage.setItem("contact-messages", JSON.stringify(updated))
  }

  const handleMarkRead = (id: string) => {
    const updated = messages.map((m) => (m.id === id ? { ...m, read: true } : m))
    setMessages(updated)
    localStorage.setItem("contact-messages", JSON.stringify(updated))
  }

  const unreadCount = messages.filter((m) => !m.read).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Contact Messages</h2>
          {unreadCount > 0 && (
            <p className="text-sm text-muted-foreground mt-1">
              {unreadCount} unread {unreadCount === 1 ? "message" : "messages"}
            </p>
          )}
        </div>
      </div>

      {messages.length === 0 ? (
        <Card className="p-12">
          <div className="text-center">
            <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No messages yet</p>
          </div>
        </Card>
      ) : (
        <div className="grid gap-4">
          {messages.map((message) => (
            <Card key={message.id} className={`p-4 ${!message.read ? "border-accent" : ""}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold">{message.email}</span>
                    {!message.read && (
                      <span className="px-2 py-0.5 bg-accent/10 text-accent rounded text-xs font-medium">Unread</span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{message.message}</p>
                  <p className="text-xs text-muted-foreground">{new Date(message.timestamp).toLocaleString()}</p>
                </div>
                <div className="flex gap-2">
                  {!message.read && (
                    <Button variant="outline" size="sm" onClick={() => handleMarkRead(message.id)}>
                      Mark Read
                    </Button>
                  )}
                  <Button variant="outline" size="sm" onClick={() => handleDelete(message.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
