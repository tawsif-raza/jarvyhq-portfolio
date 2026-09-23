import { useEffect, useRef } from "react";
import gsap from "gsap";
import AgentGraph from "../components/AgentGraph";
import Magnetic from "../components/Magnetic";
import RoleCycler from "../components/RoleCycler";

export default function Hero() {
  const rootRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(".hero-line", { opacity: 0, y: 30, duration: 0.7, stagger: 0.1 })
        .from(".hero-role", { opacity: 0, y: 10, duration: 0.5 }, "-=0.3")
        .from(".hero-sub", { opacity: 0, y: 16, duration: 0.6 }, "-=0.35")
        .from(".hero-cta", { opacity: 0, y: 12, duration: 0.5 }, "-=0.35")
        .from(".hero-badge", { opacity: 0, x: -10, duration: 0.4 }, "-=0.25")
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
      <div className="reading-scrim w-full overflow-hidden md:w-[46%]">
        <div className="hero-role mb-4">
          <RoleCycler />
        </div>

        <h1 className="font-display max-w-lg text-4xl font-medium leading-[1.08] text-paper sm:text-5xl md:text-6xl 2xl:max-w-xl 2xl:text-7xl">
          <span className="hero-line block">Tawsif Raza Khan builds</span>
          <span className="hero-line block">agentic systems that run</span>
          <span className="hero-line block text-accent">on their own.</span>
        </h1>

        <p className="hero-sub mt-8 max-w-md text-base leading-relaxed text-dim">
          Multi-agent pipelines, RAG systems, and automation that ships —
          for a healthcare-tech startup, for clients, and for myself.
          Not demos. Systems that run without me watching them.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-4">
          <Magnetic>
            <a
              href="#projects"
              className="hero-cta inline-block rounded-sm bg-accent px-7 py-3.5 text-sm font-medium text-[#0b0a08] transition hover:bg-[#dda257]"
            >
              See the work
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="#contact"
              className="hero-cta inline-block rounded-sm border border-line px-7 py-3.5 text-sm font-medium text-paper transition hover:border-accent hover:text-accent"
            >
              Get in touch
            </a>
          </Magnetic>
        </div>

        {/* Availability badge */}
        <div className="hero-badge mt-6 flex items-center gap-2.5 font-mono text-[11px] text-dim">
          <span className="availability-dot" aria-hidden="true" />
          <span>Available for freelance & full-time</span>
        </div>

        <div className="mt-14 flex gap-12 border-t border-line pt-7">
          <AnimatedStat value={9} label="systems built" />
          <AnimatedStat value={3} label="live & shipping" suffix="" />
          <AnimatedStat value={20} label="tools & frameworks" suffix="+" />
        </div>
      </div>

      <div className="diagram-clearing flex w-full items-center justify-center overflow-hidden md:w-[54%]">
        <AgentGraph />
      </div>
    </section>
  );
}

function AnimatedStat({ value, label, suffix = "" }) {
  const numRef = useRef();

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      if (numRef.current) numRef.current.textContent = `${value}${suffix}`;
      return;
    }

    const counter = { val: 0 };
    const tween = gsap.to(counter, {
      val: value,
      duration: 1.5,
      delay: 0.8,
      ease: "power2.out",
      snap: { val: 1 },
      onUpdate: () => {
        if (numRef.current) {
          numRef.current.textContent = `${Math.floor(counter.val)}${suffix}`;
        }
      },
    });

    return () => tween.kill();
  }, [value, suffix]);

  return (
    <div className="hero-stat">
      <div ref={numRef} className="font-display text-3xl font-semibold text-paper">
        0
      </div>
      <div className="mt-1.5 font-mono text-[11px] text-dim">{label}</div>
    </div>
  );
}
