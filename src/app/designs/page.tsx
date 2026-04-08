"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

const CATEGORIES = ["ALL", "PCB", "CAD", "SCHEMATICS", "GD&T"];

const PROJECTS = [
  { 
    id: 1, 
    title: "Micro-Controller Core Hub", 
    category: "PCB", 
    specs: "4-Layer / Gerber / BOM",
    img: "https://picsum.photos/seed/pcb1/800/600" 
  },
  { 
    id: 2, 
    title: "Autonomous Drone Assembly", 
    category: "CAD", 
    specs: "3D Assembly / STEP / DXF",
    img: "https://picsum.photos/seed/cad1/800/600" 
  },
  { 
    id: 3, 
    title: "Solar Inverter Architecture", 
    category: "SCHEMATICS", 
    specs: "System Design / PDF / Altium",
    img: "https://picsum.photos/seed/pcb2/800/600" 
  },
  { 
    id: 4, 
    title: "Industrial Rack Unit", 
    category: "GD&T", 
    specs: "Manufacturing / 2D Print",
    img: "https://picsum.photos/seed/cad2/800/600" 
  },
  { 
    id: 5, 
    title: "High-Speed Data Bus", 
    category: "PCB", 
    specs: "6-Layer / Impedance Match",
    img: "https://picsum.photos/seed/pcb3/800/600" 
  },
  { 
    id: 6, 
    title: "Robotic Joint Actuator", 
    category: "CAD", 
    specs: "Precision Gearbox / SolidWorks",
    img: "https://picsum.photos/seed/cad3/800/600" 
  },
];

export default function DesignsPage() {
  const [filter, setFilter] = useState("ALL");
  const filtered = filter === "ALL" ? PROJECTS : PROJECTS.filter(p => p.category === filter);

  useEffect(() => {
    gsap.fromTo(".project-card", 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: "power3.out" }
    );
  }, [filter]);

  return (
    <main className="min-h-screen bg-[#080C10] pt-40 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <header className="mb-20">
          <div className="font-mono text-[11px] text-[#3D4F5E] tracking-[0.4em] uppercase mb-6">
            [ ARCHIVE REDUX // 2026 ]
          </div>
          <h1 className="font-display font-bold text-5xl md:text-8xl text-[#E8EDF2] tracking-tighter uppercase mb-8">
            Technical <span className="text-[#3D4F5E]">Showcase</span>
          </h1>
          <p className="max-w-2xl font-mono text-[14px] text-[#7A8B99] leading-relaxed uppercase">
            A production-ready technical archive consisting of precision hardware systems and 3D mechanical assemblies. 
            All designs are Gerber-verified or DFM-optimized.
          </p>
        </header>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-x-8 gap-y-4 mb-16 border-b border-[#1C2A36] pb-6">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`font-mono text-[11px] tracking-widest uppercase transition-colors relative pb-6 ${
                filter === cat ? "text-[#E8EDF2]" : "text-[#3D4F5E] hover:text-[#7A8B99]"
              }`}
            >
              {cat}
              {filter === cat && (
                <motion.div layoutId="archive-filter" className="absolute bottom-[-1px] left-0 right-0 h-[1px] bg-[#2D7DD2]" />
              )}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
          {filtered.map((project) => (
            <Link key={project.id} href={`/designs/${project.id}`} className="project-card group">
              <div className="relative aspect-[4/3] overflow-hidden bg-[#111820] border border-[#1C2A36] rounded-[2px] mb-6">
                <Image 
                  src={project.img}
                  alt={project.title}
                  fill
                  className="object-cover grayscale brightness-90 contrast-110 transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080C10] via-transparent to-transparent opacity-60" />
                
                {/* ID Tag */}
                <div className="absolute top-4 left-4 font-mono text-[9px] text-[#E8EDF2]/40 uppercase tracking-tighter">
                  REF. 00{project.id} // HARDWARE
                </div>
              </div>

              <div className="px-1">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-display font-bold text-xl text-[#E8EDF2] group-hover:text-[#2D7DD2] transition-colors leading-tight uppercase">
                    {project.title}
                  </h3>
                  <span className="font-mono text-[9px] text-[#2D7DD2] border border-[#2D7DD2]/30 px-2 py-0.5 rounded-sm whitespace-nowrap">
                    {project.category}
                  </span>
                </div>
                <p className="font-mono text-[11px] text-[#3D4F5E] uppercase tracking-widest">
                  {project.specs}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}


