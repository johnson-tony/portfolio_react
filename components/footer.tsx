export function Footer() {
  const currentYear = new Date().getFullYear()
  const version = "1.0.0"
  const lastUpdated = "December 2024"

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <span>Version {version}</span>
            <span className="hidden sm:inline">•</span>
            <span>Updated {lastUpdated}</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="mailto:johnson@example.com?subject=Feedback" className="hover:text-foreground transition-colors">
              Send Feedback
            </a>
            <span>•</span>
            <span>© {currentYear}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
