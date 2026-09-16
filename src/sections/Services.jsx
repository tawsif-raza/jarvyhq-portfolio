import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Magnetic from "../components/Magnetic";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    title: "Agentic AI systems",
    desc:
      "Multi-agent pipelines built on LangGraph — planning, fan-out, human-in-the-loop approval, the works. Built to run in production, not as a demo.",
  },
  {
    title: "Automation pipelines",
    desc:
      "n8n-based workflows that replace manual busywork — lead-gen, outreach, content publishing, monitoring — wired to the tools you already use.",
  },
  {
    title: "Custom model deployment",
    desc:
      "Fine-tuned small models for a specific job, served through a real API — not a wrapper around someone else's endpoint.",
  },
];

export default function Services() {
  const rootRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".service-row", {
        opacity: 0,
        y: 16,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 78%" },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="services"
      className="relative mx-auto max-w-3xl px-6 py-32 md:px-16 lg:px-24"
    >
      <h2 className="font-display mb-4 max-w-xl text-3xl leading-tight text-paper md:text-4xl">
        If you need one of these built, that's what I do.
      </h2>
      <p className="mb-16 max-w-md text-[15px] text-dim">
        Build fee up front, then a monthly retainer if you want it kept
        running and improved.
      </p>

      <div className="border-t border-line">
        {SERVICES.map((s, i) => (
          <div
            key={s.title}
            className="service-row grid grid-cols-[auto_1fr] gap-x-6 border-b border-line py-8"
          >
            <span className="pt-1 font-mono text-xs text-[#6b6350]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="font-display text-xl text-paper">{s.title}</h3>
              <p className="mt-3 max-w-md text-[15px] leading-relaxed text-dim">
                {s.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Magnetic>
        <a
          href="#contact"
          className="mt-12 inline-block rounded-sm bg-accent px-6 py-3 text-sm font-medium text-[#0b0a08] transition hover:bg-[#dda257]"
        >
          Start a project
        </a>
      </Magnetic>
    </section>
  );
}
