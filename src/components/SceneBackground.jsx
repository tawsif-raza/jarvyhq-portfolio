import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// A field of drifting points + a slowly rotating wireframe icosahedron core.
// Kept intentionally lightweight (no postprocessing) so it stays smooth
// on mid-range laptops/phones while still reading as "expensive."

function ParticleField() {
  const pointsRef = useRef();
  const count = 900;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 6 + Math.random() * 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.6;
      arr[i * 3 + 2] = radius * Math.cos(phi) - 4;
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.02;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#6ee7ff"
        transparent
        opacity={0.55}
        sizeAttenuation
      />
    </points>
  );
}

function CoreShape() {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.08;
      meshRef.current.rotation.x += delta * 0.03;
      const t = state.clock.elapsedTime;
      meshRef.current.position.y = Math.sin(t * 0.4) * 0.25;
    }
  });

  return (
    <mesh ref={meshRef} position={[2.2, 0, -3]} scale={1.6}>
      <icosahedronGeometry args={[1, 1]} />
      <meshBasicMaterial color="#ff6b4a" wireframe transparent opacity={0.35} />
    </mesh>
  );
}

export default function SceneBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <ParticleField />
        <CoreShape />
      </Canvas>
      {/* Vignette so foreground text always stays readable */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, rgba(5,6,10,0.65) 75%, rgba(5,6,10,0.95) 100%)",
        }}
      />
    </div>
  );
}
