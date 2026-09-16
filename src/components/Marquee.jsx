import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Marquee({ text }) {
  const trackRef = useRef();
  const tweenRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      tweenRef.current = gsap.to(trackRef.current, {
        xPercent: -50,
        duration: 26,
        repeat: -1,
        ease: "none",
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-6 md:px-16 lg:px-24">
      <div
        className="overflow-hidden border-t border-line py-6"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
        }}
        onMouseEnter={() => tweenRef.current?.pause()}
        onMouseLeave={() => tweenRef.current?.play()}
      >
        <div ref={trackRef} className="flex w-max gap-16 whitespace-nowrap">
          {[0, 1].map((rep) => (
            <span key={rep} className="flex gap-16 pr-16">
              {Array.from({ length: 8 }).map((_, i) => (
                <span
                  key={i}
                  className="font-mono text-[11px] tracking-[0.15em] text-[#6b6350]"
                >
                  {text}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
