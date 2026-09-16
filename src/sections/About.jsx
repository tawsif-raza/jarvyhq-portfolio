import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const rootRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(rootRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 78%" },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="about"
      className="relative mx-auto max-w-2xl px-6 py-32 md:px-16 lg:px-24"
    >
      <h2 className="font-display mb-10 text-3xl leading-tight text-paper md:text-4xl">
        I didn't take a break from my career. I rebuilt it, deliberately.
      </h2>

      <div className="space-y-6 text-[17px] leading-relaxed text-dim">
        <p>
          In May 2025, I stepped away from the day-to-day to go all-in on
          AI/ML — 12 to 16 hours a day, for 15 months, studying the math,
          the systems, and the communication skills that move a project
          from idea to production. It wasn't a gap. It was the most
          deliberate thing I've done for my career.
        </p>
        <p>
          Today I work in a customer-facing role at a healthcare-tech
          startup while actively transitioning into ML Engineering —
          building and shipping agentic AI systems on my own time, for
          myself and for clients, alongside a BCA in AI/ML Specialization
          at Amity University Online.
        </p>
        <p>
          Everything in the next section is something I built, broke, and
          rebuilt myself over the last year.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-2 gap-8 border-t border-line pt-8 sm:grid-cols-4">
        <Fact k="15 mo" v="self-directed study" />
        <Fact k="12–16 hrs" v="daily, during the break" />
        <Fact k="BCA AI/ML" v="Amity University Online" />
        <Fact k="1 yr" v="building in production" />
      </div>
    </section>
  );
}

function Fact({ k, v }) {
  return (
    <div>
      <div className="font-display text-xl text-paper">{k}</div>
      <div className="mt-1 font-mono text-[11px] text-dim">{v}</div>
    </div>
  );
}
