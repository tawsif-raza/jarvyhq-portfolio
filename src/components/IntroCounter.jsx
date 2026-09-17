import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function IntroCounter({ onComplete }) {
  const numRef = useRef();
  const wrapRef = useRef();
  const [done, setDone] = useState(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const finish = () => {
      setDone(true);
      onCompleteRef.current?.();
    };

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      finish();
      return;
    }

    // Hard safety net: whatever else happens, never stay stuck on this
    // screen for more than 2.5s. This is the fix for the bug that caused
    // the whole site to appear frozen -- if GSAP or a ref ever fails
    // silently, this guarantees the real page still loads.
    const safety = setTimeout(finish, 2500);

    if (!wrapRef.current) {
      clearTimeout(safety);
      finish();
      return;
    }

    const counter = { val: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        clearTimeout(safety);
        finish();
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
    }).to(wrapRef.current, { opacity: 0, duration: 0.4 });

    return () => {
      clearTimeout(safety);
      tl.kill();
    };
  }, []); // run exactly once on mount -- never re-triggered by parent re-renders

  if (done) return null;

  return (
    <div
      ref={wrapRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-bg"
    >
      <span ref={numRef} className="font-mono text-sm text-dim">
        00
      </span>
    </div>
  );
}
