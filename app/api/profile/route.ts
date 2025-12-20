import { NextResponse } from "next/server"

export async function GET() {
  const profile = {
    fullName: "Johnson Maria Tony",
    role: "Full-stack Developer",
    about: "I specialize in building modern web applications using Angular, Python, SQL, and AWS.",
    currentFocus: ["Web applications", "Cloud solutions", "Developer tools"],
    skills: ["Angular", "Python", "SQL", "AWS", "TypeScript", "Node.js", "Docker", "Git"],
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    email: "johnson@example.com",
  }

  return NextResponse.json(profile)
}
