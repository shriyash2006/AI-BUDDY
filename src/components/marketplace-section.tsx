import { ArrowUpRight } from "lucide-react";
import { SectionShell } from "@/components/section-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/mock";

export function MarketplaceSection() {
  return (
    <SectionShell
      id="marketplace"
      eyebrow="Marketplace"
      title="Project marketplace for real-world proof of work."
      description="Mock briefs show how students can evaluate fit, startups can attract contributors, and mentors can guide delivery."
    >
      <div className="grid gap-4 lg:grid-cols-3">
        {projects.map((project) => (
          <article key={project.name} className="glass-panel rounded-lg p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-cyan-200">{project.startup}</p>
                <h3 className="mt-2 text-xl font-semibold text-white">{project.name}</h3>
              </div>
              <Badge>{project.match}</Badge>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-slate-300"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
              <div>
                <p className="text-xs text-slate-400">Prototype stipend</p>
                <p className="font-semibold text-white">{project.budget}</p>
              </div>
              <Button variant="secondary">
                View brief <ArrowUpRight className="h-4 w-4" />
              </Button>
            </div>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
