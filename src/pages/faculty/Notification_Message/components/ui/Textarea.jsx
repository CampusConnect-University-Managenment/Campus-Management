"use client"

const Textarea = ({ placeholder, value, onChange, onKeyDown, onKeyUp, className = "", disabled = false, ...props }) => {
  const baseClasses =
    "flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 resize-none"

  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      disabled={disabled}
      className={`${baseClasses} ${className}`}
      {...props}
    />
  )
}

export default Textarea
