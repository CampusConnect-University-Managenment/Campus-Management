"use client"

import { useRef, useEffect } from "react"
import MessageInput from "./MessageInput"

const ChatWindow = ({ chat, currentUser, onSendMessage }) => {
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chat?.messages])

  if (!chat) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-600 text-lg bg-white">
        <div className="text-center">
          <span role="img" aria-label="chat" className="text-4xl block mb-2">
            💬
          </span>
          Select a chat to start messaging
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Chat Header */}
      <div className="px-8 py-4 border-b border-gray-200 bg-gray-50">
        <h2 className="text-lg text-gray-800 mb-1 font-medium">{chat.name}</h2>
        <div className="text-sm text-gray-600 flex items-center gap-2">
          <span className="flex items-center">
            <span role="img" aria-label="users" className="mr-1">
              👥
            </span>
            {chat.participants?.length || 0} participants
          </span>
          <span className="text-gray-400">•</span>
          <span className="uppercase">{chat.type} chat</span>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {chat.messages?.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-600 text-base">
            No messages yet. Start the conversation!
          </div>
        ) : (
          chat.messages?.map((message) => (
            <div
              key={message.id}
              className={`mb-4 flex items-start gap-3 ${message.senderId === currentUser.id ? "flex-row-reverse" : ""}`}
            >
              {/* Message Avatar */}
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                title={message.senderName}
                style={{
                  background: message.senderId === currentUser.id ? "#a18cd1" : "#fbc2eb",
                }}
              >
                {message.senderName?.charAt(0).toUpperCase()}
              </div>

              {/* Message Content */}
              <div className={`max-w-[70%] ${message.senderId === currentUser.id ? "text-right" : ""}`}>
                <div
                  className="px-4 py-3 rounded-2xl shadow-sm relative text-gray-900"
                  style={{ backgroundColor: "#b39ddb" }}
                >
                  <div className="text-sm leading-relaxed break-words">{message.content}</div>
                </div>
                <div
                  className={`text-xs mt-1 flex items-center gap-1 ${
                    message.senderId === currentUser.id ? "text-gray-400 justify-end" : "text-gray-500"
                  }`}
                >
                  <span>{message.senderName}</span>
                  <span>•</span>
                  <span>
                    {new Date(message.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <MessageInput onSendMessage={onSendMessage} />
    </div>
  )
}

export default ChatWindow
