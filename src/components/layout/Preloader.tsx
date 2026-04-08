"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: [0.77, 0, 0.175, 1] }}
          className="fixed inset-0 z-[10000] bg-[#050A0F] flex flex-col items-center justify-center"
        >
          <div className="relative">
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="w-64 h-[2px] bg-[#00D4FF] origin-left"
            />
            <div className="mt-4 flex justify-between font-mono text-[10px] tracking-widest text-[#00D4FF]">
              <span>INITIALIZING SYSTEM...</span>
              <span>100%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
