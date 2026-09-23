import Magnetic from "../components/Magnetic";

export default function ClosingCta() {
  return (
    <section
      aria-label="Collaboration and Inquiries"
      className="relative mx-auto max-w-5xl px-6 py-14 sm:py-16 md:px-16 lg:px-24"
    >
      <div className="glass-card relative overflow-hidden p-8 sm:p-10 text-center md:text-left">
        {/* Subtle Ambient Accent Glow */}
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/10 blur-3xl"
          aria-hidden="true"
        />

        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div className="max-w-xl">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
              Engineering Collaboration
            </span>
            <h2 className="font-display mt-2 text-2xl font-medium leading-snug text-paper sm:text-3xl">
              Building AI systems that move from experimentation to production.
            </h2>
            <p className="mt-2.5 text-[14px] leading-relaxed text-dim">
              Whether you need an autonomous agent pipeline architected, an outbound workflow automated,
              or an engineer to lead production AI initiatives — let&apos;s start a conversation.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center md:flex-col md:items-stretch shrink-0">
            <Magnetic>
              <a
                href="#contact"
                className="inline-block text-center rounded-sm bg-accent px-6 py-3 text-xs font-medium uppercase tracking-wider text-[#0b0a08] transition hover:bg-[#dda257]"
              >
                Discuss a Project
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="https://github.com/tawsif-raza"
                target="_blank"
                rel="noreferrer"
                className="inline-block text-center rounded-sm border border-line px-6 py-3 text-xs font-medium uppercase tracking-wider text-paper transition hover:border-accent hover:text-accent"
              >
                Explore GitHub ↗
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="https://linkedin.com/in/tawsif-khan-34952336b"
                target="_blank"
                rel="noreferrer"
                className="inline-block text-center rounded-sm border border-line/60 px-6 py-3 text-xs font-medium uppercase tracking-wider text-dim transition hover:border-dim hover:text-paper"
              >
                LinkedIn Profile ↗
              </a>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
