import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const rootRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-reveal", {
        opacity: 0,
        y: 50,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 75%",
        },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="about"
      className="relative mx-auto max-w-4xl px-6 py-32 md:px-16 lg:px-24"
    >
      <p className="about-reveal mb-6 font-mono text-xs uppercase tracking-[0.3em] text-cyan-300/70">
        About
      </p>

      <h2 className="about-reveal font-display mb-10 text-3xl font-semibold leading-tight md:text-5xl">
        I didn't take a break from my career.
        <br />
        <span className="text-mist">I rebuilt it, deliberately.</span>
      </h2>

      <div className="about-reveal space-y-6 text-base leading-relaxed text-mist md:text-lg">
        <p>
          In May 2025, I stepped away from the day-to-day to go all-in on
          AI/ML — 12 to 16 hours a day, for 15 months, studying the math,
          the systems, and the communication skills that actually move a
          project from idea to production. It wasn't a gap. It was the
          most deliberate thing I've done for my career.
        </p>
        <p>
          Today I work in a customer-facing role at a healthcare-tech
          startup while actively transitioning into ML Engineering —
          building and shipping agentic AI systems on my own time, for
          myself and for clients, in parallel with a BCA in AI/ML
          Specialization at Amity University Online.
        </p>
        <p>
          Everything on this page — the projects, the systems, even the
          scene rendering behind this text — is something I built,
          broke, and rebuilt myself over the last year.
        </p>
      </div>

      <div className="about-reveal mt-14 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-4">
        <Fact k="15 mo" v="Self-directed study" />
        <Fact k="12–16 hrs" v="Daily, during the break" />
        <Fact k="BCA AI/ML" v="Amity University Online" />
        <Fact k="1 yr" v="Building in production" />
      </div>
    </section>
  );
}

function Fact({ k, v }) {
  return (
    <div>
      <div className="font-display text-xl font-semibold text-white md:text-2xl">
        {k}
      </div>
      <div className="mt-1 text-xs leading-tight text-mist">{v}</div>
    </div>
  );
}
