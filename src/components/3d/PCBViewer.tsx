"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, OrbitControls, Environment } from "@react-three/drei";
import * as THREE from "three";

function PCBModel() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.x += 0.002;
    }
  });

  return (
    <group>
      {/* Main PCB Board */}
      <mesh ref={meshRef}>
        <boxGeometry args={[4, 0.1, 6]} />
        <meshStandardMaterial color="#004422" metalness={0.8} roughness={0.2} />
        
        {/* Mock Components */}
        <mesh position={[1, 0.15, 1]}>
          <boxGeometry args={[0.5, 0.2, 0.5]} />
          <meshStandardMaterial color="#333" />
        </mesh>
        <mesh position={[-1, 0.15, -1]}>
          <boxGeometry args={[0.8, 0.2, 0.8]} />
          <meshStandardMaterial color="#222" />
        </mesh>
        <mesh position={[0, 0.15, -2]}>
          <cylinderGeometry args={[0.3, 0.3, 0.4, 32]} />
          <meshStandardMaterial color="#555" />
        </mesh>
      </mesh>
      
      {/* Decorative floating bits */}
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[-3, 2, -1]}>
          <octahedronGeometry args={[0.2]} />
          <meshStandardMaterial color="#00D4FF" emissive="#00D4FF" emissiveIntensity={2} />
        </mesh>
      </Float>
    </group>
  );
}

export default function PCBViewer() {
  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas camera={{ position: [0, 5, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} />
        <Environment preset="city" />
        <PCBModel />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}
