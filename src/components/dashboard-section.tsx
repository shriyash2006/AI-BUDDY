import { SectionShell } from "@/components/section-shell";
import { dashboardCards } from "@/data/mock";

export function DashboardSection() {
  return (
    <SectionShell
      id="dashboards"
      eyebrow="Dashboards"
      title="Role-specific command centers."
      description="Student, startup, and mentor dashboards use shared components while keeping their metrics and workflows distinct."
    >
      <div className="grid gap-4 lg:grid-cols-3">
        {dashboardCards.map((card) => (
          <article key={card.role} className="glass-panel rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-md bg-white/10">
                  <card.icon className="h-5 w-5 text-cyan-200" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{card.role}</p>
                  <h3 className="font-semibold text-white">{card.title}</h3>
                </div>
              </div>
            </div>
            <div className="mt-6 rounded-lg border border-white/10 bg-white/[0.04] p-5">
              <p className="text-4xl font-semibold neon-text">{card.metric}</p>
              <p className="mt-1 text-sm text-slate-400">{card.label}</p>
            </div>
            <ul className="mt-5 space-y-3">
              {card.items.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-slate-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
