import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RevealText from "../components/RevealText";
import Magnetic from "../components/Magnetic";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const rootRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-reveal", {
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 78%" },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="contact"
      className="reading-scrim reading-scrim--center relative mx-auto max-w-3xl overflow-hidden px-6 py-32 md:px-16 lg:px-24"
    >
      <p className="contact-reveal mb-6 font-mono text-xs text-[#6b6350]">
        Currently in Bengaluru, working with people anywhere.
      </p>

      <RevealText
        text="Building something worth talking about? Let's talk."
        className="contact-reveal font-display mb-10 max-w-xl text-3xl leading-tight text-paper md:text-5xl"
      />

      <Magnetic className="contact-reveal">
        <a
          href="mailto:tawsifk35@gmail.com"
          data-cursor="Email"
          className="font-display inline-block border-b border-line text-2xl text-paper transition hover:border-accent hover:text-accent md:text-4xl"
        >
          tawsifk35@gmail.com
        </a>
      </Magnetic>

      <div className="contact-reveal mt-16 flex gap-8 border-t border-line pt-8 font-mono text-xs text-dim">
        <a href="https://github.com/tawsif-raza" target="_blank" rel="noreferrer" className="transition hover:text-accent">
          GitHub
        </a>
        <a
          href="https://linkedin.com/in/tawsif-khan-34952336b"
          target="_blank"
          rel="noreferrer"
          className="transition hover:text-accent"
        >
          LinkedIn
        </a>
      </div>

      <p className="contact-reveal mt-20 font-mono text-[10px] text-[#4a4436]">
        © 2026 Tawsif Raza Khan
      </p>
    </section>
  );
}
