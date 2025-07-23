// Mock users data
export const mockUsers = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    role: "faculty",
    department: "Computer Science",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
  },
  {
    id: 2,
    name: "John Smith",
    role: "student",
    year: "3rd",
    department: "Computer Science",
    rollNumber: "CS2021001",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
  },
  {
    id: 3,
    name: "Admin User",
    role: "admin",
    department: "Administration",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
  },
  {
    id: 4,
    name: "Jane Doe",
    role: "student",
    year: "2nd",
    department: "Information Technology",
    rollNumber: "IT2022001",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "away",
  },
]

// Fixed mock chats data with clear separation of concerns
export const mockChats = [
  {
    id: 1,
    name: "General Announcements",
    type: "general",
    participantIds: [1, 2, 3, 4], // Array of user IDs for logic
    participants: 4, // Number for display
    messages: [
      {
        id: 1,
        content: "Welcome to the new academic year!",
        senderId: 3,
        senderName: "Admin User",
        timestamp: new Date(Date.now() - 60000),
      },
      {
        id: 2,
        content: "Please check your course schedules.",
        senderId: 3,
        senderName: "Admin User",
        timestamp: new Date(Date.now() - 30000),
      },
    ],
  },
  {
    id: 2,
    name: "Faculty Discussion",
    type: "faculty",
    participantIds: [1, 3], // Array of user IDs for logic
    participants: 2, // Number for display
    messages: [
      {
        id: 1,
        content: "How is the new semester going?",
        senderId: 1,
        senderName: "Dr. Sarah Johnson",
        timestamp: new Date(Date.now() - 120000),
      },
    ],
  },
  {
    id: 3,
    name: "CS Students",
    type: "general",
    participantIds: [2, 4], // Array of user IDs for logic
    participants: 2, // Number for display
    messages: [
      {
        id: 1,
        content: "Anyone have notes for today's lecture?",
        senderId: 2,
        senderName: "John Smith",
        timestamp: new Date(Date.now() - 180000),
      },
    ],
  },
]
