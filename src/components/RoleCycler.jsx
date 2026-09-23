import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const ROLES = [
  "AI/ML Engineer",
  "Automation Architect",
  "Agentic Systems Builder",
  "Full-Stack Developer",
];

export default function RoleCycler() {
  const [index, setIndex] = useState(0);
  const spanRef = useRef();
  const reduceMotionRef = useRef(false);

  useEffect(() => {
    reduceMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (reduceMotionRef.current) return;

    const interval = setInterval(() => {
      // Animate out
      gsap.to(spanRef.current, {
        opacity: 0,
        y: -8,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          setIndex((prev) => (prev + 1) % ROLES.length);
          // Animate in
          gsap.fromTo(
            spanRef.current,
            { opacity: 0, y: 8 },
            { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }
          );
        },
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span
      ref={spanRef}
      className="inline-block font-mono text-sm tracking-wide text-accent"
    >
      {ROLES[index]}
    </span>
  );
}
