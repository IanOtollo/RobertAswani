import type { Metadata } from "next";
import { Orbitron, Space_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import CustomCursor from "@/components/layout/CustomCursor";
import Navbar from "@/components/layout/Navbar";
import Preloader from "@/components/layout/Preloader";



const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Robert Aswani | Precision PCB Design & CAD Modeling",
  description: "Production-ready PCB design and CAD modeling services by Robert Aswani, specializing in high-fidelity engineering solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${orbitron.variable} ${spaceMono.variable} font-mono bg-[#050A0F] text-white antialiased selection:bg-[#00D4FF] selection:text-black overflow-x-hidden`}>
        {/* GSAP CDN */}
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" strategy="afterInteractive" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js" strategy="afterInteractive" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/SplitText.min.js" strategy="afterInteractive" />
        {/* Lenis CDN */}
        <Script src="https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.42/dist/lenis.min.js" strategy="afterInteractive" />
        {/* Three.js CDN */}
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js" strategy="afterInteractive" />
        
        <Preloader />

        <div className="scroll-progress fixed top-0 left-0 w-0 h-[2px] bg-[#00D4FF] z-[10001]" />
        <div className="grain" />
        <CustomCursor />
        <Navbar />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>


    </html>
  );
}

