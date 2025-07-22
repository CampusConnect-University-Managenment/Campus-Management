"use client"

import { forwardRef } from "react"

const Button = forwardRef(
  ({ className = "", variant = "default", size = "default", disabled = false, children, ...props }, ref) => {
    const baseClasses =
      "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"

    const variants = {
      default: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
      ghost: "hover:bg-gray-100 focus:ring-gray-500",
      outline: "border border-gray-300 bg-white hover:bg-gray-50 focus:ring-blue-500",
    }

    const sizes = {
      default: "h-10 py-2 px-4",
      sm: "h-8 px-3 text-sm",
      lg: "h-12 px-8",
    }

    const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`

    return (
      <button className={classes} disabled={disabled} ref={ref} {...props}>
        {children}
      </button>
    )
  },
)

Button.displayName = "Button"

export default Button
