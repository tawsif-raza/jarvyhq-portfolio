export default function Nav() {
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-6 md:px-16 lg:px-24">
        <a href="#hero" className="font-display text-sm text-paper">
          T.R.K
        </a>
        <nav className="hidden gap-8 font-mono text-[11px] tracking-wide text-dim sm:flex">
          <a href="#about" className="transition hover:text-accent">
            01 About
          </a>
          <a href="#projects" className="transition hover:text-accent">
            02 Work
          </a>
          <a href="#skills" className="transition hover:text-accent">
            03 Skills
          </a>
          <a href="#services" className="transition hover:text-accent">
            04 Services
          </a>
          <a href="#contact" className="transition hover:text-accent">
            05 Contact
          </a>
        </nav>
      </header>

      <div className="fixed bottom-6 right-6 z-40 hidden flex-col items-end gap-1 font-mono text-[10px] text-[#6b6350] md:flex">
        <span>FOR INQUIRIES</span>
        <a href="mailto:tawsifk35@gmail.com" className="text-dim transition hover:text-accent">
          tawsifk35@gmail.com
        </a>
      </div>
    </>
  );
}
