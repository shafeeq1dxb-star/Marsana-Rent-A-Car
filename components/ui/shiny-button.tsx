"use client"

import React, { useState } from "react"
import { motion, type MotionProps } from "framer-motion"

import { cn } from "@/lib/utils"

const animationProps: MotionProps = {
  initial: { "--x": "100%", scale: 0.8 },
  animate: { "--x": "-100%", scale: 1 },
  whileTap: { scale: 0.95 },
  transition: {
    repeat: Infinity,
    repeatType: "loop",
    repeatDelay: 1,
    type: "spring",
    stiffness: 20,
    damping: 15,
    mass: 2,
    scale: {
      type: "spring",
      stiffness: 200,
      damping: 5,
      mass: 0.5,
    },
  },
}

interface ShinyButtonProps
  extends Omit<React.HTMLAttributes<HTMLElement>, keyof MotionProps>,
    MotionProps {
  children: React.ReactNode
  className?: string
}

export const ShinyButton = React.forwardRef<
  HTMLButtonElement,
  ShinyButtonProps
>(({ children, className, ...props }, ref) => {
  const [isHovered, setIsHovered] = useState(false)

  const defaultStyle = {
    background: "linear-gradient(110deg, #5C4218 0%, #B89D5F 45%, #5C4218 100%)",
    borderColor: "rgba(92, 66, 24, 0.3)",
    boxShadow: "0 8px 32px rgba(92, 66, 24, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 2px 4px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease-in-out",
  }

  const hoverStyle = {
    background: "linear-gradient(110deg, #7A5A1F 0%, #D4C47A 45%, #7A5A1F 100%)",
    borderColor: "rgba(122, 90, 31, 0.3)",
    boxShadow: "0 12px 40px rgba(122, 90, 31, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.4), 0 4px 8px rgba(0, 0, 0, 0.15)",
    transition: "all 0.3s ease-in-out",
  }

  return (
    <motion.button
      ref={ref}
      className={cn(
        "relative cursor-pointer rounded-lg border px-6 py-2 font-medium backdrop-blur-xl transition-all duration-300 ease-in-out",
        className
      )}
      style={isHovered ? hoverStyle : defaultStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...animationProps}
      {...props}
    >
      <span
        className="relative block size-full text-sm tracking-wide text-[#1a1a1a] font-bold uppercase"
        style={{
          color: "#1a1a1a",
          maskImage:
            "linear-gradient(-75deg, rgba(255,255,255,0.9) calc(var(--x) + 20%), transparent calc(var(--x) + 30%), rgba(255,255,255,0.9) calc(var(--x) + 100%))",
          WebkitMaskImage:
            "linear-gradient(-75deg, rgba(255,255,255,0.9) calc(var(--x) + 20%), transparent calc(var(--x) + 30%), rgba(255,255,255,0.9) calc(var(--x) + 100%))",
        }}
      >
        {children}
      </span>
      <span
        style={{
          mask: "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box exclude,linear-gradient(rgb(0,0,0), rgb(0,0,0))",
          WebkitMask:
            "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box exclude,linear-gradient(rgb(0,0,0), rgb(0,0,0))",
          backgroundImage:
            "linear-gradient(-75deg, rgba(255,255,255,0.2) calc(var(--x)+20%), rgba(255,255,255,0.6) calc(var(--x)+25%), rgba(255,255,255,0.2) calc(var(--x)+100%))",
        }}
        className="absolute inset-0 z-10 block rounded-[inherit] p-px"
      />
    </motion.button>
  )
})

ShinyButton.displayName = "ShinyButton"
