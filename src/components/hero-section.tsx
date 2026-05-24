"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { landingRoles, stats } from "@/data/mock";

export function HeroSection() {
  const [selectedRole, setSelectedRole] = useState(landingRoles[0].title);

  return (
    <section className="relative overflow-hidden px-4 pb-12 pt-32 sm:px-6 lg:px-8 lg:pt-36">
      <div className="absolute inset-0 bg-neon-grid bg-[size:44px_44px] opacity-30 [mask-image:linear-gradient(to_bottom,black,transparent_78%)]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Badge>AI-powered Talent-as-a-Service</Badge>
          <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
            AI BUDDY by <span className="neon-text">Millionminds</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            A clickable futuristic platform that connects students, startups, and mentors through AI-led onboarding, talent matching, and project collaboration.
          </p>
          <div className="glass-panel mt-8 rounded-lg p-4 sm:p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200">
              Choose your journey
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
              Who are you?
            </h2>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {landingRoles.map((role) => {
                const isSelected = selectedRole === role.title;

                return (
                  <a
                    key={role.title}
                    href={role.href}
                    onClick={() => setSelectedRole(role.title)}
                    className={`group rounded-lg border p-4 text-left transition ${
                      isSelected
                        ? "border-cyan-300/70 bg-cyan-300/[0.12] shadow-glow"
                        : "border-white/10 bg-white/[0.04] hover:border-cyan-300/35 hover:bg-white/[0.08]"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-md bg-white/10">
                        <role.icon className="h-5 w-5 text-cyan-200" />
                      </span>
                      {isSelected ? (
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-300 text-slate-950">
                          <Check className="h-4 w-4" />
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-4 font-semibold text-white">{role.title}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{role.description}</p>
                  </a>
                );
              })}
            </div>
            <Button className="mt-4 w-full sm:w-auto" size="lg" variant="neon" asChild>
              <a href="#onboarding">
                Continue as {selectedRole} <ArrowRight className="h-5 w-5" />
              </a>
            </Button>
          </div>
          <div className="mt-10 grid max-w-2xl grid-cols-3 gap-3">
            {stats.map((stat) => (
              <div key={stat.label} className="glass-panel rounded-lg p-4">
                <p className="text-2xl font-semibold text-white">{stat.value}</p>
                <p className="mt-1 text-xs leading-5 text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="glass-panel relative overflow-hidden rounded-lg p-4"
        >
          <div className="rounded-lg border border-white/10 bg-slate-950/70 p-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-sm font-medium text-white">AI Match Engine</p>
                <p className="text-xs text-slate-400">Live prototype preview</p>
              </div>
              <ShieldCheck className="h-5 w-5 text-cyan-200" />
            </div>
            <div className="space-y-4 py-5">
              {["Student profile analyzed", "Startup brief mapped", "Mentor fit predicted"].map(
                (item, index) => (
                  <div key={item} className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                    <div className="mb-3 flex items-center justify-between text-sm">
                      <span className="text-slate-200">{item}</span>
                      <span className="text-cyan-200">{92 - index * 4}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-800">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${92 - index * 4}%` }}
                        transition={{ duration: 0.9, delay: 0.3 + index * 0.1 }}
                        className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-violet-400"
                      />
                    </div>
                  </div>
                )
              )}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-cyan-300/10 p-4">
                <p className="text-xs text-cyan-100">Suggested role</p>
                <p className="mt-1 font-semibold text-white">AI Product Intern</p>
              </div>
              <div className="rounded-lg bg-violet-400/10 p-4">
                <p className="text-xs text-violet-100">Best mentor</p>
                <p className="mt-1 font-semibold text-white">GenAI Builder</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
