import { useRef } from "react";
import gsap from "gsap";

export default function Magnetic({ children, className }) {
  const ref = useRef();

  const handleMove = (e) => {
    const el = ref.current;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(el, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: "power2.out" });
  };

  const handleLeave = () => {
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.4, ease: "elastic.out(1, 0.4)" });
  };

  return (
    <span
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`inline-block ${className || ""}`}
    >
      {children}
    </span>
  );
}
