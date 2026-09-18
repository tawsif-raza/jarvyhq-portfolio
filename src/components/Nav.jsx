import { useEffect, useState } from "react";

const LINKS = [
  { href: "#about", label: "01 About", id: "about" },
  { href: "#projects", label: "02 Work", id: "projects" },
  { href: "#skills", label: "03 Skills", id: "skills" },
  { href: "#services", label: "04 Services", id: "services" },
  { href: "#contact", label: "05 Contact", id: "contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(null);

  // Scroll-state background (transparent at top, otherwise the marquee
  // ticker visibly bleeds through the fixed header) and the active-section
  // indicator both derive from scroll position, so they share one
  // rAF-throttled listener.
  //
  // Active section uses the standard scroll-spy algorithm: walk the
  // sections in order and take the last one whose top has scrolled past
  // a fixed reference line near the header. This gives exactly one
  // deterministic answer at any scroll position. An earlier version used
  // an IntersectionObserver with a percentage-based viewport band, but
  // that produces ambiguous results whenever two short adjacent sections
  // (e.g. Skills/Services) are both partially inside the band at once --
  // verified via instrumentation, not assumed.
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

      // A short trailing section can have its top permanently above the
      // reference line if the document doesn't have enough scrollable
      // height left to push it past the threshold -- verified: Contact
      // (705px tall) never crossed the line here since the page runs out
      // of scroll room first. Force the last section active once the
      // user has scrolled to (or within a couple px of) the bottom.
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

  // Escape closes the mobile full-screen menu.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-6 transition-colors duration-300 md:px-16 lg:px-24 ${
          scrolled ? "bg-bg/80 backdrop-blur-sm" : "bg-transparent"
        }`}
      >
        <a href="#hero" className="font-display text-sm font-medium text-paper">
          T.R.K
        </a>

        <div className="flex items-center gap-5">
          <nav className="hidden gap-8 font-mono text-[11px] tracking-wide text-dim sm:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                aria-current={active === l.id ? "location" : undefined}
                className={`transition hover:text-accent ${
                  active === l.id ? "text-accent" : ""
                }`}
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Visible command-palette trigger -- keyboard users already have
              Cmd/Ctrl+K, but that shortcut is invisible unless discovered.
              This dispatches a custom event rather than lifting state,
              so CommandPalette stays fully self-contained and Nav's own
              scroll-spy/menu logic below is untouched. */}
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("open-command-palette"))}
            className="flex items-center gap-1.5 rounded-sm border border-line px-2.5 py-1 font-mono text-[10px] text-dim transition hover:border-accent hover:text-accent"
            aria-label="Open command palette"
          >
            <span aria-hidden="true">⌘K</span>
          </button>

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

      {open && (
        <div className="fixed inset-0 z-30 flex flex-col items-start justify-center gap-6 bg-bg px-6 sm:hidden">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              aria-current={active === l.id ? "location" : undefined}
              className={`font-display text-3xl font-medium transition hover:text-accent ${
                active === l.id ? "text-accent" : "text-paper"
              }`}
            >
              {l.label}
            </a>
          ))}
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
