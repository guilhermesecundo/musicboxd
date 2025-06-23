"use client"

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface AnimatedGradientTextProps {
  children: ReactNode
  className?: string
  from?: string
  to?: string
  darkFrom?: string
  darkTo?: string
}

export function AnimatedGradientText({
  children,
  className,
  from = "from-blue-400",
  to = "to-pink-400",
  darkFrom = "dark:from-blue-300",
  darkTo = "dark:to-pink-300",
}: AnimatedGradientTextProps) {
  return (
    <span
      className={cn(
        "bg-gradient-to-r bg-clip-text text-transparent animate-text-gradient",
        from,
        to,
        darkFrom,
        darkTo,
        className,
      )}
    >
      {children}
    </span>
  )
}
