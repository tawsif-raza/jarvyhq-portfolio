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
import ParticleNetwork from "./components/ParticleNetwork";
import Atmosphere from "./components/Atmosphere";
import CommandPalette from "./components/CommandPalette";
import NowPanel from "./components/NowPanel";
import GithubActivity from "./components/GithubActivity";

export default function App() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <div className="relative isolate min-h-screen w-full bg-bg">
      <Atmosphere />
      <ParticleNetwork />
      <div className="bg-grid" />
      <div className="grain-overlay" />
      <IntroCounter onComplete={() => setIntroDone(true)} />
      {introDone && (
        <>
          <CustomCursor />
          <Nav />
          <CommandPalette />
          <main className="relative z-10">
            <Hero />
            <NowPanel />
            <Marquee text="Agentic systems · Automation · AI/ML ·" />
            <About />
            <Projects />
            <Skills />
            <GithubActivity />
            <Services />
            <Contact />
          </main>
        </>
      )}
    </div>
  );
}
