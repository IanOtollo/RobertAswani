"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success">("idle");
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headingRef.current) {
      const words = headingRef.current.querySelectorAll(".word");
      gsap.fromTo(words, 
        { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)", y: 20 },
        { 
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", 
          y: 0,
          duration: 1, 
          stagger: 0.2, 
          ease: "power4.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
          }
        }
      );
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("sending");
    setTimeout(() => {
      setFormStatus("success");
    }, 2000);
  };

  return (
    <section id="contact" className="py-24 md:py-32 grid grid-cols-1 lg:grid-cols-2 gap-20">
      {/* Left Column - Big Text */}
      <div ref={headingRef} className="flex flex-col justify-center">
        <div className="font-mono text-[11px] text-[#3D4F5E] tracking-widest uppercase mb-12">
          [ 005 — CONTACT ]
        </div>
        <h2 className="font-display font-extrabold text-7xl md:text-[120px] leading-[0.8] text-[#E8EDF2] uppercase tracking-tighter mb-8">
          <div className="word overflow-hidden">Start</div>
          <div className="word overflow-hidden">Your</div>
          <div className="word overflow-hidden text-[#2D7DD2]">Project.</div>
        </h2>
      </div>

      {/* Right Column - Form */}
      <div className="flex flex-col justify-center">
        <form onSubmit={handleSubmit} className="space-y-12">
          <div className="group relative">
            <label className="block font-mono text-[11px] text-[#3D4F5E] uppercase tracking-widest mb-4 transition-colors group-focus-within:text-[#2D7DD2]">
              Full Name
            </label>
            <input 
              required
              type="text" 
              className="w-full bg-transparent border-b border-[#1C2A36] py-2 font-mono text-[15px] text-[#E8EDF2] focus:outline-none transition-all duration-500 placeholder:text-[#1C2A36]"
              placeholder="Engineering Lead"
            />
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#2D7DD2] scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500 origin-left" />
          </div>

          <div className="group relative">
            <label className="block font-mono text-[11px] text-[#3D4F5E] uppercase tracking-widest mb-4 transition-colors group-focus-within:text-[#2D7DD2]">
              Email Address
            </label>
            <input 
              required
              type="email" 
              className="w-full bg-transparent border-b border-[#1C2A36] py-2 font-mono text-[15px] text-[#E8EDF2] focus:outline-none transition-all duration-500 placeholder:text-[#1C2A36]"
              placeholder="lead@company.tech"
            />
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#2D7DD2] scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500 origin-left" />
          </div>

          <div className="group relative">
            <label className="block font-mono text-[11px] text-[#3D4F5E] uppercase tracking-widest mb-4 transition-colors group-focus-within:text-[#2D7DD2]">
              Message
            </label>
            <textarea 
              required
              rows={4}
              className="w-full bg-transparent border-b border-[#1C2A36] py-2 font-mono text-[15px] text-[#E8EDF2] focus:outline-none transition-all duration-500 resize-none placeholder:text-[#1C2A36]"
              placeholder="Brief project specifications..."
            />
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#2D7DD2] scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500 origin-left" />
          </div>

          <button 
            type="submit"
            disabled={formStatus !== "idle"}
            className="w-full py-6 bg-[#2D7DD2] text-white font-display font-bold text-[14px] uppercase tracking-[0.2em] rounded-[2px] hover:bg-[#1A4A80] transition-all duration-300 disabled:bg-[#111820] disabled:text-[#3D4F5E]"
          >
            {formStatus === "idle" && "Send Brief →"}
            {formStatus === "sending" && "Transmitting..."}
            {formStatus === "success" && "Brief Received ✓"}
          </button>
        </form>

        <div className="mt-12 flex flex-col md:flex-row gap-12 font-mono text-[12px] text-[#7A8B99]">
          <a 
            href="https://wa.me/254757114743" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group/link cursor-pointer"
          >
            <span className="block text-[#3D4F5E] uppercase mb-1 group-hover/link:text-[#2D7DD2] transition-colors">Direct</span>
            <span className="group-hover/link:text-[#E8EDF2] transition-colors">+254 757 114 743</span>
          </a>
          <a 
            href="https://www.linkedin.com/in/robert-aswani" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group/link cursor-pointer"
          >
            <span className="block text-[#3D4F5E] uppercase mb-1 group-hover/link:text-[#2D7DD2] transition-colors">Corporate</span>
            <span className="group-hover/link:text-[#E8EDF2] transition-colors">LinkedIn.com/in/robert-aswani</span>
          </a>
        </div>
      </div>
    </section>
  );
}
