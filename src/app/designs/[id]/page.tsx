"use client";

import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ChevronLeft, Maximize2, Download, Package } from "lucide-react";

const DesignCanvas = dynamic(() => import("@/components/3d/DesignCanvas"), { ssr: false });

export default function DesignDetail({ params }: { params: { id: string } }) {
  const [viewMode, setViewMode] = useState<"3D" | "WIRE" | "TOP">("3D");

  const specs = [
    { label: "PCB DIMENSIONS", value: "114mm x 78mm" },
    { label: "LAYER STACKUP", value: "4 LAYERS // FR4" },
    { label: "PRIMARY SOFTWARE", value: "ALTIUM DESIGNER" },
    { label: "FILE FORMATS", value: "GERBER / STEP / BOM" },
    { label: "COMPLIANCE", value: "IPC-6012 CLASS 2" },
  ];

  return (
    <main className="min-h-screen bg-[#080C10] pt-20 flex flex-col md:flex-row overflow-hidden">
      {/* Engineering Sidebar */}
      <aside className="w-full md:w-[400px] h-screen bg-[#0D1117] border-r border-[#1C2A36] p-8 md:p-12 flex flex-col z-20 overflow-y-auto">
        <Link 
          href="/designs" 
          className="group flex items-center gap-3 font-mono text-[10px] text-[#3D4F5E] hover:text-[#E8EDF2] transition-colors tracking-[0.3em] uppercase mb-16"
        >
          <ChevronLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
          Back to Archive
        </Link>

        <div className="mb-12">
          <div className="font-mono text-[10px] text-[#2D7DD2] tracking-[0.4em] uppercase mb-4">
            SPECIFICATION // 00{params.id}
          </div>
          <h1 className="font-display font-bold text-3xl text-[#E8EDF2] leading-tight uppercase tracking-tighter mb-4">
            Micro-Controller Core Hub
          </h1>
          <p className="font-mono text-[12px] text-[#7A8B99] leading-relaxed uppercase">
            A high-speed development substrate designed for low-latency signal processing and modular expansion.
          </p>
        </div>

        {/* View Mode Controls */}
        <div className="grid grid-cols-3 gap-2 mb-12">
          {["3D", "WIRE", "TOP"].map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode as any)}
              className={`py-3 font-mono text-[10px] tracking-widest border transition-all duration-300 ${
                viewMode === mode 
                ? "border-[#2D7DD2] text-[#E8EDF2] bg-[#2D7DD2]/10" 
                : "border-[#1C2A36] text-[#3D4F5E] hover:border-[#3D4F5E]"
              }`}
            >
              {mode}
            </button>
          ))}
        </div>

        {/* Tech Specs Grid */}
        <div className="flex-grow">
          <h3 className="font-mono text-[10px] text-[#3D4F5E] tracking-[0.4em] uppercase mb-8 pb-4 border-b border-[#1C2A36]">
            Technical Parameters
          </h3>
          <div className="space-y-6 mb-16">
            {specs.map((spec, i) => (
              <div key={i} className="flex flex-col gap-1">
                <span className="font-mono text-[9px] text-[#3D4F5E] uppercase tracking-widest">
                  {spec.label}
                </span>
                <span className="font-mono text-[11px] text-[#E8EDF2] uppercase">
                  {spec.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-auto pt-8 border-t border-[#1C2A36] flex flex-col gap-4">
          <button className="flex items-center justify-center gap-3 w-full py-4 bg-[#2D7DD2] text-[#E8EDF2] font-mono text-[11px] font-bold uppercase tracking-widest hover:bg-[#1A4A80] transition-colors rounded-[2px]">
            <Download size={14} />
            Download Source
          </button>
          <button className="flex items-center justify-center gap-3 w-full py-4 bg-transparent border border-[#1C2A36] text-[#7A8B99] font-mono text-[11px] font-bold uppercase tracking-widest hover:border-[#E8EDF2] hover:text-[#E8EDF2] transition-colors rounded-[2px]">
            <Package size={14} />
            Order Assembly
          </button>
        </div>
      </aside>

      {/* Main Inspection Area */}
      <section className="flex-grow relative h-[60vh] md:h-screen bg-[#080C10]">
        <div className="absolute top-10 right-10 z-10 flex gap-4">
          <button className="w-12 h-12 rounded-full bg-[#0D1117]/80 backdrop-blur-md border border-[#1C2A36] flex items-center justify-center text-[#E8EDF2] hover:border-[#2D7DD2] transition-colors">
            <Maximize2 size={18} />
          </button>
        </div>

        {/* Status Overlay */}
        <div className="absolute bottom-10 left-10 z-10 p-8 border-l-2 border-[#2D7DD2] bg-[#0D1117]/80 backdrop-blur-xl">
          <div className="font-mono text-[10px] text-[#2D7DD2] tracking-[0.3em] uppercase mb-2">
            Status: VERIFIED 2026
          </div>
          <div className="font-display font-bold text-2xl text-[#E8EDF2] uppercase tracking-tighter">
            HARDWARE INSPECTION MODE
          </div>
        </div>

        <div className="w-full h-full cursor-crosshair">
          <DesignCanvas wireframe={viewMode === "WIRE"} />
        </div>
      </section>
    </main>
  );
}


