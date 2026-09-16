import { useEffect, useRef } from "react";
import gsap from "gsap";
import AgentGraph from "../components/AgentGraph";
import Magnetic from "../components/Magnetic";

export default function Hero() {
  const rootRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(".hero-line", { opacity: 0, y: 30, duration: 0.7, stagger: 0.1 })
        .from(".hero-sub", { opacity: 0, y: 16, duration: 0.6 }, "-=0.35")
        .from(".hero-cta", { opacity: 0, y: 12, duration: 0.5 }, "-=0.35")
        .from(".hero-stat", { opacity: 0, duration: 0.5, stagger: 0.06 }, "-=0.25");
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="hero"
      className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center gap-10 px-6 pt-28 md:flex-row md:gap-16 md:px-16 lg:px-24"
    >
      <div className="w-full md:w-[46%]">
        <h1 className="font-display max-w-lg text-4xl font-medium leading-[1.08] text-paper sm:text-5xl md:text-6xl">
          <span className="hero-line block">Tawsif Raza Khan builds</span>
          <span className="hero-line block">agentic systems that run</span>
          <span className="hero-line block">on their own.</span>
        </h1>

        <p className="hero-sub mt-7 max-w-md text-base leading-relaxed text-dim">
          Multi-agent pipelines, RAG systems, and automation that ships —
          for a healthcare-tech startup, for clients, and for myself.
          Not demos. Systems that run without me watching them.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-5">
          <Magnetic>
            <a
              href="#projects"
              className="rounded-sm bg-accent px-6 py-3 text-sm font-medium text-[#0b0a08] transition hover:bg-[#dda257]"
            >
              <span className="hero-cta">See the work</span>
            </a>
          </Magnetic>
          <a
            href="#contact"
            className="border-b border-line pb-1 text-sm font-medium text-paper transition hover:border-accent"
          >
            <span className="hero-cta">Get in touch</span>
          </a>
        </div>

        <div className="mt-16 flex gap-10 border-t border-line pt-6">
          <Stat value="15 mo" label="self-directed study" />
          <Stat value="9" label="systems built" />
          <Stat value="1 yr" label="in production" />
        </div>
      </div>

      <div className="flex w-full items-center justify-center md:w-[54%]">
        <AgentGraph />
      </div>
    </section>
  );
}

function Stat({ value, label }) {
  return (
    <div className="hero-stat">
      <div className="font-display text-2xl text-paper">{value}</div>
      <div className="mt-1 font-mono text-[11px] text-dim">{label}</div>
    </div>
  );
}
