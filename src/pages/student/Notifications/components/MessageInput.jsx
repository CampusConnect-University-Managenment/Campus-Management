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
    <div className="p-4 border-t border-gray-200 bg-white">
      <div className="flex items-end space-x-2">
        <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700 mb-1" disabled={disabled}>
          <Paperclip className="w-4 h-4" />
        </Button>
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            placeholder="Type a message... (Enter to send, Shift+Enter for new line)"
            className="min-h-[40px] max-h-[120px] resize-none pr-12 py-2 w-full rounded-md border border-gray-300 bg-white px-3 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
            disabled={disabled}
          />
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-2 bottom-1 text-gray-500 hover:text-gray-700 p-1 h-8 w-8"
            disabled={disabled}
          >
            <Smile className="w-4 h-4" />
          </Button>
        </div>
        <Button
          onClick={handleSend}
          disabled={!message.trim() || disabled}
          className="bg-blue-500 hover:bg-blue-600 text-white mb-1"
          size="sm"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
      <div className="text-xs text-gray-400 mt-1 px-1">Press Enter to send, Shift+Enter for new line</div>
    </div>
  )
}

export default MessageInput
