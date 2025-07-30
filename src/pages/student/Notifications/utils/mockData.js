// ✅ Mock users used in UI and for matching senderId
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

/**
 * ✅ Single course-based chat group
 * Must match backend's groupId: "CSE101"
 */
export const mockChatsNew = [
  {
    id: "CSE101", // ✅ this is the groupId used by backend
    name: "CSE101 - Demo Group",
    type: "course",
    participantIds: [1, 2], // Dr. Sarah (faculty) and John (student)
    participants: 2,
    messages: [
      {
        id: 1,
        content: "Let's discuss the assignment.",
        senderId: 1,
        senderName: "Dr. Sarah Johnson",
        timestamp: new Date(Date.now() - 60000),
      },
      {
        id: 2,
        content: "Sure! I'm almost done with mine.",
        senderId: 2,
        senderName: "John Smith",
        timestamp: new Date(Date.now() - 30000),
      },
    ],
  },
]
