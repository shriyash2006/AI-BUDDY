import {
  Bot,
  BriefcaseBusiness,
  GraduationCap,
  Handshake,
  Rocket,
  Sparkles,
  UsersRound
} from "lucide-react";

export const navItems = ["Platform", "Onboarding", "Dashboards", "Marketplace"];

export const stats = [
  { label: "AI talent profiles", value: "12.8k" },
  { label: "Startup projects", value: "860+" },
  { label: "Mentor sessions", value: "4.2k" }
];

export const roles = [
  {
    title: "Students",
    description: "Discover skill gaps, build proof-of-work, and match with real startup projects.",
    icon: GraduationCap,
    color: "text-cyan-200"
  },
  {
    title: "Startups",
    description: "Launch project briefs and access vetted AI-matched student talent pods.",
    icon: Rocket,
    color: "text-violet-200"
  },
  {
    title: "Mentors",
    description: "Guide teams, review progress, and convert expertise into measurable outcomes.",
    icon: Handshake,
    color: "text-rose-200"
  }
];

export const chatMessages = [
  { from: "ai", text: "Welcome to AI BUDDY. What role should I optimize your journey for?" },
  { from: "user", text: "I am a student looking for real startup projects." },
  { from: "ai", text: "Great. I found your AI readiness score, preferred tracks, and 6 matching projects." }
];

export const dashboardCards = [
  {
    role: "Student",
    icon: GraduationCap,
    title: "AI Career Command Center",
    metric: "92%",
    label: "Match readiness",
    items: ["3 active applications", "Next mentor review in 2 days", "Portfolio score improved 18%"]
  },
  {
    role: "Startup",
    icon: BriefcaseBusiness,
    title: "Talent Pod Pipeline",
    metric: "24",
    label: "Qualified applicants",
    items: ["2 project briefs live", "7 shortlists generated", "AI fit score avg 87"]
  },
  {
    role: "Mentor",
    icon: UsersRound,
    title: "Mentor Ops Console",
    metric: "11",
    label: "Teams guided",
    items: ["5 pending reviews", "34 hours mentored", "Top domain: GenAI Products"]
  }
];

export const projects = [
  {
    name: "AI Sales Copilot MVP",
    startup: "SignalStack",
    tags: ["LLM", "Next.js", "UX"],
    budget: "₹35k",
    match: "96%"
  },
  {
    name: "Healthcare Resume Parser",
    startup: "CareBridge",
    tags: ["NLP", "Python", "Data"],
    budget: "₹48k",
    match: "91%"
  },
  {
    name: "Campus Hiring Analytics",
    startup: "HireOS",
    tags: ["Dashboard", "AI", "Research"],
    budget: "₹28k",
    match: "88%"
  }
];

export const steps = [
  { icon: Bot, title: "AI onboarding", text: "Conversational profiling for goals, skills, availability, and domain fit." },
  { icon: Sparkles, title: "Smart matching", text: "Students, startups, and mentors are ranked through mock fit signals." },
  { icon: UsersRound, title: "Project pods", text: "Collaborative project rooms make the prototype feel demo-ready." }
];
