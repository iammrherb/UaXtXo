"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface AnimatedPortnoxLogoProps {
  width?: number
  height?: number
  showText?: boolean
  animate?: boolean
  size?: "xs" | "sm" | "md" | "lg" | "xl"
  className?: string
}

export default function AnimatedPortnoxLogo({
  width,
  height,
  showText = true,
  animate = true,
  size = "md",
  className,
}: AnimatedPortnoxLogoProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const particlesRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)

  // Size mapping
  const sizeMap = {
    xs: { width: 16, height: 16, textClass: "text-xs" },
    sm: { width: 24, height: 24, textClass: "text-sm" },
    md: { width: 32, height: 32, textClass: "text-base" },
    lg: { width: 48, height: 48, textClass: "text-lg" },
    xl: { width: 64, height: 64, textClass: "text-xl" },
  }

  const finalWidth = width || sizeMap[size].width
  const finalHeight = height || sizeMap[size].height
  const textClass = sizeMap[size].textClass

  useEffect(() => {
    setIsVisible(true)
    return () => setIsVisible(false)
  }, [])

  useEffect(() => {
    if (!animate || !isHovered || !particlesRef.current) return

    const particles = Array.from({ length: 10 }).map(() => {
      const particle = document.createElement("div")
      particle.className = "absolute rounded-full bg-blue-400 opacity-0 animate-particle pointer-events-none"
      const size = Math.random() * 4 + 2
      particle.style.width = `${size}px`
      particle.style.height = `${size}px`
      particle.style.left = `${Math.random() * 100}%`
      particle.style.top = `${Math.random() * 100}%`
      particle.style.animationDelay = `${Math.random() * 1000}ms`
      particle.style.animationDuration = `${Math.random() * 1000 + 1000}ms`
      return particle
    })

    particles.forEach((p) => particlesRef.current?.appendChild(p))

    return () => {
      particles.forEach((p) => p.remove())
    }
  }, [isHovered, animate])

  return (
    <div
      className={cn("relative flex items-center gap-2", className)}
      onMouseEnter={() => animate && setIsHovered(true)}
      onMouseLeave={() => animate && setIsHovered(false)}
      ref={logoRef}
    >
      <div
        className={cn(
          "relative transition-all duration-500 ease-out",
          animate && isHovered && "scale-110 rotate-3",
          isVisible ? "opacity-100" : "opacity-0",
        )}
        style={{ width: finalWidth, height: finalHeight }}
      >
        <div
          ref={particlesRef}
          className="absolute inset-0 w-full h-full overflow-hidden rounded-full pointer-events-none"
        />
        <div
          className={cn(
            "absolute inset-0 rounded-full bg-blue-500/20 blur-md transition-all duration-500",
            animate && isHovered ? "opacity-100 scale-150" : "opacity-0 scale-100",
          )}
        />
        <Image
          src="/portnox-logo.png"
          alt="Portnox"
          width={finalWidth}
          height={finalHeight}
          className={cn(
            "object-contain transition-all duration-500",
            animate && isHovered && "drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]",
          )}
          priority
        />
      </div>
      {showText && (
        <span
          className={cn(
            "font-bold transition-all duration-500",
            textClass,
            animate && isHovered
              ? "bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
              : "text-blue-600 dark:text-blue-400",
          )}
        >
          Portnox
        </span>
      )}
    </div>
  )
}
