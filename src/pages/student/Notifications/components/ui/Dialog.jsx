"use client"

import { useEffect } from "react"

const Dialog = ({ open, onOpenChange, children }) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => onOpenChange(false)} />
      <div className="relative z-50 max-h-[90vh] overflow-y-auto">{children}</div>
    </div>
  )
}

const DialogContent = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-4 ${className}`}
      onClick={(e) => e.stopPropagation()}
      {...props}
    >
      {children}
    </div>
  )
}

const DialogHeader = ({ children, className = "", ...props }) => {
  return (
    <div className={`mb-4 ${className}`} {...props}>
      {children}
    </div>
  )
}

const DialogTitle = ({ children, className = "", ...props }) => {
  return (
    <h2 className={`text-lg font-semibold text-gray-900 ${className}`} {...props}>
      {children}
    </h2>
  )
}

export { Dialog, DialogContent, DialogHeader, DialogTitle }
