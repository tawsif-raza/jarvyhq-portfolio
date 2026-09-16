import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef = useRef();

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot || window.matchMedia("(hover: none)").matches) return;

    const quickX = gsap.quickTo(dot, "x", { duration: 0.5, ease: "power3.out" });
    const quickY = gsap.quickTo(dot, "y", { duration: 0.5, ease: "power3.out" });

    const move = (e) => {
      quickX(e.clientX);
      quickY(e.clientY);
    };

    const grow = () => gsap.to(dot, { width: 32, height: 32, duration: 0.25 });
    const shrink = () => gsap.to(dot, { width: 10, height: 10, duration: 0.25 });

    window.addEventListener("mousemove", move);

    const interactive = document.querySelectorAll("a, button");
    interactive.forEach((el) => {
      el.addEventListener("mouseenter", grow);
      el.addEventListener("mouseleave", shrink);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      interactive.forEach((el) => {
        el.removeEventListener("mouseenter", grow);
        el.removeEventListener("mouseleave", shrink);
      });
    };
  }, []);

  return <div ref={dotRef} className="cursor-dot" />;
}
