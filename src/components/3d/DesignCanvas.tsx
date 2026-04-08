"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage, useGLTF, Environment, Grid, PerspectiveCamera } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

function Model({ url, wireframe }: { url: string; wireframe?: boolean }) {
  // Using a placeholder astronaut as requested if real ones aren't available
  const { scene } = useGLTF("https://modelviewer.dev/shared-assets/models/Astronaut.glb");
  
  scene.traverse((child: any) => {
    if (child.isMesh) {
      if (Array.isArray(child.material)) {
        child.material.forEach((m: any) => {
          if (m.hasOwnProperty('wireframe')) m.wireframe = !!wireframe;
        });
      } else if (child.material && 'wireframe' in child.material) {
        child.material.wireframe = !!wireframe;
      }
    }
  });


  return <primitive object={scene} scale={2} />;
}

export default function DesignCanvas({ wireframe }: { wireframe: boolean }) {
  return (
    <div className="w-full h-full bg-[#070D14]">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 2, 5]} fov={50} />
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.5}>
            <Model url="" wireframe={wireframe} />
          </Stage>

          <Grid
            renderOrder={-1}
            position={[0, -0.8, 0]}
            infiniteGrid
            cellSize={0.6}
            cellThickness={1}
            cellColor="#00D4FF"
            sectionSize={3}
            sectionThickness={1.5}
            sectionColor="#00FF88"
            fadeDistance={30}
          />
          <Environment preset="city" />
        </Suspense>
        <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 1.75} />
      </Canvas>
    </div>
  );
}
