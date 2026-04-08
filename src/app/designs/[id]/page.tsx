"use client";

import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";

const DesignCanvas = dynamic(() => import("@/components/3d/DesignCanvas"), { ssr: false });

export default function DesignDetail({ params }: { params: { id: string } }) {
  const [viewMode, setViewMode] = useState<"3D Rotate" | "Wireframe" | "Exploded View" | "Top View">("3D Rotate");

  const specs = [
    { label: "Dimensions", value: "120mm x 85mm" },
    { label: "Layers", value: "4 Layers" },
    { label: "Software", value: "Altium Designer" },
    { label: "Files", value: "Gerber, STEP, DXF" },
    { label: "Status", value: "Production Ready" },
  ];

  return (
    <main className="min-h-screen bg-slate-950 pt-20 flex flex-col md:flex-row overflow-x-hidden">
      {/* Sidebar - Stacks below on mobile for better mobile UX */}
      <aside className="w-full md:w-[350px] bg-slate-900 border-r border-slate-800 p-6 md:p-8 flex flex-col z-20 order-2 md:order-1 max-h-screen overflow-y-auto">
        <Link href="/designs" className="text-slate-400 font-mono text-[10px] mb-8 hover:text-white transition-colors flex items-center gap-2 tracking-[0.2em] uppercase">
          ← BACK TO SHOWCASE
        </Link>

        <div className="mb-10">
          <span className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">ID: 00{params.id} // DESIGN PROJECT</span>
          <h1 className="text-2xl md:text-3xl font-display font-bold mt-2 text-slate-100 uppercase tracking-tighter">MICRO-CONTROLLER CORE HUB</h1>
        </div>

        <div className="space-y-2 mb-12">
          {["3D Rotate", "Wireframe", "Exploded View", "Top View"].map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode as any)}
              className={`w-full py-3 px-4 text-left font-mono text-[10px] tracking-widest border transition-all duration-300 uppercase ${
                viewMode === mode ? "border-slate-100 text-slate-100 bg-slate-800" : "border-slate-800 text-slate-500 hover:border-slate-600"
              }`}
            >
              {mode}
            </button>
          ))}
        </div>

        <div className="space-y-6 mb-12">
          <h3 className="text-[10px] font-display font-bold text-slate-300 tracking-[0.3em] uppercase">TECHNICAL SPECIFICATIONS</h3>
          <div className="space-y-4">
            {specs.map((spec, i) => (
              <div key={i} className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{spec.label}</span>
                <span className="text-[10px] font-mono text-slate-200 uppercase">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto pt-8 space-y-4">
          <MagneticButton className="w-full py-4 bg-slate-100 text-slate-950 font-display font-bold text-xs tracking-widest rounded-sm uppercase hover:bg-slate-300 transition-all duration-300">
            DOWNLOAD PACKAGE
          </MagneticButton>
          <a 
            href={`https://wa.me/254723791049?text=Hello,%20I'm%20interested%20in%20the%20Design%20ID%2000${params.id}.`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center py-4 border border-slate-700 text-slate-100 font-display font-bold text-xs tracking-widest rounded-sm hover:bg-slate-800 transition-all duration-300 uppercase"
          >
            ORDER SIMILAR DESIGN
          </a>
        </div>
      </aside>

      {/* Main Canvas Area */}
      <section className="flex-grow relative h-[50vh] md:h-screen order-1 md:order-2 border-b border-slate-800 md:border-b-0">
        <div className="absolute top-6 right-6 z-10">
          <button className="w-10 h-10 rounded-full bg-slate-900/50 backdrop-blur-sm border border-slate-800 flex items-center justify-center hover:border-slate-400 transition-colors text-white">
            ⛶
          </button>
        </div>
        
        <div className="w-full h-full">
          <DesignCanvas wireframe={viewMode === "Wireframe"} />
        </div>
        
        {/* Overlay Info */}
        <div className="absolute bottom-10 left-10 p-6 bg-slate-950/80 backdrop-blur-md border-l-2 border-slate-100 pointer-events-none hidden md:block">
          <div className="font-mono text-[10px] text-slate-400 mb-2 uppercase tracking-[0.3em]">Status: Verified Production Ready</div>
          <div className="font-display font-bold text-xl uppercase tracking-tighter text-slate-100">CAD Model // Proto-X1 Core</div>
        </div>
      </section>
    </main>
  );
}

