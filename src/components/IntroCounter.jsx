import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function IntroCounter({ onComplete }) {
  const numRef = useRef();
  const wrapRef = useRef();
  const [done, setDone] = useState(false);

  useEffect(() => {
    const counter = { val: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(wrapRef.current, {
          opacity: 0,
          duration: 0.5,
          onComplete: () => {
            setDone(true);
            onComplete?.();
          },
        });
      },
    });

    tl.to(counter, {
      val: 100,
      duration: 1.1,
      ease: "power2.inOut",
      onUpdate: () => {
        if (numRef.current) {
          numRef.current.textContent = String(Math.floor(counter.val)).padStart(2, "0");
        }
      },
    });

    return () => tl.kill();
  }, [onComplete]);

  if (done) return null;

  return (
    <div
      ref={wrapRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-bg"
    >
      <span
        ref={numRef}
        className="font-mono text-sm tracking-[0.3em] text-dim"
      >
        00
      </span>
    </div>
  );
}
