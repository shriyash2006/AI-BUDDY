"use client";

import { motion } from "framer-motion";
import { SendHorizontal } from "lucide-react";
import { SectionShell } from "@/components/section-shell";
import { Button } from "@/components/ui/button";
import { chatMessages } from "@/data/mock";

export function OnboardingSection() {
  return (
    <SectionShell
      id="onboarding"
      eyebrow="Onboarding"
      title="AI chatbot onboarding that feels alive."
      description="A dummy conversational flow profiles users, previews recommendations, and makes the prototype feel interactive without backend complexity."
    >
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="glass-panel rounded-lg p-6">
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-200">Profile signals</p>
          <div className="mt-6 space-y-4">
            {["Skills", "Availability", "Goals", "Domain interest"].map((label, index) => (
              <div key={label}>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-slate-300">{label}</span>
                  <span className="text-white">{82 + index * 3}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-rose-400"
                    style={{ width: `${82 + index * 3}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="glass-panel rounded-lg p-4">
          <div className="rounded-lg bg-slate-950/80 p-4">
            <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="font-semibold text-white">AI BUDDY Onboarding</p>
                <p className="text-xs text-slate-400">Mock chat session</p>
              </div>
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-300 shadow-[0_0_20px_rgba(110,231,183,0.8)]" />
            </div>
            <div className="space-y-3">
              {chatMessages.map((message, index) => (
                <motion.div
                  key={message.text}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.12 }}
                  className={`flex ${message.from === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[82%] rounded-lg px-4 py-3 text-sm leading-6 ${
                      message.from === "user"
                        ? "bg-cyan-300 text-slate-950"
                        : "border border-white/10 bg-white/[0.06] text-slate-200"
                    }`}
                  >
                    {message.text}
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-4 flex gap-2 rounded-lg border border-white/10 bg-white/[0.04] p-2">
              <input
                aria-label="Chat input"
                value="Find my best project matches"
                readOnly
                className="min-w-0 flex-1 bg-transparent px-3 text-sm text-slate-200 outline-none"
              />
              <Button size="icon" aria-label="Send message">
                <SendHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
