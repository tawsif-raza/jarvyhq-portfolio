import SceneBackground from "./components/SceneBackground";
import Hero from "./sections/Hero";

export default function App() {
  return (
    <div className="relative min-h-screen w-full">
      <SceneBackground />
      <div className="noise-overlay" />
      <main className="relative z-10">
        <Hero />
        {/* Next sections (About, Projects, Skills, Services, Contact)
            will be added one at a time in the same pattern. */}
      </main>
    </div>
  );
}
