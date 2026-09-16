import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectGlyph from "../components/ProjectGlyph";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    title: "AI Outbound Engine",
    category: "Automation",
    status: "live",
    statusLabel: "live · retainer offering",
    problem: "Manually prospecting and personalizing outreach doesn't scale.",
    approach:
      "Apollo search + enrichment feeds a dedupe layer, then Groq generates personalized outreach copy, drafted into Gmail for human review before sending.",
    outcome: "Running pipeline, offered as a paid build + retainer service.",
    stack: "n8n, Apollo, Groq, Gmail API",
    link: null,
  },
  {
    title: "The Highland Estate",
    category: "Showcase",
    status: "live",
    statusLabel: "live",
    problem: "Needed a polished frontend/UI-UX showcase beyond backend work.",
    approach:
      "Fictional luxury resort site with a full-bleed video hero, 3D-tilt room cards, and scroll-triggered animation across the amenities section.",
    outcome: "Fully deployed, polished, working end-to-end.",
    stack: "Next.js, React, Tailwind CSS, Vercel",
    link: "https://highland-estate.vercel.app/",
  },
  {
    title: "AI Voice Employee",
    category: "AI/ML",
    status: "progress",
    statusLabel: "in progress · pre-training",
    problem: "Exploring whether a small fine-tuned model can act as an AI \"employee.\"",
    approach:
      "Qwen 2.5 (0.5B) fine-tuned with QLoRA on a curated 1,366-example dataset, served through LangGraph + FastAPI, containerized for AWS deployment.",
    outcome: "Data pipeline + training config complete; model training next.",
    stack: "Qwen 2.5, QLoRA/LoRA, LangGraph, FastAPI, PostgreSQL, Docker",
    link: "https://github.com/tawsif-raza/ai-voice-employee",
  },
  {
    title: "Video Content Creation",
    category: "Content",
    status: "live",
    statusLabel: "active venture",
    problem: "Wanted a content venture with a distinct, consistent visual identity.",
    approach:
      "Gemini/Veo-generated 3D storytelling shorts with a recurring character for visual consistency, automated toward auto-publishing via n8n + Claude MCP.",
    outcome: "Active on YouTube & Instagram; auto-publish automation underway.",
    stack: "Gemini, Veo, n8n, MCP",
    link: "https://github.com/tawsif-raza/ai-auto-post",
  },
  {
    title: "Personal Dashboard",
    category: "Tooling",
    status: "progress",
    statusLabel: "in progress",
    problem: "No single place to track study progress and automation ideas.",
    approach:
      "A study/skill tracker for the BCA + ML path combined with an automation-opportunity log, backed by n8n flows and a Python backend.",
    outcome: "Architecture decided, build underway.",
    stack: "n8n, Python, Flask/FastAPI",
    link: null,
  },
  {
    title: "Client Lead Watcher",
    category: "Automation",
    status: "planning",
    statusLabel: "planning",
    problem: "Freelance/client leads scattered across platforms get missed.",
    approach:
      "n8n workflow monitoring Upwork, Freelancer, Reddit, and more for AI/automation-relevant posts, deduped and delivered as a digest.",
    outcome: "Requirements defined, not yet built.",
    stack: "n8n, data tables, email automation",
    link: null,
  },
  {
    title: "Job Search Automation",
    category: "Automation",
    status: "planning",
    statusLabel: "planning",
    problem: "Sourcing and tailoring applications by hand doesn't scale.",
    approach:
      "n8n pipeline to source, score, and generate tailored applications for remote roles across LinkedIn, Naukri, and company pages.",
    outcome: "Requirements defined, resume base ready.",
    stack: "n8n, LLM tailoring",
    link: null,
  },
  {
    title: "Automated Content Pipeline",
    category: "Automation",
    status: "planning",
    statusLabel: "planning",
    problem: "Wanted fully hands-off social content generation, no human in the loop at runtime.",
    approach:
      "A trigger dashboard kicks off an n8n workflow that generates 3–4 images per prompt and posts directly to Meta.",
    outcome: "Concept defined, not yet built.",
    stack: "n8n, image gen API, Meta Graph API",
    link: null,
  },
];

const DOT = {
  live: "bg-accent",
  progress: "bg-[#8a8272]",
  planning: "bg-[#4a4436]",
};

export default function Projects() {
  const rootRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".project-row", {
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 75%" },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="projects"
      className="relative mx-auto max-w-3xl px-6 py-32 md:px-16 lg:px-24"
    >
      <div className="mb-16 flex items-end justify-between gap-6">
        <h2 className="font-display max-w-xl text-3xl leading-tight text-paper md:text-4xl">
          Things I've built — finished, active, and in motion.
        </h2>
        <span className="hidden font-mono text-xs text-[#6b6350] sm:block">
          01–{String(PROJECTS.length).padStart(2, "0")}
        </span>
      </div>

      <div className="project-row border-t border-line">
        {PROJECTS.map((p, i) => (
          <article
            key={p.title}
            className="group relative grid grid-cols-[auto_auto_1fr] items-start gap-x-6 border-b border-line py-8 pl-4 transition-all"
          >
            <span className="absolute left-0 top-0 h-full w-[2px] scale-y-0 bg-accent transition-transform duration-300 group-hover:scale-y-100" />

            <span className="pt-1 font-mono text-xs text-[#6b6350] transition-colors group-hover:text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>

            <span className="hidden pt-0.5 opacity-60 transition-opacity group-hover:opacity-100 sm:block">
              <ProjectGlyph category={p.category} />
            </span>

            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
                <h3 className="font-display text-xl text-paper">
                  {p.link ? (
                    <a href={p.link} target="_blank" rel="noreferrer" className="hover:text-accent">
                      {p.title}
                    </a>
                  ) : (
                    p.title
                  )}
                  <span className="ml-2 text-base text-dim">({p.category})</span>
                </h3>
                <span className="flex items-center gap-2 font-mono text-[11px] text-dim">
                  <span className={`h-1.5 w-1.5 rounded-full ${DOT[p.status]}`} />
                  {p.statusLabel}
                </span>
              </div>

              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-dim">
                {p.problem} {p.approach} {p.outcome}
              </p>

              <p className="mt-4 font-mono text-[11px] text-[#6b6350]">{p.stack}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
