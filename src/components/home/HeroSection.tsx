"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import * as THREE from "three";

export default function HeroSection() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // 1. GSAP Headline Reveal
    if (headlineRef.current) {
      const words = headlineRef.current.innerText.split(" ");
      headlineRef.current.innerHTML = words
        .map(word => `<span class="word-reveal"><div>${word}</div></span>`)
        .join(" ");

      gsap.to(".word-reveal div", {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power4.out",
        delay: 0.5,
      });
    }

    // 2. Three.js PCB Mesh
    if (!canvasRef.current) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvasRef.current.clientWidth / canvasRef.current.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    canvasRef.current.appendChild(renderer.domElement);

    // PCB Board Substrate
    const boardGeo = new THREE.BoxGeometry(4, 3, 0.1);
    const boardMat = new THREE.MeshPhongMaterial({ 
      color: 0x0D1117, 
      specular: 0x2D7DD2, 
      shininess: 40 
    });
    const board = new THREE.Mesh(boardGeo, boardMat);
    scene.add(board);

    // Trace Lines (Procedural)
    const gridHelper = new THREE.GridHelper(4, 20, 0x1C2A36, 0x1C2A36);
    gridHelper.rotation.x = Math.PI / 2;
    gridHelper.position.z = 0.06;
    board.add(gridHelper);

    // Ambient Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const spotLight = new THREE.SpotLight(0x2D7DD2, 1);
    spotLight.position.set(5, 5, 5);
    scene.add(spotLight);

    camera.position.z = 4;

    const animate = () => {
      requestAnimationFrame(animate);
      board.rotation.y += 0.005;
      board.rotation.x += 0.002;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!canvasRef.current) return;
      camera.aspect = canvasRef.current.clientWidth / canvasRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <section className="relative w-full h-screen flex flex-col md:flex-row items-center justify-between pt-20 md:pt-0 overflow-hidden">
      {/* Left Column - Content */}
      <div className="w-full md:w-[55%] flex flex-col justify-center px-6 md:px-12 z-10">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex items-center gap-2 mb-6 font-mono text-[10px] tracking-widest text-[#3D4F5E] uppercase"
        >
          <span className="inline-block w-2 h-2 bg-[#2D7DD2] rounded-full animate-pulse" />
          [ PCB DESIGN & CAD ENGINEERING ]
        </motion.div>

        <h1 
          ref={headlineRef}
          className="font-display font-extrabold text-[56px] md:text-[84px] leading-[1.05] tracking-tighter text-[#E8EDF2] mb-8"
        >
          Engineering Precision. Built to Spec.
        </h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="max-w-md font-mono text-[14px] leading-relaxed text-[#7A8B99] mb-10"
        >
          Robert Aswani designs PCB systems and precision CAD assemblies for engineers who refuse to compromise.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-wrap gap-4 mb-12"
        >
          <button className="px-8 py-4 bg-[#2D7DD2] text-[#E8EDF2] font-mono text-[12px] font-bold uppercase tracking-widest border-eng hover:bg-[#1A4A80] transition-colors duration-300">
            View Portfolio &rarr;
          </button>
          <button className="px-8 py-4 bg-transparent text-[#7A8B99] font-mono text-[12px] font-bold uppercase tracking-widest border border-[#2D3F50] rounded-[2px] hover:border-[#E8EDF2] hover:text-[#E8EDF2] transition-colors duration-300">
            Commission Work
          </button>
        </motion.div>


      </div>

      {/* Right Column - 3D */}
      <div className="w-full md:w-[45%] h-[50vh] md:h-screen relative">
        <div ref={canvasRef} className="w-full h-full" />
        <div className="absolute inset-0 bg-transparent pointer-events-none" />
        
        {/* Technical Labels */}
        <div className="absolute bottom-12 left-0 right-0 px-12 flex justify-between font-mono text-[11px] text-[#3D4F5E]">
          <span>REV. 2.1 — ASWANI.ENG</span>
          <span>GERBER READY // 001</span>
        </div>
      </div>

      {/* Scroll indicator Bottom */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] text-[#3D4F5E] tracking-widest opacity-50">
        &darr; SCROLL TO EXPLORE
      </div>
    </section>
  );
}
