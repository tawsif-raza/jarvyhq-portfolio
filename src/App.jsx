import SceneBackground from "./components/SceneBackground";
import Hero from "./sections/Hero";
import About from "./sections/About";

export default function App() {
  return (
    <div className="relative min-h-screen w-full">
      <SceneBackground />
      <div className="noise-overlay" />
      <main className="relative z-10">
        <Hero />
        <About />
        {/* Next: Projects, Skills/Tool Wheel, Services, Contact */}
      </main>
    </div>
  );
}
