"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CircuitGrid() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    
    const paths = svgRef.current.querySelectorAll("path");
    gsap.set(paths, { strokeDasharray: 1000, strokeDashoffset: 1000, opacity: 0 });

    gsap.to(paths, {
      strokeDashoffset: 0,
      opacity: 0.2,
      duration: 3,
      stagger: 0.1,
      ease: "power2.inOut",
      delay: 0.5
    });
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-30">
      <svg
        ref={svgRef}
        viewBox="0 0 1000 1000"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Mock circuit lines - Updated to professional Slate colors */}
        <path d="M0 100 L200 100 L250 150 L250 300 L300 350 L500 350" stroke="#94A3B8" strokeWidth="1" />
        <path d="M1000 200 L800 200 L750 250 L750 400 L700 450 L500 450" stroke="#CBD5E1" strokeWidth="1" />
        <path d="M0 800 L300 800 L350 750 L600 750 L650 700 L650 500" stroke="#94A3B8" strokeWidth="1" />
        <path d="M1000 900 L700 900 L650 850 L400 850 L350 800 L350 600" stroke="#CBD5E1" strokeWidth="1" />
        
        {/* Nodes */}
        <circle cx="500" cy="350" r="3" fill="#94A3B8" />
        <circle cx="500" cy="450" r="3" fill="#CBD5E1" />
        <circle cx="650" cy="500" r="3" fill="#94A3B8" />
        <circle cx="350" cy="600" r="3" fill="#CBD5E1" />

      </svg>
      <div className="absolute inset-0 blueprint-grid" />
      <div className="absolute inset-0 dot-matrix" />
    </div>
  );
}
