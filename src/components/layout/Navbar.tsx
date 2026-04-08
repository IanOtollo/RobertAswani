"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${scrolled ? "bg-black/80 backdrop-blur-md py-4" : "bg-transparent py-8"}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-24 flex justify-between items-center">
        <Link href="/" className="font-display font-bold text-xl tracking-tighter group">
          ASWANI <span className="text-[#00D4FF] group-hover:text-[#00FF88] transition-colors">| ENGINEERS</span>
        </Link>
        
        <div className="hidden md:flex gap-12 font-mono text-xs tracking-widest text-gray-400">
          <Link href="/" className="hover:text-[#00D4FF] transition-colors">HOME</Link>
          <Link href="/designs" className="hover:text-[#00D4FF] transition-colors">DESIGNS</Link>
          <Link href="#about" className="hover:text-[#00D4FF] transition-colors">ABOUT</Link>
          <Link href="#contact" className="hover:text-[#00D4FF] transition-colors">CONTACT</Link>
        </div>

        <button className="md:hidden text-[#00D4FF]">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </button>
      </div>
    </nav>
  );
}
