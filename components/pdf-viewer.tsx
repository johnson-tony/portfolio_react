"use client"

import { useState } from "react"
import { Document, Page, pdfjs } from "react-pdf"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

// ✅ IMPORTANT: worker version must match react-pdf version
pdfjs.GlobalWorkerOptions.workerSrc = 
  `https://unpkg.com/pdfjs-dist@5.4.296/build/pdf.worker.min.js`

interface PDFViewerProps {
  resourceId: string
  fileUrl: string
  title: string
  onClose: () => void
}

export function PDFViewer({
  fileUrl,
  title,
  onClose,
}: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number | null>(null)
  const [pageNumber, setPageNumber] = useState(1)

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className="bg-[#0b1220] w-full max-w-4xl h-[90vh] rounded-lg shadow-lg flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
          <h3 className="text-white text-sm font-medium truncate">{title}</h3>
          <Button size="icon" variant="ghost" onClick={onClose}>
            <X className="h-4 w-4 text-white" />
          </Button>
        </div>

        {/* PDF */}
        <div className="flex-1 overflow-auto flex justify-center p-4">
          <Document
            file={fileUrl}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            onLoadError={(err) => console.error("PDF load error", err)}
          >
            <Page pageNumber={pageNumber} />
          </Document>
        </div>

        {/* Footer */}
        {numPages && (
          <div className="flex items-center justify-between px-4 py-2 border-t border-gray-700 text-white text-sm">
            <Button
              size="sm"
              disabled={pageNumber <= 1}
              onClick={() => setPageNumber((p) => p - 1)}
            >
              Prev
            </Button>

            <span>
              Page {pageNumber} of {numPages}
            </span>

            <Button
              size="sm"
              disabled={pageNumber >= numPages}
              onClick={() => setPageNumber((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
