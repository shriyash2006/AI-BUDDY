import type React from "react";
import { cn } from "@/lib/utils";

type SectionShellProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
};

export function SectionShell({
  id,
  eyebrow,
  title,
  description,
  children,
  className
}: SectionShellProps) {
  return (
    <section id={id} className={cn("px-4 py-20 sm:px-6 lg:px-8", className)}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-3xl">
          {eyebrow ? (
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {title}
          </h2>
          {description ? (
            <p className="mt-4 text-base leading-7 text-slate-300 sm:text-lg">
              {description}
            </p>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  );
}
