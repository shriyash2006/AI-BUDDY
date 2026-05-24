"use client";

import { motion } from "framer-motion";
import { BrainCircuit, Menu } from "lucide-react";
import { navItems } from "@/data/mock";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed left-0 right-0 top-0 z-50 px-4 py-4 sm:px-6 lg:px-8"
    >
      <nav className="glass-panel mx-auto flex max-w-7xl items-center justify-between rounded-lg px-4 py-3">
        <a href="#" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-md bg-cyan-300 text-slate-950">
            <BrainCircuit className="h-5 w-5" />
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-semibold text-white">AI BUDDY</span>
            <span className="block text-xs text-slate-400">by Millionminds</span>
          </span>
        </a>
        <div className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm text-slate-300 transition hover:text-white"
            >
              {item}
            </a>
          ))}
        </div>
        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost">Sign in</Button>
          <Button variant="neon">Request demo</Button>
        </div>
        <Button size="icon" variant="secondary" className="md:hidden" aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </Button>
      </nav>
    </motion.header>
  );
}
