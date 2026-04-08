import type { Metadata } from "next";
import { Syne, DM_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import CustomCursor from "@/components/layout/CustomCursor";
import Navbar from "@/components/layout/Navbar";
import Global3DBackground from "@/components/layout/Global3DBackground";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  weight: ["300", "400", "500"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ASWANI.ENG | High-Precision Engineering",
  description: "Robert Aswani delivers production-ready PCB circuit architecture and precision CAD modeling. Commissioned by IOMTechs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${syne.variable} ${dmMono.variable} font-mono bg-[#080C10] text-[#E8EDF2] antialiased selection:bg-[#2D7DD2] selection:text-white overflow-x-hidden`}>
        {/* GSAP & Plugins */}
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" strategy="beforeInteractive" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" strategy="beforeInteractive" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/SplitText.min.js" strategy="lazyOnload" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/CustomEase.min.js" strategy="beforeInteractive" />
        
        {/* Lenis Smooth Scroll */}
        <Script src="https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.42/dist/lenis.min.js" strategy="beforeInteractive" />
        
        {/* Three.js */}
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js" strategy="beforeInteractive" />
        
        {/* Lucide Icons */}
        <Script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js" strategy="afterInteractive" />

        {/* 1px Scroll Progress Bar */}
        <div className="scroll-progress fixed top-0 left-0 w-0 h-[1px] bg-[#2D7DD2] z-[99999]" />
        
        <Global3DBackground />
        <CustomCursor />
        <Navbar />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}



