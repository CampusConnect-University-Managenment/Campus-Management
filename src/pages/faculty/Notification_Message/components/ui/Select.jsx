"use client"

import { useState } from "react"

const Select = ({ value, onValueChange, children }) => {
  const [isOpen, setIsOpen] = useState(false)

  return <div className="relative">{children}</div>
}

const SelectTrigger = ({ children, className = "", ...props }) => {
  return (
    <button
      className={`flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

const SelectValue = ({ placeholder }) => {
  return <span className="text-gray-500">{placeholder}</span>
}

const SelectContent = ({ children }) => {
  return (
    <div className="absolute top-full left-0 right-0 z-50 mt-1 max-h-60 overflow-auto rounded-md border border-gray-300 bg-white shadow-lg">
      {children}
    </div>
  )
}

const SelectItem = ({ value, children, onClick }) => {
  return (
    <div className="cursor-pointer px-3 py-2 text-sm hover:bg-gray-100" onClick={() => onClick && onClick(value)}>
      {children}
    </div>
  )
}

export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue }
