"use client";

import { motion } from "framer-motion";

export default function ScrambleText({ text, className }: { text: string; className?: string }) {
  return (
    <motion.h1 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.2, 1, 0.2, 1] }}
      className={className}
    >
      {text}
    </motion.h1>
  );
}

