export interface ReadingProgress {
  page: number
  lastAccessed: string
}

export const storageKeys = {
  pdfProgress: (resourceId: string) => `pdf-progress-${resourceId}`,
  adminAuth: "admin-auth-token",
}

export function getReadingProgress(resourceId: string): ReadingProgress | null {
  if (typeof window === "undefined") return null

  const saved = localStorage.getItem(storageKeys.pdfProgress(resourceId))
  if (!saved) return null

  try {
    return JSON.parse(saved)
  } catch {
    return null
  }
}

export function setReadingProgress(resourceId: string, progress: ReadingProgress): void {
  if (typeof window === "undefined") return

  localStorage.setItem(storageKeys.pdfProgress(resourceId), JSON.stringify(progress))
}

export function getAllReadingProgress(): Record<string, ReadingProgress> {
  if (typeof window === "undefined") return {}

  const progress: Record<string, ReadingProgress> = {}
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key?.startsWith("pdf-progress-")) {
      const resourceId = key.replace("pdf-progress-", "")
      const saved = localStorage.getItem(key)
      if (saved) {
        try {
          progress[resourceId] = JSON.parse(saved)
        } catch {
          // Skip invalid entries
        }
      }
    }
  }
  return progress
}
