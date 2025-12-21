export function Footer() {
  const currentYear = new Date().getFullYear()
  const version = "1.0.0"
  const lastUpdated = "December 2025"

  return (
    <footer className="border-t border-gray-700 bg-[#0b1220]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {/* Flex container centered */}
        <div className="flex flex-col sm:flex-row justify-center  items-center gap-4 text-sm text-gray-400">
          
          {/* Left side */}
          <div className="flex items-center gap-4">
            <span className="text-cyan-400 font-medium">Version {version}</span>
            <span className="hidden sm:inline">•</span>
            <span>Updated {lastUpdated}</span>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <a
              href="mailto:tonyjanson121@gmail.com?subject=Feedback"
              className="text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              Send Feedback
            </a>
            <span className="text-gray-600">•</span>
            <span>© {currentYear} Johnson Tony</span>
          </div>
        </div>

        {/* Optional subtle bottom line */}
        <div className="mt-4 border-t border-gray-800"></div>
      </div>
    </footer>
  )
}
