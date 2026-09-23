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

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !spanRef.current) return;

    let intervalId = null;

    const startCycling = () => {
      if (intervalId) return;
      intervalId = setInterval(() => {
        if (!spanRef.current) return;
        gsap.to(spanRef.current, {
          opacity: 0,
          y: -8,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => {
            setIndex((prev) => (prev + 1) % ROLES.length);
            if (spanRef.current) {
              gsap.fromTo(
                spanRef.current,
                { opacity: 0, y: 8 },
                { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }
              );
            }
          },
        });
      }, 3000);
    };

    const stopCycling = () => {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startCycling();
        } else {
          stopCycling();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(spanRef.current);

    return () => {
      stopCycling();
      observer.disconnect();
    };
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
