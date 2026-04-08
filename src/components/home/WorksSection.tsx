"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const projects = [
  { id: 1, name: "Power Management Board", category: "PCB", img: "photo-1581094794329-c8112a89af12" },
  { id: 2, name: "Motor Controller Assembly", category: "CAD", img: "photo-1581092580497-e0d23cbdf1dc" },
  { id: 3, name: "IoT Sensor Hub", category: "PCB", img: "photo-1550751827-4bd374c3f58b" },
  { id: 4, name: "Precision Enclosure", category: "CAD", img: "photo-1504917595217-d4dc5f649e69" },
  { id: 5, name: "Dual-Layer Switch", category: "PCB", img: "photo-1517077304055-6e89abbf09b0" },
];

export default function WorksSection() {
  const [filter, setFilter] = useState("ALL");
  const categories = ["ALL", "PCB", "CAD", "2D DRAWINGS", "SCHEMATICS"];

  const filteredProjects = filter === "ALL" 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section id="works" className="py-24 md:py-32">
      <div className="font-mono text-[11px] text-[#3D4F5E] tracking-widest uppercase mb-6">
        [ 003 — WORKS ]
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
        <h2 className="font-display font-bold text-4xl md:text-5xl text-[#E8EDF2] leading-tight max-w-lg">
          Selected Engineering Work
        </h2>

        {/* Filters */}
        <div className="flex flex-wrap gap-6 border-b border-[#1C2A36]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`pb-4 font-mono text-[11px] tracking-widest uppercase transition-colors relative ${
                filter === cat ? "text-[#E8EDF2]" : "text-[#3D4F5E] hover:text-[#7A8B99]"
              }`}
            >
              {cat}
              {filter === cat && (
                <motion.div 
                  layoutId="filter-active"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#2D7DD2]"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[300px] md:auto-rows-[400px]">
        {filteredProjects.map((project, i) => {
          // Asymmetric layout logic
          const isLarge = i % 4 === 0;
          const isTall = i % 4 === 1;
          
          return (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`relative group bg-[#0D1117]/40 backdrop-blur-md border border-[#1C2A36] overflow-hidden rounded-[2px] ${
                isLarge ? "md:col-span-8" : isTall ? "md:col-span-4" : "md:col-span-4"
              }`}
            >
              <Link href={`/designs/${project.id}`} className="block w-full h-full relative">
                <Image 
                  src={`https://images.unsplash.com/${project.img}?auto=format&fit=crop&q=80&w=800`}
                  alt={project.name}
                  fill
                  className="object-cover brightness-[0.85] contrast-[1.1] transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay with details */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080C10] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden">
                  <div className="absolute inset-0 bg-[#2D7DD2] opacity-[0.05]" />
                  
                  {/* Outline trace effect */}
                  <div className="absolute inset-0 border-2 border-[#2D7DD2] translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out pointer-events-none" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="inline-block px-2 py-1 bg-[#2D7DD2] text-white font-mono text-[9px] uppercase tracking-tighter mb-3 rounded-sm">
                        {project.category}
                      </span>
                      <h3 className="font-display font-bold text-xl text-[#E8EDF2] group-hover:text-[#2D7DD2] transition-colors">
                        {project.name}
                      </h3>
                    </div>
                    <div className="font-mono text-[12px] text-[#2D7DD2] opacity-0 group-hover:opacity-100 transition-opacity">
                      View &rarr;
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
