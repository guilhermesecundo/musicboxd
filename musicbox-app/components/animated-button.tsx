"use client"

import { forwardRef, type ButtonHTMLAttributes } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface AnimatedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "gradient"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
  asChild?: boolean
}

export const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    if (variant === "gradient") {
      return (
        <Button
          ref={ref}
          className={cn(
            "relative overflow-hidden bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600 transition-all duration-300",
            "after:absolute after:inset-0 after:bg-gradient-to-r after:from-blue-500/0 after:to-pink-500/0 after:hover:to-pink-500/20 after:transition-all after:duration-500",
            className,
          )}
          size={size}
          asChild={asChild}
          {...props}
        />
      )
    }

    return (
      <Button
        ref={ref}
        className={cn("transition-all duration-300 hover:shadow-md active:scale-95", className)}
        variant={variant}
        size={size}
        asChild={asChild}
        {...props}
      />
    )
  },
)
AnimatedButton.displayName = "AnimatedButton"
