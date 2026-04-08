"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutSection() {
  const software = ["KiCad", "Altium Designer", "SolidWorks", "Fusion 360", "AutoCAD", "LTspice"];

  return (
    <section id="about" className="py-24 md:py-48 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      {/* Left Column - Portrait */}
      <div className="relative group">
        <div className="relative aspect-[3/4] max-w-[480px] overflow-hidden border border-[#2D3F50] rounded-[2px]">
          {/* Duotone Filter via CSS */}
          <div className="absolute inset-0 z-10 bg-[#2D7DD2]/20 mix-blend-color" />
          <Image 
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800" 
            alt="PCB Engineering Hardware" 
            fill 
            priority
            className="object-cover grayscale brightness-90 contrast-125 transition-transform duration-700 group-hover:scale-105"
          />
          
          <div className="absolute bottom-6 left-6 z-20">
            <h3 className="font-mono text-[10px] text-[#E8EDF2] uppercase tracking-[0.2em]">Robert Aswani</h3>
            <p className="font-mono text-[10px] text-[#7A8B99] uppercase tracking-[0.2em]">Engineering Student</p>
          </div>
        </div>
      </div>

      {/* Right Column - Info */}
      <div className="flex flex-col">
        <div className="font-mono text-[11px] text-[#3D4F5E] tracking-widest uppercase mb-6">
          [ 001 — ABOUT ]
        </div>
        
        <h2 className="font-display font-bold text-4xl md:text-5xl text-[#E8EDF2] mb-8 leading-tight">
          The Engineer Behind the Board
        </h2>

        <p className="font-mono text-[14px] leading-[1.8] text-[#7A8B99] mb-12">
          &quot;Robert Aswani is a mechanical and electronics engineering student at Dedan Kimathi University of Technology — one of Kenya&apos;s foremost STEM institutions. He specializes in PCB circuit architecture and precision CAD modeling, delivering production-ready designs from schematic capture to Gerber output and full mechanical 3D assemblies.&quot;
        </p>


        {/* Software Tags */}
        <div className="flex flex-wrap gap-2">
          {software.map((tool) => (
            <span 
              key={tool} 
              className="px-4 py-2 bg-[#161E28] border border-[#2D3F50] rounded-[2px] font-mono text-[12px] text-[#E8EDF2]"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
