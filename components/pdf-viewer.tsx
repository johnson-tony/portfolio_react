"use client"

import { useState, useEffect } from "react"
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PDFViewerProps {
  resourceId: string
  title: string
  onClose: () => void
}

export function PDFViewer({ resourceId, title, onClose }: PDFViewerProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [zoom, setZoom] = useState(100)
  const totalPages = 10 // Mock total pages

  // Load saved progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem(`pdf-progress-${resourceId}`)
    if (savedProgress) {
      const progress = JSON.parse(savedProgress)
      setCurrentPage(progress.page || 1)
    }
  }, [resourceId])

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem(
      `pdf-progress-${resourceId}`,
      JSON.stringify({
        page: currentPage,
        lastAccessed: new Date().toISOString(),
      }),
    )
  }, [currentPage, resourceId])

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handleZoomIn = () => {
    setZoom(Math.min(zoom + 25, 200))
  }

  const handleZoomOut = () => {
    setZoom(Math.max(zoom - 25, 50))
  }

  return (
    <div className="fixed inset-0 z-50 bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h2 className="font-semibold text-lg truncate max-w-md">{title}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="border-b border-border bg-muted/30">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handlePrevPage} disabled={currentPage === 1}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium min-w-20 text-center">
              Page {currentPage} of {totalPages}
            </span>
            <Button variant="outline" size="sm" onClick={handleNextPage} disabled={currentPage === totalPages}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleZoomOut} disabled={zoom === 50}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium min-w-16 text-center">{zoom}%</span>
            <Button variant="outline" size="sm" onClick={handleZoomIn} disabled={zoom === 200}>
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* PDF Content */}
      <div className="h-[calc(100vh-120px)] overflow-auto bg-muted/20">
        <div className="container mx-auto px-4 py-8">
          <div
            className="mx-auto bg-card shadow-lg border border-border"
            style={{
              width: `${zoom}%`,
              maxWidth: "800px",
              minHeight: "1000px",
            }}
          >
            <div className="p-8">
              <div className="space-y-4 text-sm">
                <p className="text-muted-foreground italic">PDF viewing functionality - Page {currentPage}</p>
                <p>
                  This is a mock PDF viewer. In a production environment, you would integrate a PDF library like
                  react-pdf or pdf.js to display actual PDF content.
                </p>
                <p>
                  Your reading progress is automatically saved to localStorage, so when you return to this document,
                  you'll resume from page {currentPage}.
                </p>
                <div className="pt-4 border-t border-border">
                  <h3 className="font-semibold mb-2">{title}</h3>
                  <p className="text-muted-foreground">
                    Sample content for demonstration purposes. The actual PDF content would be rendered here using a PDF
                    library with proper text rendering, images, and formatting preserved from the original document.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
