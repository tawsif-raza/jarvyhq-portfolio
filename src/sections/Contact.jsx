import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RevealText from "../components/RevealText";
import Magnetic from "../components/Magnetic";
import SectionLabel from "../components/SectionLabel";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const rootRef = useRef();
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-reveal", {
        opacity: 0,
        y: 20,
        duration: 0.7,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 78%", once: true },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    const formData = new FormData(e.target);

    try {
      await fetch("https://formspree.io/f/xvgozzwn", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      setSubmitted(true);
    } catch {
      // Fallback: open mailto
      const name = formData.get("name");
      const email = formData.get("email");
      const message = formData.get("message");
      window.location.href = `mailto:tawsifk35@gmail.com?subject=Portfolio inquiry from ${name}&body=${encodeURIComponent(message)}%0A%0AFrom: ${email}`;
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      ref={rootRef}
      id="contact"
      className="reading-scrim reading-scrim--center relative mx-auto max-w-4xl overflow-hidden px-6 py-32 md:px-16 lg:px-24"
    >
      <SectionLabel number="05" title="CONTACT" />

      <p className="contact-reveal mb-6 font-mono text-xs text-[#6b6350]">
        Currently in Bengaluru, working with people anywhere.
      </p>

      <RevealText
        text="Building something worth talking about? Let's talk."
        className="contact-reveal font-display mb-10 max-w-xl text-3xl font-medium leading-tight text-paper md:text-5xl"
      />

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        {/* Contact Form */}
        <div className="contact-reveal">
          {submitted ? (
            <div className="glass-card flex flex-col items-center justify-center p-10 text-center">
              <span className="mb-3 text-3xl">✓</span>
              <h3 className="font-display text-xl font-medium text-paper">Message sent!</h3>
              <p className="mt-2 text-[14px] text-dim">I'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-field">
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your name"
                  className="form-input"
                  autoComplete="name"
                />
              </div>
              <div className="form-field">
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Your email"
                  className="form-input"
                  autoComplete="email"
                />
              </div>
              <div className="form-field">
                <textarea
                  name="message"
                  required
                  placeholder="Tell me about your project..."
                  className="form-input"
                  rows="5"
                />
              </div>
              <Magnetic>
                <button
                  type="submit"
                  disabled={sending}
                  className="inline-block rounded-sm bg-accent px-7 py-3.5 text-sm font-medium text-[#0b0a08] transition hover:bg-[#dda257] disabled:opacity-50"
                >
                  {sending ? "Sending..." : "Send message"}
                </button>
              </Magnetic>
            </form>
          )}
        </div>

        {/* Contact cards */}
        <div className="contact-reveal flex flex-col gap-4">
          <Magnetic>
            <a
              href="mailto:tawsifk35@gmail.com"
              data-cursor="Email"
              className="glass-card flex items-center gap-4 p-5 transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c98a3b" strokeWidth="1.5">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 4L12 13 2 4" />
              </svg>
              <div>
                <div className="font-mono text-[11px] text-[#6b6350]">Email</div>
                <div className="text-[14px] text-paper">tawsifk35@gmail.com</div>
              </div>
            </a>
          </Magnetic>

          <Magnetic>
            <a
              href="https://github.com/tawsif-raza"
              target="_blank"
              rel="noreferrer"
              className="glass-card flex items-center gap-4 p-5 transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#c98a3b">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <div>
                <div className="font-mono text-[11px] text-[#6b6350]">GitHub</div>
                <div className="text-[14px] text-paper">tawsif-raza</div>
              </div>
            </a>
          </Magnetic>

          <Magnetic>
            <a
              href="https://linkedin.com/in/tawsif-khan-34952336b"
              target="_blank"
              rel="noreferrer"
              className="glass-card flex items-center gap-4 p-5 transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#c98a3b">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <div>
                <div className="font-mono text-[11px] text-[#6b6350]">LinkedIn</div>
                <div className="text-[14px] text-paper">Tawsif Raza Khan</div>
              </div>
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
