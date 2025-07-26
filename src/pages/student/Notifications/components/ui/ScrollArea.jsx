"use client"

const ScrollArea = ({ children, className = "", maxHeight = "300px", ...props }) => {
  return (
    <div
      className={`relative ${className}`}
      style={{ maxHeight, minHeight: "100px", overflowY: "auto" }}
      {...props}
    >
      <div className="w-full">{children}</div>
    </div>
  )
}

export { ScrollArea }
