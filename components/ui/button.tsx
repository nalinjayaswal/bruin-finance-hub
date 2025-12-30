"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "small" | "medium" | "large"
}

/**
 * Button - iOS-style pill-shaped button with tactile feedback
 * 
 * Variants:
 * - primary: Accent background, white text
 * - secondary: Subtle background, accent text
 * - outline: Transparent bg, accent border
 * - ghost: Transparent bg, subtle hover
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "medium", className, children, ...props }, ref) => {
    const baseStyles = "rounded-lg font-medium inline-flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transition-all duration-200"

    const variantStyles = {
      primary: "bg-[hsl(168,100%,45%)] text-[hsl(216,24%,5%)] hover:bg-[hsl(168,100%,40%)] hover:shadow-[0_0_25px_rgba(0,229,196,0.4)] font-semibold",
      secondary: "bg-[var(--color-accent-muted)] text-[var(--color-accent)] hover:bg-[var(--color-accent-border)]",
      outline: "bg-transparent border-2 border-[hsl(168,100%,45%)] text-[hsl(168,100%,45%)] hover:bg-[hsl(168,100%,45%)]/10",
      ghost: "bg-transparent text-[var(--color-fg-primary)] hover:bg-[var(--color-bg-subtle)]",
    }

    const sizeStyles = {
      small: "px-4 py-2 text-sm h-9",
      medium: "px-6 py-3 text-base h-11",
      large: "px-7 py-4 text-lg h-14",
    }

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button }

