"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface AnimatedPortnoxLogoProps {
  width?: number
  height?: number
  showText?: boolean
  animate?: boolean
  className?: string
}

export default function AnimatedPortnoxLogo({
  width = 140,
  height = 40,
  showText = true,
  animate = true,
  className = "",
}: AnimatedPortnoxLogoProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([])

  useEffect(() => {
    if (animate) {
      const newParticles = Array.from({ length: 5 }, (_, i) => ({
        id: i,
        x: Math.random() * width,
        y: Math.random() * height,
      }))
      setParticles(newParticles)
    }
  }, [animate, width, height])

  const logoVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  }

  const glowVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: [0, 0.5, 0],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  const particleVariants = {
    animate: {
      y: [-10, -20, -10],
      opacity: [0, 1, 0],
      transition: {
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  return (
    <motion.div
      className={`relative inline-flex items-center ${className}`}
      style={{ width, height }}
      variants={logoVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Glow Effect */}
      {animate && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-600 rounded-lg blur-lg"
          variants={glowVariants}
          initial="initial"
          animate="animate"
        />
      )}

      {/* Floating Particles */}
      {animate && (
        <AnimatePresence>
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-1 h-1 bg-blue-400 rounded-full"
              style={{ left: particle.x, top: particle.y }}
              variants={particleVariants}
              animate="animate"
            />
          ))}
        </AnimatePresence>
      )}

      {/* Main Logo Container */}
      <div className="relative z-10 flex items-center gap-2">
        {/* Logo Icon */}
        <motion.div
          className="flex items-center justify-center"
          animate={isHovered ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <svg
            width={height * 0.8}
            height={height * 0.8}
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              d="M16 2L28 8v16L16 30L4 24V8L16 2z"
              fill="url(#portnoxGradient)"
              stroke="url(#portnoxStroke)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
            <motion.circle
              cx="16"
              cy="16"
              r="6"
              fill="white"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            />
            <motion.path
              d="M13 16l2 2 4-4"
              stroke="url(#portnoxGradient)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            />
            <defs>
              <linearGradient id="portnoxGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="50%" stopColor="#6366F1" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
              <linearGradient id="portnoxStroke" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1E40AF" />
                <stop offset="100%" stopColor="#7C3AED" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Logo Text */}
        {showText && (
          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <motion.span
              className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"
              style={{ fontSize: height * 0.4 }}
              animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              portnox
            </motion.span>
            {height > 30 && (
              <motion.span
                className="text-xs text-muted-foreground -mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.4 }}
              >
                CLEAR
              </motion.span>
            )}
          </motion.div>
        )}
      </div>

      {/* Pulse Effect on Hover */}
      <AnimatePresence>
        {isHovered && animate && (
          <motion.div
            className="absolute inset-0 border-2 border-blue-400 rounded-lg"
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 1.2, opacity: 0 }}
            exit={{ scale: 1, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}
