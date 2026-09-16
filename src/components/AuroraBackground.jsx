import { useEffect, useRef } from "react";
import gsap from "gsap";

// Aurora/mesh-gradient background -- the current standard treatment for
// AI/dev-tool product sites (Linear, Vercel, Stripe). Kept strictly within
// this site's amber/copper/gold family instead of the generic purple-blue
// rainbow version, so it reads as "this site's background" rather than a
// stock effect. Blobs drift and breathe slowly; grain (in index.css) sits
// on top to prevent banding.

export default function AuroraBackground() {
  const rootRef = useRef();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.to(".aurora-blob-1", {
        x: "+=120",
        y: "-=60",
        scale: 1.15,
        duration: 26,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".aurora-blob-2", {
        x: "-=90",
        y: "+=80",
        scale: 1.1,
        duration: 32,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".aurora-blob-3", {
        x: "+=70",
        y: "+=50",
        scale: 1.2,
        duration: 22,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="fixed inset-0 -z-10 overflow-hidden">
      <div
        className="aurora-blob-1 absolute h-[700px] w-[700px] rounded-full"
        style={{
          top: "-15%",
          left: "-10%",
          background:
            "radial-gradient(circle, rgba(201,138,59,0.22) 0%, rgba(201,138,59,0.08) 45%, transparent 72%)",
          filter: "blur(110px)",
        }}
      />
      <div
        className="aurora-blob-2 absolute h-[600px] w-[600px] rounded-full"
        style={{
          top: "35%",
          right: "-15%",
          background:
            "radial-gradient(circle, rgba(138,74,42,0.20) 0%, rgba(138,74,42,0.07) 45%, transparent 72%)",
          filter: "blur(120px)",
        }}
      />
      <div
        className="aurora-blob-3 absolute h-[550px] w-[550px] rounded-full"
        style={{
          bottom: "-10%",
          left: "20%",
          background:
            "radial-gradient(circle, rgba(107,90,42,0.18) 0%, rgba(107,90,42,0.06) 45%, transparent 72%)",
          filter: "blur(110px)",
        }}
      />
    </div>
  );
}
