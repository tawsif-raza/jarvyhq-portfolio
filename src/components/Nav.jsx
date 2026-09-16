import { useState } from "react";

const LINKS = [
  { href: "#about", label: "01 About" },
  { href: "#projects", label: "02 Work" },
  { href: "#skills", label: "03 Skills" },
  { href: "#services", label: "04 Services" },
  { href: "#contact", label: "05 Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-6 md:px-16 lg:px-24">
        <a href="#hero" className="font-display text-sm text-paper">
          T.R.K
        </a>

        <nav className="hidden gap-8 font-mono text-[11px] tracking-wide text-dim sm:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-accent">
              {l.label}
            </a>
          ))}
        </nav>

        <button
          onClick={() => setOpen((o) => !o)}
          className="font-mono text-[11px] tracking-wide text-dim transition hover:text-accent sm:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? "close" : "menu"}
        </button>
      </header>

      {open && (
        <div className="fixed inset-0 z-30 flex flex-col items-start justify-center gap-6 bg-bg px-6 sm:hidden">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-display text-3xl text-paper transition hover:text-accent"
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
