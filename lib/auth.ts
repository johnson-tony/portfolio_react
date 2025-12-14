const ADMIN_TOKEN = "admin-session-active"
const SESSION_KEY = "admin-auth-token"

export function setAdminAuth(): void {
  if (typeof window === "undefined") return

  const sessionData = {
    token: ADMIN_TOKEN,
    timestamp: new Date().toISOString(),
  }

  localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData))
}

export function isAdminAuthenticated(): boolean {
  if (typeof window === "undefined") return false

  const saved = localStorage.getItem(SESSION_KEY)
  if (!saved) return false

  try {
    const sessionData = JSON.parse(saved)
    return sessionData.token === ADMIN_TOKEN
  } catch {
    return false
  }
}

export function clearAdminAuth(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem(SESSION_KEY)
}
