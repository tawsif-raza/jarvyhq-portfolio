import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const rootRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-eyebrow", { opacity: 0, y: 16, duration: 0.6 })
        .from(
          ".hero-line",
          { opacity: 0, y: 40, duration: 0.9, stagger: 0.12 },
          "-=0.3"
        )
        .from(".hero-sub", { opacity: 0, y: 20, duration: 0.7 }, "-=0.5")
        .from(
          ".hero-cta",
          { opacity: 0, y: 16, duration: 0.6, stagger: 0.1 },
          "-=0.4"
        )
        .from(
          ".hero-stat",
          { opacity: 0, y: 12, duration: 0.5, stagger: 0.08 },
          "-=0.3"
        );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="hero"
      className="relative flex min-h-screen flex-col justify-center px-6 md:px-16 lg:px-24"
    >
      <p className="hero-eyebrow mb-4 font-mono text-xs tracking-[0.3em] text-glow uppercase text-cyan-300/80">
        Mohammad Tawsif Raza Khan · AI/ML Engineer in progress
      </p>

      <h1 className="font-display max-w-4xl text-[13vw] leading-[0.95] font-semibold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
        <span className="hero-line block">Building agentic</span>
        <span className="hero-line block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-white">
          AI systems
        </span>
        <span className="hero-line block">that ship.</span>
      </h1>

      <p className="hero-sub mt-8 max-w-xl text-base leading-relaxed text-mist md:text-lg">
        I design and build production-grade agentic systems — for a
        telehealth startup, for clients, and for myself. LangGraph,
        RAG, automation pipelines, and the occasional 3D scene, like
        this one.
      </p>

      <div className="mt-10 flex flex-wrap items-center gap-4">
        <a
          href="#projects"
          className="hero-cta rounded-full bg-white px-7 py-3 text-sm font-semibold text-black transition hover:bg-cyan-200"
        >
          View Projects
        </a>
        <a
          href="#contact"
          className="hero-cta rounded-full border border-white/20 px-7 py-3 text-sm font-semibold text-white/90 transition hover:border-white/50 hover:bg-white/5"
        >
          Hire / Contact
        </a>
      </div>

      <div className="mt-16 grid max-w-md grid-cols-3 gap-6 border-t border-white/10 pt-6">
        <Stat value="~1 yr" label="Self-directed AI/ML build" />
        <Stat value="12+" label="Systems shipped" />
        <Stat value="8→9" label="Live personal projects" />
      </div>

      <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-xs uppercase tracking-widest text-mist">
        scroll
      </div>
    </section>
  );
}

function Stat({ value, label }) {
  return (
    <div className="hero-stat">
      <div className="font-display text-2xl font-semibold text-white">
        {value}
      </div>
      <div className="mt-1 text-xs leading-tight text-mist">{label}</div>
    </div>
  );
}
