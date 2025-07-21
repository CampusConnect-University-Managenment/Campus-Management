export const mockUsers = [
  { id: 1, name: 'Admin User', role: 'admin', email: 'admin@campus.edu' },
  { id: 2, name: 'Dr. Smith', role: 'faculty', email: 'smith@campus.edu' },
  { id: 3, name: 'Prof. Johnson', role: 'faculty', email: 'johnson@campus.edu' },
  { id: 4, name: 'John Doe', role: 'student', email: 'john@student.campus.edu' },
  { id: 5, name: 'Jane Smith', role: 'student', email: 'jane@student.campus.edu' },
  { id: 6, name: 'Mike Wilson', role: 'student', email: 'mike@student.campus.edu' }
];

export const mockChats = [
  {
    id: 1,
    name: 'General Announcements',
    type: 'general',
    participants: [1, 2, 3, 4, 5, 6],
    messages: [
      {
        id: 1,
        content: 'Welcome to Campus Connect! This is the general announcements channel.',
        senderId: 1,
        senderName: 'Admin User',
        timestamp: new Date(Date.now() - 3600000)
      },
      {
        id: 2,
        content: 'Please remember to check your emails regularly for important updates.',
        senderId: 1,
        senderName: 'Admin User',
        timestamp: new Date(Date.now() - 1800000)
      }
    ]
  },
  {
    id: 2,
    name: 'Faculty Discussion',
    type: 'faculty',
    participants: [1, 2, 3],
    messages: [
      {
        id: 3,
        content: 'Good morning everyone! How are the new semester preparations going?',
        senderId: 2,
        senderName: 'Dr. Smith',
        timestamp: new Date(Date.now() - 7200000)
      },
      {
        id: 4,
        content: 'Going well! I have updated my course materials for the new term.',
        senderId: 3,
        senderName: 'Prof. Johnson',
        timestamp: new Date(Date.now() - 3600000)
      }
    ]
  },
  {
    id: 3,
    name: 'Computer Science Students',
    type: 'general',
    participants: [2, 4, 5, 6],
    messages: [
      {
        id: 5,
        content: 'Hello CS students! Welcome to our dedicated channel.',
        senderId: 2,
        senderName: 'Dr. Smith',
        timestamp: new Date(Date.now() - 5400000)
      },
      {
        id: 6,
        content: 'Thank you Dr. Smith! Excited for the new semester.',
        senderId: 4,
        senderName: 'John Doe',
        timestamp: new Date(Date.now() - 3600000)
      },
      {
        id: 7,
        content: 'When will the assignment schedule be available?',
        senderId: 5,
        senderName: 'Jane Smith',
        timestamp: new Date(Date.now() - 1800000)
      }
    ]
  }
];