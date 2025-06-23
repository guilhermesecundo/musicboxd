"use client"

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface AnimatedCardProps {
  children: ReactNode
  className?: string
}

export function AnimatedCard({ children, className }: AnimatedCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 flex flex-col h-full",
        className,
      )}
    >
      {children}
    </div>
  )
}
