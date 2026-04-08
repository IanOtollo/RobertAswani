"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// Components
import CircuitGrid from "@/components/ui/CircuitGrid";
import ScrambleText from "@/components/ui/ScrambleText";
import MagneticButton from "@/components/ui/MagneticButton";

// Dynamic import for 3D components to avoid SSR issues
const PCBViewer = dynamic(() => import("@/components/3d/PCBViewer"), { ssr: false });

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll progress bar
    gsap.to(".scroll-progress", {
      width: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
      },
    });

    // Reveal section headings on scroll

    const headings = document.querySelectorAll(".reveal-heading");
    headings.forEach((heading) => {
      gsap.fromTo(
        heading,
        { clipPath: "inset(0 100% 0 0)", opacity: 0 },
        {
          clipPath: "inset(0 0% 0 0)",
          opacity: 1,
          duration: 1.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: heading,
            start: "top 80%",
          },
        }
      );
    });

    // Stagger in cards
    const cards = document.querySelectorAll(".stagger-card");
    gsap.from(cards, {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: cards[0],
        start: "top 85%",
      },
    });

    // Stats counter
    const stats = document.querySelectorAll(".stat-number");
    stats.forEach((stat) => {
      const target = parseInt((stat as HTMLElement).innerText);
      gsap.fromTo(
        stat,
        { innerText: 0 },
        {
          innerText: target,
          duration: 2,
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: stat,
            start: "top 90%",
          },
        }
      );
    });
  }, []);

  return (
    <main ref={containerRef} className="relative bg-[#050A0F] text-white">
      {/* 1. HERO PAGE */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        <CircuitGrid />
        
        <div className="z-10 text-center px-4 w-full h-[60vh] relative flex items-center justify-center">
          <PCBViewer />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none w-full max-w-4xl px-6">
             <ScrambleText 
              text="PRECISION ENGINEERED. PIXEL PERFECT." 
              className="text-3xl md:text-7xl font-display font-bold leading-tight tracking-tighter text-balance"
            />
          </div>
        </div>

        <div className="z-10 text-center mt-4 md:mt-8 px-6">
          <p className="font-mono text-slate-400 mb-8 text-sm md:text-xl opacity-0 animate-[fadeIn_1s_ease-out_0.5s_forwards] uppercase tracking-widest">
            PCB Design & CAD Modeling // Robert Aswani
          </p>
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center justify-center">
            <MagneticButton className="w-full md:w-auto px-10 py-4 bg-slate-100 text-slate-950 font-display font-bold rounded-sm hover:bg-slate-300 transition-colors duration-300">
              VIEW DESIGNS
            </MagneticButton>
            <MagneticButton className="w-full md:w-auto px-10 py-4 border border-slate-700 text-slate-100 font-display font-bold rounded-sm hover:bg-slate-800 transition-colors duration-300">
              COMMISSION A DESIGN
            </MagneticButton>
          </div>
        </div>


        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce flex flex-col items-center gap-2">
          <span className="font-mono text-xs text-[#00D4FF] uppercase tracking-widest">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-[#00D4FF] to-transparent" />
        </div>
      </section>

      {/* 2. ABOUT SECTION */}
      <section id="about" className="py-24 px-6 md:px-24 border-t border-slate-800 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          <div className="relative group">
            {/* PORTRAIT PLACEHOLDER */}
            <div className="aspect-[3/4] overflow-hidden grayscale contrast-110 brightness-90 relative border border-slate-800">
              <Image 
                src="https://picsum.photos/seed/robert/600/800" 
                alt="Robert Aswani" 
                fill 
                className="object-cover"
              />
            </div>
            {/* Decorative Frame */}
            <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-slate-700" />
            <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-slate-700" />
          </div>

          <div>
            <h2 className="reveal-heading text-5xl md:text-6xl font-display font-bold mb-2 uppercase tracking-tighter text-slate-100">ROBERT ASWANI</h2>
            <p className="font-mono text-slate-400 mb-8 uppercase text-xs tracking-[0.3em]">Engineering Student · DeKUT · Nairobi, Kenya</p>

            
            <p className="text-gray-400 text-lg leading-relaxed mb-12 font-mono">
              Robert Aswani is a mechanical and electronics engineering student at Dedan Kimathi University of Technology, 
              one of Kenya&apos;s premier STEM institutions. Specializing in PCB circuit design and precision CAD modeling, 
              Robert brings academic rigor and creative precision to every project — from single-layer prototype boards 
              to complex multi-layer PCB systems and full mechanical 3D assemblies.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 text-center md:text-left">
              {[
                { label: "PCB Designs", value: 12 },
                { label: "CAD Models", value: 8 },
                { label: "Uni Served", value: 3 },
                { label: "Delivery", value: 100, suffix: "%" }
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-3xl md:text-4xl font-display font-bold text-slate-100">
                    <span className="stat-number">{stat.value}</span>{stat.suffix || "+"}
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-slate-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Skills Bars */}
            <div className="space-y-6">
              {[
                { name: "KiCad", level: 90 },
                { name: "Altium Designer", level: 75 },
                { name: "SolidWorks", level: 85 },
                { name: "Fusion 360", level: 80 }
              ].map((skill, i) => (
                <div key={i} className="font-mono">
                  <div className="flex justify-between text-[10px] tracking-widest mb-2 uppercase text-slate-400">
                    <span>{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="h-[1px] w-full bg-slate-800 overflow-hidden relative">
                    <motion.div 
                      className="h-full bg-slate-100"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1.5, ease: "circOut" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. SERVICES SECTION */}
      <section className="py-24 px-6 md:px-24 bg-slate-900/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="reveal-heading text-4xl md:text-5xl font-display font-bold mb-16 border-l-2 border-slate-100 pl-6 uppercase tracking-tighter">
            ENGINEERING SERVICES
          </h2>


          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: "Custom PCB Design", 
                desc: "Single to multi-layer designs optimized for manufacturing and signal integrity.", 
                icon: "PCB" 
              },
              { 
                title: "3D CAD Modeling", 
                desc: "High-precision mechanical assemblies and enclosure designs for rapid prototyping.", 
                icon: "GEAR" 
              },
              { 
                title: "2D Technical Drawings", 
                desc: "Professional manufacturing blueprints with GD&T annotation.", 
                icon: "DRAFT" 
              },
              { 
                title: "Prototype Consultation", 
                desc: "Guidance on component selection and DFM (Design For Manufacturing) analysis.", 
                icon: "CONSULT" 
              },
              { 
                title: "Design Review & Audit", 
                desc: "Comprehensive analysis of existing schematics and board layouts for reliability.", 
                icon: "AUDIT" 
              },
              { 
                title: "File Export & Prep", 
                desc: "Production-ready Gerber, BOM, CPL, STEP, and DXF file generation.", 
                icon: "FILES" 
              }
            ].map((service, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="stagger-card group p-8 bg-slate-900/40 border border-slate-800 relative overflow-hidden flex flex-col h-full"
              >
                <div className="text-slate-500 font-mono text-[10px] mb-6 tracking-widest uppercase">0{i+1} // {service.icon}</div>
                <h3 className="text-2xl font-display font-bold mb-4 text-slate-100 tracking-tight">{service.title}</h3>
                <p className="text-slate-400 font-mono text-sm leading-relaxed mb-8 flex-grow">{service.desc}</p>
                <Link href="/designs" className="text-slate-200 font-mono text-xs tracking-widest hover:text-white transition-all duration-300 flex items-center gap-2">
                  LEARN MORE <span className="text-lg">→</span>
                </Link>
              </motion.div>

            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-24 px-6 md:px-24 relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 dot-matrix opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="reveal-heading text-4xl md:text-5xl font-display font-bold mb-16 text-center uppercase tracking-tighter">PRICING TIERS</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                name: "Starter", 
                price: "$149", 
                features: ["Simple 2-Layer PCB", "2D Assembly Drawing", "BOM Generation", "3 Revisions"],
                btn: "Order Starter"
              },
              { 
                name: "Professional", 
                price: "$399", 
                features: ["Multi-Layer PCB (4+)", "Full CAD 3D Model", "DFA/DFM Analysis", "Unlimited Revisions"],
                recommended: true,
                btn: "Order Professional"
              },
              { 
                name: "Enterprise", 
                price: "Custom", 
                features: ["Whole Device Design", "Complex Assemblies", "Enclosure Design", "Priority Support"],
                btn: "Get Quote"
              }
            ].map((tier, i) => (
              <div 
                key={i} 
                className={`p-10 bg-slate-900/40 border ${tier.recommended ? 'border-slate-100' : 'border-slate-800'} flex flex-col`}
              >
                {tier.recommended && (
                  <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-slate-300 mb-4">Recommended</span>
                )}
                <h3 className="text-3xl font-display font-bold mb-2 uppercase tracking-tight text-slate-100">{tier.name}</h3>
                <div className="text-4xl font-mono text-slate-400 mb-8">{tier.price}</div>
                
                <ul className="space-y-4 mb-12 flex-grow">
                  {tier.features.map((feat, j) => (
                    <li key={j} className="flex items-center gap-3 text-xs font-mono text-slate-400 uppercase tracking-wider">
                      <span className="text-slate-100">→</span> {feat}
                    </li>
                  ))}
                </ul>

                <a 
                  href={`https://wa.me/254723791049?text=Hello,%20I'm%20interested%20in%20the%20${tier.name}%20tier.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 text-center font-display font-bold border border-slate-700 text-slate-100 hover:bg-slate-100 hover:text-slate-950 transition-all duration-300 uppercase text-xs tracking-widest"
                >
                  {tier.btn}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section id="contact" className="py-24 px-6 md:px-24 bg-slate-950 border-t border-slate-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div>
            <h2 className="text-6xl md:text-8xl font-display font-bold leading-none mb-8 tracking-tighter text-slate-100">
              LET&apos;S <br /> BUILD <span className="text-slate-400">SOMETHING.</span>
            </h2>
          </div>

          <form className="space-y-8">
            <div className="relative">
              <input type="text" placeholder="NAME" className="w-full bg-transparent border-b border-slate-800 py-4 font-mono text-sm focus:outline-none focus:border-slate-100 transition-colors peer uppercase tracking-widest" />
            </div>
            <div className="relative">
              <input type="email" placeholder="EMAIL" className="w-full bg-transparent border-b border-slate-800 py-4 font-mono text-sm focus:outline-none focus:border-slate-100 transition-colors peer uppercase tracking-widest" />
            </div>
            <div className="relative">
              <select className="w-full bg-transparent border-b border-slate-800 py-4 font-mono text-xs focus:outline-none focus:border-slate-100 transition-colors peer appearance-none uppercase tracking-widest">
                <option value="">PROJECT TYPE</option>
                <option value="pcb">PCB DESIGN</option>
                <option value="cad">3D CAD MODELING</option>
                <option value="both">FULL ASSEMBLY</option>
              </select>
            </div>
            <div className="relative">
              <textarea placeholder="MESSAGE" rows={4} className="w-full bg-transparent border-b border-slate-800 py-4 font-mono text-sm focus:outline-none focus:border-slate-100 transition-colors peer uppercase tracking-widest"></textarea>
            </div>
            
            <MagneticButton className="px-12 py-5 bg-slate-100 text-slate-950 font-display font-bold text-xs tracking-[0.2em] uppercase hover:bg-slate-300 transition-all">
              INITIALIZE PROJECT
            </MagneticButton>
          </form>
        </div>
      </section>


      {/* FOOTER */}
      <footer className="py-12 px-6 md:px-24 bg-slate-950 border-t border-slate-900 font-mono text-[10px] text-slate-500 uppercase tracking-widest">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4">
            <span className="text-slate-100 font-bold text-lg font-display tracking-tighter">ASWANI | ENG.</span>
          </div>
          
          <div className="flex gap-8">
            <Link href="/" className="hover:text-white transition-colors">HOME</Link>
            <Link href="/designs" className="hover:text-white transition-colors">DESIGNS</Link>
            <Link href="#about" className="hover:text-white transition-colors">ABOUT</Link>
          </div>

          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">GH</a>
            <a href="#" className="hover:text-white transition-colors">LN</a>
            <a href="#" className="hover:text-white transition-colors">X</a>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2026 Robert Aswani. Precision Engineered.</p>
          <p>
            Portfolio by <a href="https://ianotollo.vercel.app" className="text-slate-300 hover:text-white underline">IanOtollo</a>
          </p>
        </div>
      </footer>

    </main>
  );
}
