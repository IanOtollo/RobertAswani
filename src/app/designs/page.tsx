"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

const DESIGN_CATEGORIES = ["ALL", "PCB DESIGNS", "CAD MODELS", "2D DRAWINGS", "SCHEMATICS"];

const DESIGNS = [
  { id: 1, title: "Micro-Controller Hub", category: "PCB DESIGNS", img: "https://picsum.photos/seed/pcb1/800/600" },
  { id: 2, title: "Autonomous Drone Frame", category: "CAD MODELS", img: "https://picsum.photos/seed/pcb2/800/600" },
  { id: 3, title: "Solar Inverter Sch", category: "SCHEMATICS", img: "https://picsum.photos/seed/pcb3/800/600" },
  { id: 4, title: "Industrial Rack Mount", category: "2D DRAWINGS", img: "https://picsum.photos/seed/pcb4/800/600" },
  { id: 5, title: "High-Speed Processor", category: "PCB DESIGNS", img: "https://picsum.photos/seed/pcb5/800/600" },
  { id: 6, title: "Robotic Arm Joint", category: "CAD MODELS", img: "https://picsum.photos/seed/pcb6/800/600" },
  { id: 7, title: "Power Distribution", category: "PCB DESIGNS", img: "https://picsum.photos/seed/pcb7/800/600" },
  { id: 8, title: "Sensor Array Mount", category: "CAD MODELS", img: "https://picsum.photos/seed/pcb8/800/600" },
];

export default function DesignsPage() {
  const [filter, setFilter] = useState("ALL");
  const filteredDesigns = filter === "ALL" ? DESIGNS : DESIGNS.filter(d => d.category === filter);

  useEffect(() => {
    gsap.from(".design-card", {
      opacity: 0,
      y: 20,
      stagger: 0.05,
      duration: 0.6,
      ease: "power2.out"
    });
  }, [filter]);

  return (
    <main className="min-h-screen pt-32 pb-24 px-6 md:px-24 bg-slate-950 text-slate-100">
      <section className="max-w-7xl mx-auto">
        <header className="mb-16 border-l-2 border-slate-100 pl-8">
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-4 tracking-tighter uppercase text-slate-100">
            DESIGN <span className="text-slate-500">SHOWCASE</span>
          </h1>
          <p className="font-mono text-slate-400 max-w-2xl text-sm uppercase tracking-widest leading-relaxed">
            Technical archive consisting of precision-engineered systems, 
            ranging from high-speed PCB layouts to complex mechanical assemblies.
          </p>
        </header>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-4 mb-16 border-b border-slate-900 pb-8">
          {DESIGN_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 font-mono text-[10px] tracking-[0.2em] transition-all duration-300 uppercase border ${
                filter === cat ? "border-slate-100 text-slate-100 bg-slate-800" : "border-slate-800 text-slate-500 hover:border-slate-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredDesigns.map((design) => (
              <motion.div
                layout
                key={design.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="design-card group cursor-pointer relative aspect-[4/3] overflow-hidden bg-slate-900 border border-slate-800"
              >
                <Link href={`/designs/${design.id}`}>
                  <Image
                    src={design.img}
                    alt={design.title}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                  />
                  
                  {/* Subtle Professional Overlay */}
                  <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 border border-slate-100/20">
                    <span className="text-[10px] text-slate-300 font-mono tracking-[0.3em] mb-2 uppercase">{design.category}</span>
                    <h3 className="text-xl font-display font-bold text-white mb-6 uppercase tracking-tight">{design.title}</h3>
                    <div className="font-mono text-[10px] tracking-widest text-slate-400 group-hover:text-white transition-colors">
                      VIEW FULL SPECS [+]
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}

