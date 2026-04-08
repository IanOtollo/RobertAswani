"use client";

import Link from "next/link";
import { Globe, Terminal, Share2 } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0D1117] border-t border-[#1C2A36] pt-24 pb-12 mt-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-16 mb-24">
        {/* Branding */}
        <div className="flex flex-col gap-4">
          <Link href="/" className="font-display font-bold text-xl tracking-tighter text-[#E8EDF2] uppercase">
            ASWANI<span className="text-[#2D7DD2]">.ENG</span>
          </Link>
          <p className="font-mono text-[11px] text-[#3D4F5E] uppercase tracking-widest leading-relaxed">
            PCB Design & CAD Modeling <br />
            Engineering Student @ DeKUT <br />
            Nairobi, Kenya
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-6">
          <h4 className="font-mono text-[10px] text-[#3D4F5E] uppercase tracking-[0.3em]">Directory</h4>
          <div className="grid grid-cols-2 gap-4 font-mono text-[12px] text-[#7A8B99]">
            <Link href="/designs" className="hover:text-[#2D7DD2] transition-colors">Works</Link>
            <Link href="#about" className="hover:text-[#2D7DD2] transition-colors">About</Link>
            <Link href="#services" className="hover:text-[#2D7DD2] transition-colors">Services</Link>
            <Link href="#pricing" className="hover:text-[#2D7DD2] transition-colors">Pricing</Link>
            <Link href="#contact" className="hover:text-[#2D7DD2] transition-colors">Contact</Link>
          </div>
        </div>

        {/* Social / Legal */}
        <div className="flex flex-col gap-6 md:items-end">
          <h4 className="font-mono text-[10px] text-[#3D4F5E] uppercase tracking-[0.3em]">Connectivity</h4>
          <div className="flex gap-6">
            <a href="#" className="text-[#3D4F5E] hover:text-[#E8EDF2] transition-colors">
              <Terminal size={20} />
            </a>
            <a href="#" className="text-[#3D4F5E] hover:text-[#E8EDF2] transition-colors">
              <Share2 size={20} />
            </a>
            <a href="#" className="text-[#3D4F5E] hover:text-[#E8EDF2] transition-colors">
              <Globe size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 border-t border-[#1C2A36] flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-mono text-[10px] text-[#3D4F5E] uppercase tracking-widest">
          © {currentYear} ROBERT ASWANI. ALL RIGHTS RESERVED.
        </p>
        <p className="font-mono text-[10px] text-[#3D4F5E] uppercase tracking-widest">
          BUILT BY <a href="https://ianotollo.vercel.app" className="text-[#2D7DD2] hover:underline transition-all">IAN OTOLLO</a>
        </p>
      </div>
    </footer>
  );
}

