"use client"

import type React from "react"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Mail, CheckCircle2 } from "lucide-react"
import { sendMessage } from "@/services/api"

export function ContactSection() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const res = await sendMessage({ email, message })
      console.log("Saved in DB:", res)

      setSubmitted(true)
      setEmail("")
      setMessage("")
      setTimeout(() => setSubmitted(false), 5000)
    } catch (err) {
      alert("Oops! Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="border-t border-border bg-[#0b1220]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold tracking-tight mb-2 text-white">
              Get in Touch
            </h2>
            <p className="text-cyan-400">
              Have a question, idea, or just want to say hi? Drop me a message below and I'll respond promptly!
            </p>
          </div>

          <Card className="p-6 md:p-8 bg-gray-900/70 backdrop-blur-md">
            {submitted ? (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-cyan-500/20 mb-4">
                  <CheckCircle2 className="h-8 w-8 text-cyan-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Message Sent!</h3>
                <p className="text-gray-300">
                  Thanks for reaching out! I’ll get back to you as soon as possible. 🌟
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 text-white">
                    Your Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-9 bg-gray-800 text-white placeholder-gray-400"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2 text-white">
                    Your Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Write something…"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={6}
                    className="bg-gray-800 text-white placeholder-gray-400"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-cyan-500 hover:bg-cyan-400 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending…" : "Send Message"}
                </Button>
              </form>
            )}
          </Card>
        </div>
      </div>
    </section>
  )
}
