import { SectionShell } from "@/components/section-shell";
import { roles, steps } from "@/data/mock";

export function PlatformSection() {
  return (
    <SectionShell
      id="platform"
      eyebrow="Platform"
      title="One prototype, three connected journeys."
      description="The MVP surface is designed for presentation demos: fast to understand, visually premium, and ready to expand into real workflows later."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {roles.map((role) => (
          <article key={role.title} className="glass-panel rounded-lg p-6">
            <role.icon className={`h-8 w-8 ${role.color}`} />
            <h3 className="mt-5 text-xl font-semibold text-white">{role.title}</h3>
            <p className="mt-3 leading-7 text-slate-300">{role.description}</p>
          </article>
        ))}
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {steps.map((step) => (
          <div key={step.title} className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
            <step.icon className="h-6 w-6 text-cyan-200" />
            <h3 className="mt-4 font-semibold text-white">{step.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-400">{step.text}</p>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
