"use client"

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";
import { BASE_URL } from "@/config/api";

interface Project {
  _id: string;
  title: string;
  problem: string;
  decision: string;
  tradeoff: string;
  outcome: string;
}

export function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${BASE_URL}/projects`);
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        console.error("Failed to fetch projects", err);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section id="projects" className="border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight mb-2">Projects</h2>
          <p className="text-muted-foreground">Key projects with technical decisions and outcomes</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {projects.map((project) => (
            <Card key={project._id} className="p-6 hover:shadow-lg transition-shadow">
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

          {projects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No projects found</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
