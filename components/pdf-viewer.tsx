"use client"

import { useState, useEffect } from "react"
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Document, Page, pdfjs } from "react-pdf"
import { BASE_URL } from "@/config/api"

// ✅ Set worker for react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

interface PDFViewerProps {
  resourceId: string
  fileUrl: string
  title: string
  onClose: () => void
}

export default function PDFViewer({ resourceId, fileUrl, title, onClose }: PDFViewerProps) {
  const [numPages, setNumPages] = useState(0)
  const [page, setPage] = useState(1)
  const [zoom, setZoom] = useState(1.0)

  const onDocumentLoadSuccess = ({ numPages }: any) => setNumPages(numPages)

  // Load saved page progress
  useEffect(() => {
    const saved = localStorage.getItem(`pdf-progress-${resourceId}`)
    if (saved) setPage(JSON.parse(saved).page || 1)
  }, [resourceId])

  // Save progress
  useEffect(() => {
    localStorage.setItem(
      `pdf-progress-${resourceId}`,
      JSON.stringify({ page, lastAccessed: new Date().toISOString() })
    )
  }, [page, resourceId])

  return (
    <div className="fixed inset-0 z-50 bg-background overflow-auto p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-2 mb-4 text-white">
        <Button onClick={() => setPage(p => Math.max(p - 1, 1))} disabled={page === 1}>
          <ChevronLeft />
        </Button>
        <span>Page {page} of {numPages}</span>
        <Button onClick={() => setPage(p => Math.min(p + 1, numPages))} disabled={page === numPages}>
          <ChevronRight />
        </Button>
        <Button onClick={() => setZoom(z => Math.min(z + 0.25, 2))}><ZoomIn /></Button>
        <Button onClick={() => setZoom(z => Math.max(z - 0.25, 0.5))}><ZoomOut /></Button>
      </div>

      {/* PDF */}
      <div className="flex justify-center">
        <Document
          file={fileUrl}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page pageNumber={page} scale={zoom} />
        </Document>
      </div>
    </div>
  )
}
