"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Works", href: "/designs" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Pricing", href: "#pricing" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ease-in-out ${
        scrolled ? "bg-[#0D1117]/80 backdrop-blur-xl border-b border-[#1C2A36] py-4" : "bg-transparent py-8"
      }`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <Link href="/" className="font-display font-semibold text-lg tracking-[0.08em] uppercase text-[#E8EDF2] group">
            ASWANI<span className="text-[#2D7DD2]">.ENG</span>
          </Link>
          
          <div className="hidden md:flex gap-10 items-center">
            <div className="flex gap-8 font-mono text-[11px] tracking-[0.12em] uppercase text-[#7A8B99]">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href} className="hover:text-[#E8EDF2] transition-colors duration-300">
                  {link.name}
                </Link>
              ))}
            </div>
            
            <Link href="#contact">
              <button className="px-6 py-2.5 bg-[#2D7DD2] text-white font-mono text-[11px] font-bold uppercase tracking-[0.1em] rounded-full hover:bg-[#1A4A80] transition-all duration-300 shadow-sm active:scale-95">
                Start a Project &rarr;
              </button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-[#E8EDF2] p-2 focus:outline-none"
          >
            <div className="w-6 h-5 flex flex-col justify-between items-end relative overflow-hidden">
              <span className={`h-0.5 bg-current transition-all duration-300 ${isOpen ? "w-6 rotate-45 translate-y-2" : "w-6"}`} />
              <span className={`h-0.5 bg-current transition-all duration-300 ${isOpen ? "opacity-0 translate-x-2" : "w-4"}`} />
              <span className={`h-0.5 bg-current transition-all duration-300 ${isOpen ? "w-6 -rotate-45 -translate-y-2.5" : "w-5"}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-[#080C10] z-[99] flex flex-col items-center justify-center gap-8 md:hidden px-6"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.1 }}
                onClick={() => setIsOpen(false)}
              >
                <Link href={link.href} className="font-display font-bold text-4xl uppercase tracking-tighter text-[#E8EDF2] hover:text-[#2D7DD2] transition-colors">
                  {link.name}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              onClick={() => setIsOpen(false)}
              className="mt-8"
            >
              <Link href="#contact" className="px-12 py-4 bg-[#2D7DD2] text-white font-display font-bold text-lg uppercase tracking-widest rounded-sm">
                Start a Project
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

