"use client"

import { useState } from "react"

const MessageInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (message.trim()) {
      onSendMessage(message)
      setMessage("")
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className="px-8 py-4 border-t border-gray-200 bg-white">
      <form onSubmit={handleSubmit} className="flex gap-4 items-end">
        <textarea
          className="flex-1 px-4 py-3 border border-gray-300 rounded-3xl text-sm resize-none max-h-32 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
          rows={1}
        />
        <button
          type="submit"
          className="px-6 py-3 bg-blue-500 text-white border-none rounded-3xl cursor-pointer text-sm font-medium transition-colors hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          disabled={!message.trim()}
        >
          Send
        </button>
      </form>
    </div>
  )
}

export default MessageInput
