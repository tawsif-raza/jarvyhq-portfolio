import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectGlyph from "../components/ProjectGlyph";
import RevealText from "../components/RevealText";
import SectionLabel from "../components/SectionLabel";

gsap.registerPlugin(ScrollTrigger);

const GROUPS = [
  {
    category: "AI/ML",
    skills: [
      { name: "LangGraph", note: "Backbone of AI Voice Employee — agent logic served through LangGraph + FastAPI." },
      { name: "Send() fan-out & subgraphs", note: "Parallel agent branches instead of one long sequential chain." },
      { name: "RAG pipelines", note: "Retrieval-grounded generation from real source data." },
      { name: "LLM fine-tuning (QLoRA)", note: "Fine-tuned Qwen 2.5 (0.5B) on a curated 1,366-example dataset." },
      { name: "Prompt engineering", note: "Drives Gemini/Veo generation for the Video Content Creation venture." },
      { name: "Gemini API", note: "Generates recurring-character 3D storytelling shorts." },
      { name: "Groq API", note: "Personalized outreach copy inside AI Outbound Engine." },
      { name: "Qwen 2.5", note: "Base model being fine-tuned for AI Voice Employee." },
    ],
  },
  {
    category: "Tooling",
    skills: [
      { name: "FastAPI", note: "Serves AI Voice Employee and Personal Dashboard backend." },
      { name: "SQLAlchemy", note: "ORM layer for structured data projects." },
      { name: "APScheduler", note: "Recurring jobs without a full workflow engine." },
      { name: "PostgreSQL", note: "Backing store for AI Voice Employee." },
      { name: "Docker", note: "Containerizes AI Voice Employee for AWS." },
      { name: "AWS", note: "Target deployment for containerized services." },
      { name: "Python (Flask/FastAPI)", note: "Backend for study/skill tracker." },
    ],
  },
  {
    category: "Automation",
    skills: [
      { name: "n8n workflow design", note: "Runs AI Outbound Engine, Client Lead Watcher, and more." },
      { name: "MCP integrations", note: "Connects n8n to Claude for auto-publish workflow." },
      { name: "WhatsApp Cloud API", note: "Automated reminders and follow-ups." },
      { name: "Gmail automation", note: "Drafts personalized outreach for human review." },
      { name: "Meta Graph API", note: "Publishes generated images directly to Meta." },
    ],
  },
];

export default function Skills() {
  const rootRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".skill-group", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 78%" },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="skills"
      className="relative mx-auto max-w-5xl px-6 py-32 md:px-16 lg:px-24"
    >
      <SectionLabel number="03" title="SKILLS" />

      <RevealText
        text="What I actually work with, day to day."
        className="font-display mb-4 max-w-xl text-3xl font-medium leading-tight text-paper md:text-4xl"
      />
      <p className="mb-16 font-mono text-[11px] text-[#6b6350]">
        Hover or tap any skill to see how it's been used.
      </p>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
        {GROUPS.map((g) => (
          <div key={g.category} className="skill-group glass-card p-5">
            <div className="mb-5 flex items-center gap-3">
              <ProjectGlyph category={g.category} />
              <h3 className="font-display text-lg font-medium text-paper">{g.category}</h3>
            </div>
            <ul className="space-y-2">
              {g.skills.map((s) => (
                <SkillItem key={s.name} {...s} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function SkillItem({ name, note }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <li className="group">
      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        aria-expanded={expanded}
        className="skill-card block w-full text-left"
      >
        <span className="flex items-center justify-between">
          <span className="font-mono text-[12px] leading-snug text-dim transition-colors group-hover:text-accent">
            {name}
          </span>
          <span className={`text-[10px] text-accent-dim transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}>
            ▾
          </span>
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          expanded ? "mt-1 max-h-24 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="px-4 pb-2 font-mono text-[11px] leading-snug text-[#6b6350]">
          {note}
        </p>
      </div>
    </li>
  );
}
