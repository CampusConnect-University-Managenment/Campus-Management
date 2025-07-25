"use client"

import { useState, useRef } from "react"
import Button from "./ui/Button"
import { Send, Paperclip, Smile } from "lucide-react"

const MessageInput = ({ onSendMessage, disabled = false }) => {
  const [message, setMessage] = useState("")
  const [isShiftPressed, setIsShiftPressed] = useState(false)
  const textareaRef = useRef(null)

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim())
      setMessage("")
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto"
      }
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Shift") {
      setIsShiftPressed(true)
    }
    if (e.key === "Enter" && !isShiftPressed) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleKeyUp = (e) => {
    if (e.key === "Shift") {
      setIsShiftPressed(false)
    }
  }

  const handleInputChange = (e) => {
    setMessage(e.target.value)
    const textarea = e.target
    textarea.style.height = "auto"
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + "px"
  }

  return (
    <div className="border-t-2 border-gray-300 bg-white px-3 py-3 sm:px-4 sm:py-4 shadow-lg">
      <div className="flex items-end space-x-2 sm:space-x-3">
        {/* File attachment button */}
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 mb-1 p-2 rounded-xl transition-all duration-200 transform hover:scale-105"
          disabled={disabled}
        >
          <Paperclip className="w-4 h-4 sm:w-5 sm:h-5" />
        </Button>

        {/* Message input container */}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            placeholder="Type a message... (Enter to send, Shift+Enter for new line)"
            className="min-h-[48px] max-h-[120px] resize-none w-full rounded-xl border-2 border-gray-300 bg-gray-50 hover:bg-white px-4 py-3 pr-12 text-sm sm:text-base placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 shadow-sm"
            disabled={disabled}
          />

          {/* Emoji button */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-2 bottom-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 p-1.5 h-8 w-8 rounded-lg transition-all duration-200 transform hover:scale-105"
            disabled={disabled}
          >
            <Smile className="w-4 h-4" />
          </Button>
        </div>

        {/* Send button */}
        <Button
          onClick={handleSend}
          disabled={!message.trim() || disabled}
          className="bg-blue-600 hover:bg-blue-700 hover:shadow-lg text-white mb-1 p-3 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none shadow-md"
          size="sm"
        >
          <Send className="w-4 h-4 sm:w-5 sm:h-5" />
        </Button>
      </div>

      {/* Helper text */}
      <div className="text-xs text-gray-400 mt-2 px-1 flex items-center justify-between">
        <span>Press Enter to send, Shift+Enter for new line</span>
        {message.length > 0 && (
          <span className="text-gray-500 font-medium">
            {message.length} character{message.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>
    </div>
  )
}

export default MessageInput
