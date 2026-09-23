import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const LINKS = [
  { href: "#about", label: "About", id: "about" },
  { href: "#projects", label: "Work", id: "projects" },
  { href: "#skills", label: "Skills", id: "skills" },
  { href: "#services", label: "Services", id: "services" },
  { href: "#contact", label: "Contact", id: "contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(null);
  const mobileMenuRef = useRef();

  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean);
    if (!sections.length) return;

    const REFERENCE_LINE = 160;
    let ticking = false;

    const update = () => {
      ticking = false;
      setScrolled(window.scrollY > 40);

      let current = sections[0].id;
      for (const s of sections) {
        if (s.getBoundingClientRect().top <= REFERENCE_LINE) current = s.id;
      }

      const atBottom =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
      if (atBottom) current = sections[sections.length - 1].id;

      setActive(current);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape closes mobile menu
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // GSAP stagger animation for mobile menu
  useEffect(() => {
    if (!open || !mobileMenuRef.current) return;
    const links = mobileMenuRef.current.querySelectorAll(".mobile-nav-link");
    gsap.fromTo(
      links,
      { opacity: 0, x: 40 },
      { opacity: 1, x: 0, duration: 0.4, stagger: 0.06, ease: "power3.out" }
    );
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-5 transition-all duration-300 md:px-16 lg:px-24 ${
          scrolled ? "bg-bg/80 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <a href="#hero" className="font-display text-sm font-medium text-paper">
          T.R.K
        </a>

        <div className="flex items-center gap-5">
          <nav className="hidden gap-7 font-mono text-[11px] tracking-wide text-dim sm:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                aria-current={active === l.id ? "location" : undefined}
                className={`nav-link transition hover:text-accent ${
                  active === l.id ? "text-accent" : ""
                }`}
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Command palette trigger */}
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("open-command-palette"))}
            className="flex items-center gap-1.5 rounded-sm border border-line px-2.5 py-1 font-mono text-[10px] text-dim transition hover:border-accent hover:text-accent"
            aria-label="Open command palette"
          >
            <span aria-hidden="true">⌘K</span>
          </button>

          {/* Resume CTA — desktop only */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-sm bg-accent px-4 py-1.5 font-mono text-[10px] font-medium text-[#0b0a08] transition hover:bg-[#dda257] sm:inline-block"
          >
            Resume
          </a>

          <button
            onClick={() => setOpen((o) => !o)}
            className="font-mono text-[11px] tracking-wide text-dim transition hover:text-accent sm:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? "close" : "menu"}
          </button>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      {open && (
        <div
          ref={mobileMenuRef}
          className="fixed inset-0 z-30 flex flex-col items-start justify-center gap-6 bg-bg/95 px-6 backdrop-blur-md sm:hidden"
        >
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              aria-current={active === l.id ? "location" : undefined}
              className={`mobile-nav-link font-display text-3xl font-medium transition hover:text-accent ${
                active === l.id ? "text-accent" : "text-paper"
              }`}
            >
              {l.label}
            </a>
          ))}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="mobile-nav-link mt-4 rounded-sm bg-accent px-5 py-2.5 text-sm font-medium text-[#0b0a08]"
          >
            Download Resume
          </a>
        </div>
      )}

      <div className="fixed bottom-6 right-6 z-40 hidden flex-col items-end gap-1 font-mono text-[10px] text-[#6b6350] md:flex">
        <span>FOR INQUIRIES</span>
        <a href="mailto:tawsifk35@gmail.com" className="text-dim transition hover:text-accent">
          tawsifk35@gmail.com
        </a>
      </div>
    </>
  );
}
