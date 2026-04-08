"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function ParticleField({ count = 1000 }) {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 100;
      p[i * 3 + 1] = (Math.random() - 0.5) * 100;
      p[i * 3 + 2] = (Math.random() - 0.5) * 100;
    }
    return p;
  }, [count]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[points, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.1} color="#2D7DD2" transparent opacity={0.4} />
    </points>
  );
}

function GraphGrid() {
  const meshRef = useRef<THREE.Mesh>(null);
  const segments = 100;
  const size = 150;
  
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(size, size, segments, segments);
    geo.rotateX(-Math.PI / 2);
    return geo;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    const pos = meshRef.current.geometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const z = pos.getZ(i);
        const distance = Math.sqrt(x * x + z * z);
        const y = Math.sin(distance * 0.15 - time * 0.4) * 2;
        pos.setY(i, y);
    }
    pos.needsUpdate = true;
  });

  return (
    <group>
      <mesh ref={meshRef} geometry={geometry} position={[0, -15, 0]}>
        <meshBasicMaterial color="#2D7DD2" wireframe transparent opacity={0.25} />
      </mesh>
      <gridHelper args={[250, 50, "#2D7DD2", "#1C2A36"]} position={[0, -15.1, 0]} />
    </group>
  );
}

function Scene() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame((state) => {
    // Parallax effect: camera moves with scroll
    const targetY = 15 - (scrollY * 0.02);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.1);
    state.camera.lookAt(0, -10, 0);
  });

  return (
    <>
      <fog attach="fog" args={["#080C10", 10, 80]} />
      <GraphGrid />
      <ParticleField count={1500} />
    </>
  );
}

export default function Global3DBackground() {
  return (
    <div className="fixed inset-0 z-[0] pointer-events-none bg-[#080C10]">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 15, 40], fov: 60 }}>
          <Scene />
        </Canvas>
      </div>
      
      {/* Technical Overlays */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.05)_50%)] bg-[length:100%_4px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#080C10_90%)]" />
      </div>
    </div>
  );
}



