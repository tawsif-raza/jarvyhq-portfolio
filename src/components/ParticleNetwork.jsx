import { useEffect, useRef } from "react";

// Two focal zones matching the CSS atmosphere glows (top-right, bottom-left),
// so the network has real directorial emphasis instead of uniform density --
// this is what makes it read as "designed" rather than "randomly scattered."
const FOCAL_ZONES = [
  { xFrac: 0.82, yFrac: 0.08, weight: 0.42, spread: 0.42 },
  { xFrac: 0.1, yFrac: 0.92, weight: 0.36, spread: 0.4 },
];

// Section-aware "energy" -- the ambient computational environment should
// feel alive and responsive to where the visitor is, not fight the content.
// Hero gets full energy; reading-heavy or closing sections calm down.
// This drives three things per frame: how many particles read as visible
// (density), how bright they are (opacity), and how fast they drift
// (motion speed) -- see `visibility` below and the intensity scalars in
// drawFrame()/step().
const SECTION_INTENSITY = {
  hero: 1,
  about: 0.45,
  projects: 0.75,
  skills: 0.55,
  services: 0.6,
  contact: 0.35,
};
const SECTION_IDS = Object.keys(SECTION_INTENSITY);
const REFERENCE_LINE = 160;

function gaussianOffset(spread) {
  // Box-Muller, clamped -- gives a soft cluster falloff rather than a hard-edged blob.
  let u = 0,
    v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  const n = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  return Math.max(-1, Math.min(1, n * spread));
}

function pickViewportTuning(width) {
  if (width < 640) return { count: 70, connectDist: 130, mouseDist: 150 };
  if (width < 1024) return { count: 110, connectDist: 170, mouseDist: 190 };
  return { count: 170, connectDist: 210, mouseDist: 220 };
}

export default function ParticleNetwork() {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width, height, particles, tuning;
    let mouse = { x: -9999, y: -9999 };
    let rafId;

    // Current is eased toward target every frame so a section change
    // reads as a graceful dim/brighten rather than a jump cut. Both live
    // in refs (not React state) since this is a pure imperative rAF loop.
    const intensity = { current: 1, target: 1 };

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      // Set both the drawing-buffer resolution AND the CSS box size
      // explicitly -- a fixed-position canvas does not reliably stretch
      // via inset-0 alone (replaced elements keep their intrinsic size),
      // so this is set directly rather than relying on CSS to stretch it.
      canvas.width = width;
      canvas.height = height;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      tuning = pickViewportTuning(width);
    }

    function spawnPoint() {
      // ~55% of particles cluster (softly) around one of the two focal
      // zones; the rest fill in as ambient field so it never looks empty
      // elsewhere. This creates "selected regions with stronger emphasis"
      // rather than every node being equally prominent.
      if (Math.random() < 0.55) {
        const roll = Math.random();
        let acc = 0;
        for (const zone of FOCAL_ZONES) {
          acc += zone.weight;
          if (roll <= acc) {
            const x = zone.xFrac * width + gaussianOffset(zone.spread) * width;
            const y = zone.yFrac * height + gaussianOffset(zone.spread) * height;
            return {
              x: Math.max(0, Math.min(width, x)),
              y: Math.max(0, Math.min(height, y)),
              depth: 0.55 + Math.random() * 0.45, // focal particles skew "nearer"
            };
          }
        }
      }
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        depth: 0.15 + Math.random() * 0.55, // ambient fill skews "farther"
      };
    }

    function init() {
      particles = Array.from({ length: tuning.count }, () => {
        const p = spawnPoint();
        return {
          ...p,
          vx: (Math.random() - 0.5) * 0.3 * p.depth,
          vy: (Math.random() - 0.5) * 0.3 * p.depth,
          r: 1 + p.depth * 2.8,
          // A stable per-particle threshold, not a per-frame random
          // choice -- this is what makes "fewer particles visible at low
          // intensity" read as a designed density change rather than a
          // flicker. Combined with a soft ramp (not a hard cutoff) below.
          prominence: Math.random(),
        };
      });
    }

    function visibilityOf(p) {
      return Math.max(0, Math.min(1, 1 - (p.prominence - intensity.current) * 2.5));
    }

    function drawFrame() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const visA = visibilityOf(particles[i]);
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const visB = visibilityOf(b);
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < tuning.connectDist) {
            const depthPair = (a.depth + b.depth) / 2;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(214,164,102,${
              0.34 * depthPair * (1 - d / tuning.connectDist) * Math.min(visA, visB)
            })`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        // Mouse-follow line stays at full strength regardless of section --
        // it's direct feedback to the visitor's own input, not ambient
        // decoration, so it shouldn't be dampened by the reading-focus system.
        const dm = Math.hypot(particles[i].x - mouse.x, particles[i].y - mouse.y);
        if (dm < tuning.mouseDist) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(237,214,168,${0.6 * (1 - dm / tuning.mouseDist)})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }

      for (const p of particles) {
        const vis = visibilityOf(p);
        if (vis <= 0.01) continue;

        // Soft halo behind the core dot, scaled by depth, for a glowing-ember
        // feel where nearer particles genuinely read as brighter/bigger.
        const halo = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 5);
        halo.addColorStop(0, `rgba(214,158,90,${0.3 * p.depth * vis})`);
        halo.addColorStop(1, "rgba(214,158,90,0)");
        ctx.beginPath();
        ctx.fillStyle = halo;
        ctx.arc(p.x, p.y, p.r * 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(237,214,168,${(0.35 + 0.55 * p.depth) * vis})`;
        ctx.fill();
      }
    }

    function step() {
      intensity.current += (intensity.target - intensity.current) * 0.04;
      // Calmer sections drift more slowly, not just dimmer -- reinforces
      // "structured and controlled" / "calm and minimal" beyond opacity alone.
      const speed = 0.5 + 0.5 * intensity.current;
      for (const p of particles) {
        p.x += p.vx * speed;
        p.y += p.vy * speed;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      }
      drawFrame();
      rafId = requestAnimationFrame(step);
    }

    const handleMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const handleLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        resize();
        init();
        drawFrame();
      }, 150);
    };

    // Deterministic scroll-spy, deliberately self-contained here (not
    // shared with Nav's already-verified version) -- this runs inside a
    // pure imperative rAF loop and needs a ref target, not React state
    // that would trigger re-renders/effect churn on every section change.
    let scrollTicking = false;
    const updateIntensityTarget = () => {
      scrollTicking = false;
      const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean);
      if (!sections.length) return;
      let current = sections[0].id;
      for (const s of sections) {
        if (s.getBoundingClientRect().top <= REFERENCE_LINE) current = s.id;
      }
      const atBottom =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
      if (atBottom) current = sections[sections.length - 1].id;
      intensity.target = SECTION_INTENSITY[current] ?? 1;
    };
    const onScroll = () => {
      if (!scrollTicking) {
        scrollTicking = true;
        requestAnimationFrame(updateIntensityTarget);
      }
    };

    resize();
    init();
    drawFrame(); // paint an initial frame immediately, don't wait on rAF
    window.addEventListener("resize", handleResize);

    if (!reduceMotion) {
      window.addEventListener("mousemove", handleMove);
      window.addEventListener("mouseout", handleLeave);
      window.addEventListener("scroll", onScroll, { passive: true });
      updateIntensityTarget();
      intensity.current = intensity.target; // start settled, not mid-ease, on load
      rafId = requestAnimationFrame(step);
    }

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseout", handleLeave);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -2,
        pointerEvents: "none",
      }}
    />
  );
}
