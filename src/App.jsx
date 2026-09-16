import { useState } from "react";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import Services from "./sections/Services";
import Contact from "./sections/Contact";
import IntroCounter from "./components/IntroCounter";
import Nav from "./components/Nav";

export default function App() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <div className="relative min-h-screen w-full bg-bg">
      <IntroCounter onComplete={() => setIntroDone(true)} />
      {introDone && (
        <>
          <Nav />
          <main className="relative z-10">
            <Hero />
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
