import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectGlyph from "../components/ProjectGlyph";

gsap.registerPlugin(ScrollTrigger);

const GROUPS = [
  {
    category: "AI/ML",
    skills: [
      "LangGraph (multi-agent orchestration)",
      "Send() fan-out & subgraphs",
      "RAG pipelines",
      "LLM fine-tuning (QLoRA/LoRA)",
      "Prompt engineering — text, image, video",
      "Gemini API",
      "Groq API",
      "Qwen 2.5",
    ],
  },
  {
    category: "Tooling",
    skills: [
      "FastAPI",
      "SQLAlchemy",
      "APScheduler",
      "PostgreSQL",
      "Docker",
      "AWS",
      "Python (Flask/FastAPI)",
    ],
  },
  {
    category: "Automation",
    skills: [
      "n8n workflow design",
      "MCP integrations",
      "WhatsApp Cloud API",
      "Gmail automation",
      "Meta Graph API",
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
      <h2 className="font-display mb-16 max-w-xl text-3xl leading-tight text-paper md:text-4xl">
        What I actually work with, day to day.
      </h2>

      <div className="grid grid-cols-1 gap-12 border-t border-line pt-10 sm:grid-cols-3">
        {GROUPS.map((g) => (
          <div key={g.category} className="skill-group">
            <div className="mb-5 flex items-center gap-3">
              <ProjectGlyph category={g.category} />
              <h3 className="font-display text-lg text-paper">{g.category}</h3>
            </div>
            <ul className="space-y-2.5">
              {g.skills.map((s) => (
                <li key={s} className="font-mono text-[12.5px] leading-snug text-dim">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
