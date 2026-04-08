"use client";

import { motion } from "framer-motion";
import { Cpu, Box, PenTool, MessageSquare, ScanLine, FileOutput } from "lucide-react";

export default function ServicesSection() {
  const services = [
    {
      title: "PCB Design",
      icon: Cpu,
      desc: "Single to multi-layer systems optimized for manufacturing and signal integrity.",
      num: "01"
    },
    {
      title: "CAD Modeling",
      icon: Box,
      desc: "High-precision mechanical assemblies and enclosure designs for rapid prototyping.",
      num: "02"
    },
    {
      title: "2D Drawings",
      icon: PenTool,
      desc: "Professional manufacturing blueprints with GD&T annotation.",
      num: "03"
    },
    {
      title: "Consultation",
      icon: MessageSquare,
      desc: "Guidance on component selection and DFM (Design For Manufacturing) analysis.",
      num: "04"
    },
    {
      title: "Design Audit",
      icon: ScanLine,
      desc: "Comprehensive analysis of existing schematics and board layouts for reliability.",
      num: "05"
    },
    {
      title: "File Export",
      icon: FileOutput,
      desc: "Production-ready Gerber, BOM, CPL, STEP, and DXF file generation.",
      num: "06"
    }
  ];

  return (
    <section id="services" className="py-24 md:py-32">
      <div className="font-mono text-[11px] text-[#3D4F5E] tracking-widest uppercase mb-6">
        [ 002 — SERVICES ]
      </div>
      
      <h2 className="font-display font-bold text-4xl md:text-5xl text-[#E8EDF2] mb-16 leading-tight">
        What Robert Builds
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, i) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
            className="group relative p-8 bg-[#0D1117]/60 backdrop-blur-md border border-[#1C2A36] rounded-[2px] transition-all duration-300 hover:border-[#1A4A80] hover:shadow-[0_0_40px_rgba(45,125,210,0.15)]"
          >
            <div className="mb-8 flex justify-between items-start">
              <div className="p-3 border border-[#1C2A36] rounded-[2px] group-hover:border-[#2D7DD2] transition-colors">
                <service.icon size={20} className="text-[#2D7DD2]" />
              </div>
              <span className="font-mono text-[11px] text-[#3D4F5E]">{service.num}</span>
            </div>
            
            <h3 className="font-display font-semibold text-lg text-[#E8EDF2] mb-4">
              {service.title}
            </h3>
            
            <p className="font-mono text-[13px] text-[#7A8B99] mb-8 leading-relaxed line-clamp-2">
              {service.desc}
            </p>

            <div className="font-mono text-[12px] text-[#2D7DD2] flex items-center gap-2 mt-auto group-hover:translate-x-1 transition-transform">
              Learn more &rarr;
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
