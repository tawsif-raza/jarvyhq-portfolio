import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectCard from "../components/ProjectCard";
import SectionLabel from "../components/SectionLabel";
import RevealText from "../components/RevealText";

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
    image: "/project-outbound.jpg",
    featured: true,
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
    image: "/project-highland.jpg",
    featured: true,
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
    image: "/project-voice.jpg",
    featured: true,
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
    image: "/project-video.jpg",
    featured: true,
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
    image: null,
    featured: false,
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
    image: null,
    featured: false,
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
    image: null,
    featured: false,
  },
  {
    title: "Automated Content Pipeline",
    category: "Automation",
    status: "planning",
    statusLabel: "planning",
    problem: "Wanted fully hands-off social content generation, no human in the loop at runtime.",
    approach:
      "A trigger dashboard kicks off an n8n workflow that generates 3-4 images per prompt and posts directly to Meta.",
    outcome: "Concept defined, not yet built.",
    stack: "n8n, image gen API, Meta Graph API",
    link: "https://ai-video-studio-dashboard.vercel.app",
    image: null,
    featured: false,
  },
];

const CATEGORIES = ["All", "AI/ML", "Automation", "Showcase", "Content", "Tooling"];

export default function Projects() {
  const rootRef = useRef();
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);
  const featured = filtered.filter((p) => p.featured);
  const others = filtered.filter((p) => !p.featured);

  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!hasTriggeredRef.current) {
        gsap.from(".project-card-anim", {
          opacity: 0,
          y: 30,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 75%",
            once: true,
            onEnter: () => {
              hasTriggeredRef.current = true;
            },
          },
        });
      } else {
        gsap.fromTo(
          ".project-card-anim",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.35, stagger: 0.05, ease: "power2.out" }
        );
      }
    }, rootRef);
    return () => ctx.revert();
  }, [filter]);

  return (
    <section
      ref={rootRef}
      id="projects"
      className="reading-scrim reading-scrim--center relative mx-auto max-w-5xl overflow-hidden px-6 py-32 md:px-16 lg:px-24"
    >
      <SectionLabel number="02" title="WORK" />

      <RevealText
        text="Things I've built — finished, active, and in motion."
        className="font-display mb-4 max-w-xl text-3xl font-medium leading-tight text-paper md:text-4xl"
      />

      <p className="mb-10 font-mono text-[11px] text-[#6b6350]">
        {PROJECTS.length} projects · {PROJECTS.filter((p) => p.status === "live").length} live
      </p>

      {/* Category Filters */}
      <div className="mb-12 flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilter(cat)}
            className={`filter-tab ${filter === cat ? "filter-tab--active" : ""}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Featured Projects — 2-column grid */}
      {featured.length > 0 && (
        <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {featured.map((p) => (
            <div key={p.title} className="project-card-anim">
              <ProjectCard project={p} index={PROJECTS.indexOf(p)} featured />
            </div>
          ))}
        </div>
      )}

      {/* Other Projects — compact list */}
      {others.length > 0 && (
        <>
          <h3 className="mb-4 font-mono text-[11px] uppercase tracking-wider text-[#6b6350]">
            Other projects
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {others.map((p) => (
              <div key={p.title} className="project-card-anim">
                <ProjectCard project={p} index={PROJECTS.indexOf(p)} />
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
