import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RevealText from "../components/RevealText";
import SectionLabel from "../components/SectionLabel";

gsap.registerPlugin(ScrollTrigger);

const TIMELINE = [
  {
    date: "Sep 2026",
    title: "Current",
    desc: "Building AI systems for clients and shipping agentic pipelines. Customer-facing role at a healthcare-tech startup while transitioning into ML Engineering.",
    active: true,
  },
  {
    date: "May 2025",
    title: "Career pivot — went all-in on AI/ML",
    desc: "12 to 16 hours a day, for 15 months. Studied the math, the systems, and the communication skills that move a project from idea to production.",
    active: false,
  },
  {
    date: "2025",
    title: "BCA in AI/ML Specialization",
    desc: "Enrolled at Amity University Online — combining formal education with hands-on building.",
    active: false,
  },
  {
    date: "2024",
    title: "First production builds",
    desc: "Started building and breaking real systems. Everything in the projects section is from this period onward.",
    active: false,
  },
];

const FACTS = [
  { icon: "⏱", k: "15 mo", v: "self-directed study" },
  { icon: "🔥", k: "12–16 hrs", v: "daily, during the break" },
  { icon: "🎓", k: "BCA AI/ML", v: "Amity University Online" },
  { icon: "🚀", k: "1 yr", v: "building in production" },
];

export default function About() {
  const rootRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-timeline-node", {
        opacity: 0,
        x: -20,
        duration: 0.6,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 78%" },
      });
      gsap.from(".about-fact", {
        opacity: 0,
        y: 16,
        duration: 0.5,
        stagger: 0.06,
        ease: "power2.out",
        scrollTrigger: { trigger: ".about-facts-grid", start: "top 85%" },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="about"
      className="reading-scrim reading-scrim--center relative mx-auto max-w-4xl overflow-hidden px-6 py-32 md:px-16 lg:px-24"
    >
      <SectionLabel number="01" title="ABOUT" />

      <RevealText
        text="I didn't take a break from my career. I rebuilt it, deliberately."
        className="font-display mb-10 text-3xl font-medium leading-tight text-paper md:text-4xl"
      />

      <p className="mb-14 max-w-2xl text-[17px] leading-relaxed tracking-[0.005em] text-dim">
        In May 2025, I stepped away from the day-to-day to go all-in on
        AI/ML. It wasn't a gap. It was the most deliberate thing I've done
        for my career. Everything in the projects section is something I
        built, broke, and rebuilt myself over the last year.
      </p>

      {/* Timeline */}
      <div className="timeline mb-16">
        {TIMELINE.map((t) => (
          <div
            key={t.date}
            className={`timeline-node about-timeline-node ${t.active ? "timeline-node--active" : ""}`}
          >
            <span className="font-mono text-[10px] uppercase tracking-wider text-accent-dim">
              {t.date}
            </span>
            <h3 className="font-display mt-1 text-lg font-medium text-paper">{t.title}</h3>
            <p className="mt-1.5 max-w-lg text-[14px] leading-relaxed text-dim">{t.desc}</p>
          </div>
        ))}
      </div>

      {/* Facts grid */}
      <div className="about-facts-grid grid grid-cols-2 gap-4 sm:grid-cols-4">
        {FACTS.map((f) => (
          <div key={f.k} className="about-fact glass-card p-4 text-center">
            <span className="mb-2 block text-xl">{f.icon}</span>
            <div className="font-display text-xl font-semibold text-paper">{f.k}</div>
            <div className="mt-1 font-mono text-[10px] text-dim">{f.v}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
