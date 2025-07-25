"use client"

const ScrollArea = ({ children, className = "", ...props }) => {
  return (
    <div className={`relative overflow-hidden ${className}`} {...props}>
      <div className="h-full w-full overflow-auto">{children}</div>
    </div>
  )
}

export { ScrollArea }
