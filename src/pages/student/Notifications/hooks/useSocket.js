"use client"

import { useEffect, useState } from "react"

// Mock socket implementation for development
const createMockSocket = () => {
  const listeners = {}

  return {
    on: (event, callback) => {
      if (!listeners[event]) {
        listeners[event] = []
      }
      listeners[event].push(callback)
    },
    off: (event, callback) => {
      if (listeners[event]) {
        listeners[event] = listeners[event].filter((cb) => cb !== callback)
      }
    },
    emit: (event, data) => {
      console.log(`Socket emit: ${event},`, data)
      // Mock response for development
      if (event === "sendMessage") {
        setTimeout(() => {
          if (listeners.message) {
            listeners.message.forEach((callback) => callback(data))
          }
        }, 100)
      }
    },
    disconnect: () => {
      console.log("Socket disconnected")
    },
  }
}

export default function useSocket(serverPath) {
  const [socket, setSocket] = useState(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    // For development, use mock socket
    // In production, replace with actual socket.io implementation
    const mockSocket = createMockSocket()

    console.log("✅ Mock Socket connected")
    setIsConnected(true)
    setSocket(mockSocket)

    return () => {
      console.log("🧹 Cleaning up socket connection")
      if (mockSocket.disconnect) {
        mockSocket.disconnect()
      }
    }
  }, [serverPath])

  return socket
}