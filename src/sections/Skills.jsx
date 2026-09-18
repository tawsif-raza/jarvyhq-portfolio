import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectGlyph from "../components/ProjectGlyph";
import RevealText from "../components/RevealText";

gsap.registerPlugin(ScrollTrigger);

// Every note below is grounded in a project already described in
// Projects.jsx -- no claim here goes beyond what's already published and
// verifiable elsewhere on the site. Where a skill isn't tied to one named
// project, the note explains the technical reasoning instead of
// fabricating a connection.
const GROUPS = [
  {
    category: "AI/ML",
    skills: [
      {
        name: "LangGraph (multi-agent orchestration)",
        note: "Backbone of AI Voice Employee -- the agent logic is served through LangGraph + FastAPI.",
      },
      {
        name: "Send() fan-out & subgraphs",
        note: "For running independent agent branches in parallel instead of one long sequential chain.",
      },
      {
        name: "RAG pipelines",
        note: "Retrieval-grounded generation, so answers come from real source data instead of model memory alone.",
      },
      {
        name: "LLM fine-tuning (QLoRA/LoRA)",
        note: "Used to fine-tune Qwen 2.5 (0.5B) for AI Voice Employee on a curated 1,366-example dataset.",
      },
      {
        name: "Prompt engineering -- text, image, video",
        note: "Drives the Gemini/Veo generation behind the Video Content Creation venture.",
      },
      {
        name: "Gemini API",
        note: "Generates the recurring-character 3D storytelling shorts for the video venture.",
      },
      {
        name: "Groq API",
        note: "Generates personalized outreach copy inside the AI Outbound Engine pipeline.",
      },
      {
        name: "Qwen 2.5",
        note: "The base model being fine-tuned for AI Voice Employee.",
      },
    ],
  },
  {
    category: "Tooling",
    skills: [
      {
        name: "FastAPI",
        note: "Serves the AI Voice Employee agent and the Personal Dashboard backend.",
      },
      {
        name: "SQLAlchemy",
        note: "ORM layer for structured data wherever a project needs more than a flat file.",
      },
      {
        name: "APScheduler",
        note: "For recurring jobs that need to run on a schedule without a full workflow engine.",
      },
      {
        name: "PostgreSQL",
        note: "Backing store for AI Voice Employee's training and serving pipeline.",
      },
      {
        name: "Docker",
        note: "Containerizes AI Voice Employee for AWS deployment.",
      },
      {
        name: "AWS",
        note: "Target deployment environment for the containerized AI Voice Employee service.",
      },
      {
        name: "Python (Flask/FastAPI)",
        note: "Backend for the Personal Dashboard's study/skill tracker.",
      },
    ],
  },
  {
    category: "Automation",
    skills: [
      {
        name: "n8n workflow design",
        note: "Runs the AI Outbound Engine, Client Lead Watcher, and several other automation pipelines end to end.",
      },
      {
        name: "MCP integrations",
        note: "Connects n8n to Claude for the Video Content Creation auto-publish workflow.",
      },
      {
        name: "WhatsApp Cloud API",
        note: "For automated reminders and follow-ups delivered over WhatsApp instead of email or SMS.",
      },
      {
        name: "Gmail automation",
        note: "Drafts AI Outbound Engine's personalized outreach into Gmail for human review before sending.",
      },
      {
        name: "Meta Graph API",
        note: "Publishes generated images directly to Meta in the Automated Content Pipeline concept.",
      },
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
      <RevealText
        text="What I actually work with, day to day."
        className="font-display mb-4 max-w-xl text-3xl font-medium leading-tight text-paper md:text-4xl"
      />
      <p className="mb-16 font-mono text-[11px] text-[#6b6350]">
        Hover or tap any skill for how it's actually been used.
      </p>

      <div className="grid grid-cols-1 gap-12 border-t border-line pt-10 sm:grid-cols-3">
        {GROUPS.map((g) => (
          <div key={g.category} className="skill-group">
            <div className="mb-5 flex items-center gap-3">
              <ProjectGlyph category={g.category} />
              <h3 className="font-display text-lg font-medium text-paper">{g.category}</h3>
            </div>
            <ul className="space-y-3">
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
        className="block w-full text-left"
      >
        <span className="font-mono text-[12.5px] leading-snug text-dim underline decoration-line decoration-dotted underline-offset-4 transition-colors group-hover:text-accent group-hover:decoration-accent">
          {name}
        </span>
      </button>
      <p
        className={`overflow-hidden font-mono text-[11px] leading-snug text-[#6b6350] transition-all duration-300 group-hover:mt-1.5 group-hover:max-h-20 group-hover:opacity-100 ${
          expanded ? "mt-1.5 max-h-20 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {note}
      </p>
    </li>
  );
}
