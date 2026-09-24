import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Magnetic({ children, className }) {
  const ref = useRef();
  const rectRef = useRef(null);
  const quickXRef = useRef(null);
  const quickYRef = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    quickXRef.current = gsap.quickTo(ref.current, "x", { duration: 0.3, ease: "power2.out" });
    quickYRef.current = gsap.quickTo(ref.current, "y", { duration: 0.3, ease: "power2.out" });
  }, []);

  const handleEnter = () => {
    if (ref.current) {
      rectRef.current = ref.current.getBoundingClientRect();
    }
  };

  const handleMove = (e) => {
    if (!rectRef.current && ref.current) {
      rectRef.current = ref.current.getBoundingClientRect();
    }
    const rect = rectRef.current;
    if (!rect) return;
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    quickXRef.current?.(x * 0.25);
    quickYRef.current?.(y * 0.25);
  };

  const handleLeave = () => {
    rectRef.current = null;
    if (ref.current) {
      gsap.to(ref.current, { x: 0, y: 0, duration: 0.4, ease: "elastic.out(1, 0.4)", overwrite: "auto" });
    }
  };

  return (
    <span
      ref={ref}
      onMouseEnter={handleEnter}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`inline-block ${className || ""}`}
    >
      {children}
    </span>
  );
}
