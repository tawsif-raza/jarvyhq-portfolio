import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef = useRef();
  const [label, setLabel] = useState("");

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot || window.matchMedia("(hover: none)").matches) return;

    const quickX = gsap.quickTo(dot, "x", { duration: 0.5, ease: "power3.out" });
    const quickY = gsap.quickTo(dot, "y", { duration: 0.5, ease: "power3.out" });

    const move = (e) => {
      quickX(e.clientX);
      quickY(e.clientY);
    };

    // Event delegation on document rather than a one-time querySelectorAll
    // snapshot at mount -- the previous version only ever saw whatever
    // links/buttons existed the instant it ran, so anything rendered
    // slightly later would silently miss the hover treatment. This
    // correctly covers every interactive element, present or future.
    const onOver = (e) => {
      const target = e.target.closest?.("a, button");
      if (!target) return;
      const cursorLabel = target.getAttribute("data-cursor");
      gsap.to(dot, {
        width: cursorLabel ? 64 : 32,
        height: cursorLabel ? 64 : 32,
        duration: 0.25,
      });
      setLabel(cursorLabel || "");
    };

    const onOut = (e) => {
      const target = e.target.closest?.("a, button");
      if (!target) return;
      gsap.to(dot, { width: 10, height: 10, duration: 0.25 });
      setLabel("");
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  return (
    <div ref={dotRef} className="cursor-dot flex items-center justify-center">
      {label && (
        <span className="whitespace-nowrap font-mono text-[9px] uppercase tracking-wide">
          {label}
        </span>
      )}
    </div>
  );
}
