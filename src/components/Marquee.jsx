import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Marquee({ text }) {
  const trackRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(trackRef.current, {
        xPercent: -50,
        duration: 22,
        repeat: -1,
        ease: "none",
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="overflow-hidden border-y border-line py-5">
      <div ref={trackRef} className="flex w-max gap-10 whitespace-nowrap">
        {[0, 1].map((rep) => (
          <span key={rep} className="flex gap-10 pr-10">
            {Array.from({ length: 6 }).map((_, i) => (
              <span
                key={i}
                className="font-display text-xl text-dim md:text-2xl"
              >
                {text}
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}
