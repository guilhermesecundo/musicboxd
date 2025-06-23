"use client"

import { useRef, useEffect, useState, type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface AnimateInViewProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  duration?: number
  once?: boolean
}

export function AnimateInView({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = 500,
  once = true,
}: AnimateInViewProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) {
            setHasAnimated(true)
          }
        } else if (!once && !hasAnimated) {
          setIsVisible(false)
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      },
    )

    const currentRef = ref.current

    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [once, hasAnimated])

  // Define transform values based on direction
  const getInitialTransform = () => {
    switch (direction) {
      case "up":
        return "translateY(20px)"
      case "down":
        return "translateY(-20px)"
      case "left":
        return "translateX(20px)"
      case "right":
        return "translateX(-20px)"
      case "none":
        return "none"
      default:
        return "translateY(20px)"
    }
  }

  return (
    <div
      ref={ref}
      className={cn("h-full", className)}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "none" : getInitialTransform(),
        transition: `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms ease-out ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  )
}
