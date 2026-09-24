import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef = useRef();
  const ringRef = useRef();
  const labelRef = useRef();

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const labelEl = labelRef.current;
    if (!dot || !ring || window.matchMedia("(hover: none)").matches) return;

    // Razor-sharp response for dot, smooth GPU trailing for ring
    const quickDotX = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power2.out" });
    const quickDotY = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power2.out" });
    const quickRingX = gsap.quickTo(ring, "x", { duration: 0.32, ease: "power3.out" });
    const quickRingY = gsap.quickTo(ring, "y", { duration: 0.32, ease: "power3.out" });

    const move = (e) => {
      quickDotX(e.clientX);
      quickDotY(e.clientY);
      quickRingX(e.clientX);
      quickRingY(e.clientY);
    };

    const onOver = (e) => {
      const target = e.target.closest?.("a, button, [role='button'], input, textarea");
      if (!target) return;
      const cursorLabel = target.getAttribute("data-cursor");

      if (cursorLabel) {
        gsap.to(dot, {
          scale: 5.6,
          duration: 0.22,
          ease: "power2.out",
          overwrite: "auto",
        });
        gsap.to(ring, {
          scale: 2,
          opacity: 0.6,
          borderColor: "var(--color-accent)",
          duration: 0.25,
          overwrite: "auto",
        });
        if (labelEl) {
          labelEl.textContent = cursorLabel;
          labelEl.style.opacity = "1";
        }
      } else {
        gsap.to(dot, {
          scale: 1.6,
          duration: 0.18,
          ease: "power2.out",
          overwrite: "auto",
        });
        gsap.to(ring, {
          scale: 1.33,
          opacity: 0.5,
          duration: 0.22,
          overwrite: "auto",
        });
        if (labelEl) {
          labelEl.style.opacity = "0";
        }
      }
    };

    const onOut = (e) => {
      const target = e.target.closest?.("a, button, [role='button'], input, textarea");
      if (!target) return;
      gsap.to(dot, { scale: 1, duration: 0.18, ease: "power2.out", overwrite: "auto" });
      gsap.to(ring, { scale: 1, opacity: 0.3, duration: 0.25, overwrite: "auto" });
      if (labelEl) {
        labelEl.style.opacity = "0";
      }
    };

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseout", onOut, { passive: true });

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring pointer-events-none" />
      <div ref={dotRef} className="cursor-dot flex items-center justify-center pointer-events-none">
        <span
          ref={labelRef}
          className="whitespace-nowrap font-mono text-[9px] font-medium uppercase tracking-wider text-[#0b0a08] opacity-0 transition-opacity duration-150"
        />
      </div>
    </>
  );
}
