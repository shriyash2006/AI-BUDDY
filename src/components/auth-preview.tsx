import { Github, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AuthPreview() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="glass-panel mx-auto grid max-w-7xl gap-8 rounded-lg p-6 md:grid-cols-[1fr_0.9fr] md:p-8">
        <div className="flex flex-col justify-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">Authentication UI</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Demo-ready access for every role.
          </h2>
          <p className="mt-4 max-w-2xl leading-7 text-slate-300">
            The auth surface is intentionally visual-only for the MVP, with clear role selection and modern SaaS sign-in patterns.
          </p>
        </div>
        <div className="rounded-lg border border-white/10 bg-slate-950/80 p-5">
          <div className="grid grid-cols-3 gap-2 rounded-md bg-white/[0.04] p-1">
            {["Student", "Startup", "Mentor"].map((role, index) => (
              <button
                key={role}
                className={`rounded-md px-3 py-2 text-sm transition ${
                  index === 0 ? "bg-cyan-300 text-slate-950" : "text-slate-300 hover:bg-white/10"
                }`}
              >
                {role}
              </button>
            ))}
          </div>
          <div className="mt-5 space-y-3">
            <input
              readOnly
              value="founder@millionminds.ai"
              aria-label="Email"
              className="h-12 w-full rounded-md border border-white/10 bg-white/[0.04] px-4 text-sm text-slate-200 outline-none"
            />
            <input
              readOnly
              value="••••••••••"
              aria-label="Password"
              className="h-12 w-full rounded-md border border-white/10 bg-white/[0.04] px-4 text-sm text-slate-200 outline-none"
            />
          </div>
          <Button className="mt-4 w-full" variant="neon">
            <Mail className="h-4 w-4" /> Continue with email
          </Button>
          <Button className="mt-3 w-full" variant="secondary">
            <Github className="h-4 w-4" /> Continue with GitHub
          </Button>
        </div>
      </div>
    </section>
  );
}
