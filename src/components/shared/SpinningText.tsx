"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function SpinningText() {
  const { scrollYProgress } = useScroll();
  // Rotates a full 360 degrees forward as the user scrolls down the page
  const rotateValue = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <motion.div
      style={{ rotate: rotateValue }}
      aria-hidden="true"
      className="absolute -top-[25vh] -right-[15vw] w-[90vh] h-[90vh] text-border/40 pointer-events-none select-none z-0 hidden lg:block"
    >
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <path
          id="circlePath"
          fill="none"
          d="M 100, 100 m -80, 0 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0"
        />
        <text className="font-display text-[1.4rem] font-bold uppercase tracking-[0.25em]" fill="currentColor">
          <textPath href="#circlePath" startOffset="0%">
            {"LET’S CREATE THINGS • LET’S CREATE THINGS • "}
          </textPath>
        </text>
      </svg>
    </motion.div>
  );
}
