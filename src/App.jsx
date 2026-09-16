import { useState } from "react";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import Services from "./sections/Services";
import Contact from "./sections/Contact";
import IntroCounter from "./components/IntroCounter";
import Nav from "./components/Nav";
import CustomCursor from "./components/CustomCursor";
import Marquee from "./components/Marquee";

export default function App() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <div className="relative min-h-screen w-full bg-bg">
      <div className="bg-grid" />
      <div className="grain-overlay" />
      <IntroCounter onComplete={() => setIntroDone(true)} />
      {introDone && (
        <>
          <CustomCursor />
          <Nav />
          <main className="relative z-10">
            <Hero />
            <Marquee text="Agentic systems · Automation · AI/ML ·" />
            <About />
            <Projects />
            <Skills />
            <Services />
            <Contact />
          </main>
        </>
      )}
    </div>
  );
}
