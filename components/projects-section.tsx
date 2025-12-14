import { Card } from "@/components/ui/card"
import { ArrowUpRight } from "lucide-react"

interface Project {
  id: string
  title: string
  problem: string
  decision: string
  tradeoff: string
  outcome: string
}

const MOCK_PROJECTS: Project[] = [
  {
    id: "1",
    title: "Cloud Migration Platform",
    problem: "Legacy application infrastructure causing scalability issues and high maintenance costs",
    decision: "Implemented containerized microservices architecture on AWS ECS with automated deployment pipelines",
    tradeoff: "Initial development time increased, but gained significant flexibility and reduced operational costs",
    outcome: "60% reduction in infrastructure costs and 99.9% uptime achieved",
  },
  {
    id: "2",
    title: "Real-time Analytics Dashboard",
    problem: "Business teams lacked visibility into key metrics and required manual report generation",
    decision: "Built Angular-based dashboard with Python backend using WebSocket connections for live data",
    tradeoff: "Increased backend complexity to handle real-time data streams, but eliminated manual reporting",
    outcome: "Reduced decision-making time by 40% with instant access to metrics",
  },
  {
    id: "3",
    title: "API Gateway Optimization",
    problem: "Monolithic API experiencing performance bottlenecks and difficult to maintain",
    decision: "Refactored into domain-driven microservices with GraphQL federation layer",
    tradeoff: "More services to maintain, but improved developer experience and API performance",
    outcome: "3x improvement in API response times and better team autonomy",
  },
]

export function ProjectsSection() {
  return (
    <section id="projects" className="border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight mb-2">Projects</h2>
          <p className="text-muted-foreground">Key projects with technical decisions and outcomes</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {MOCK_PROJECTS.map((project) => (
            <Card key={project.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-semibold">{project.title}</h3>
                <ArrowUpRight className="h-5 w-5 text-muted-foreground" />
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-accent mb-1">Problem</h4>
                  <p className="text-sm text-muted-foreground">{project.problem}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-accent mb-1">Decision</h4>
                  <p className="text-sm text-muted-foreground">{project.decision}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-accent mb-1">Trade-offs</h4>
                  <p className="text-sm text-muted-foreground">{project.tradeoff}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-accent mb-1">Outcome</h4>
                  <p className="text-sm text-muted-foreground">{project.outcome}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
