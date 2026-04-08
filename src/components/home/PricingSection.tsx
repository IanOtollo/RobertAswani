"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function PricingSection() {
  const tiers = [
    {
      name: "Starter",
      price: "149",
      features: ["2-Layer PCB Design", "Circuit Schematic", "BOM Generation", "1 Revision"],
      cta: "Order Starter",
      highlight: false,
    },
    {
      name: "Professional",
      price: "399",
      tag: "RECOMMENDED",
      features: ["4-Layer High Speed", "Complex CAD Modeling", "Thermal Analysis", "3 Revisions"],
      cta: "Order Professional",
      highlight: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: ["Full Product Lifecycle", "Design for Manufacture", "Compliance Audit", "Unlimited Support"],
      cta: "Get a Quote",
      highlight: false,
    }
  ];

  return (
    <section id="pricing" className="py-24 md:py-32">
      <div className="font-mono text-[11px] text-[#3D4F5E] tracking-widest uppercase mb-6">
        [ 004 — PRICING ]
      </div>
      
      <h2 className="font-display font-bold text-4xl md:text-5xl text-[#E8EDF2] mb-16 leading-tight">
        Transparent Engineering Rates
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {tiers.map((tier) => (
          <div 
            key={tier.name}
            className={`flex flex-col p-8 bg-[#0D1117]/60 backdrop-blur-md border rounded-[2px] transition-all duration-300 relative overflow-hidden ${
              tier.highlight 
                ? "border-[#2D7DD2] shadow-[0_0_40px_rgba(45,125,210,0.1)]" 
                : "border-[#1C2A36]"
            }`}
          >
            {tier.highlight && (
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#2D7DD2]" />
            )}
            
            <div className="flex justify-between items-start mb-8">
              <span className="font-mono text-[11px] text-[#3D4F5E] uppercase tracking-widest">{tier.name}</span>
              {tier.tag && (
                <span className="font-mono text-[9px] text-[#0CF0C8] border border-[#0CF0C8]/30 px-2 py-0.5 rounded-full tracking-tighter">
                  {tier.tag}
                </span>
              )}
            </div>

            <div className="flex items-baseline gap-1 mb-10">
              <span className="font-mono text-xl text-[#3D4F5E]">$</span>
              <span className="font-display font-bold text-5xl text-[#E8EDF2]">{tier.price}</span>
            </div>

            <ul className="space-y-4 mb-12 flex-grow">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3 font-mono text-[13px] text-[#7A8B99]">
                  <Check size={14} className="text-[#0CF0C8]" />
                  {feature}
                </li>
              ))}
            </ul>

            <a 
              href={`https://wa.me/254723791049?text=Hello, I'm interested in the ${tier.name} package.`}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full py-4 font-mono text-[12px] font-bold uppercase tracking-widest text-center transition-all duration-300 ${
                tier.highlight 
                  ? "bg-[#2D7DD2] text-white hover:bg-[#1A4A80]" 
                  : "bg-transparent border border-[#2D3F50] text-[#7A8B99] hover:border-[#E8EDF2] hover:text-[#E8EDF2]"
              }`}
            >
              {tier.cta} &rarr;
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
