import React, { useState, useEffect } from 'react';
import ChatWindow from './components/ChatWindow';
import UserList from './components/UserList';
import NotificationPanel from './components/NotificationPanel';
import RoleSelector from './components/RoleSelector';
import useSocket from './hooks/useSocket';
import { mockUsers, mockChats } from './utils/mockData';
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState(mockUsers[0]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [chats, setChats] = useState(mockChats);
  const [notifications, setNotifications] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState(mockUsers);
  
  const socket = useSocket('http://localhost:3001');

  useEffect(() => {
    if (socket) {
      socket.on('message', (message) => {
        setChats(prevChats => 
          prevChats.map(chat => 
            chat.id === message.chatId 
              ? { ...chat, messages: [...chat.messages, message] }
              : chat
          )
        );
        
        if (message.senderId !== currentUser.id) {
          setNotifications(prev => [...prev, {
            id: Date.now(),
            message: `New message from ${message.senderName}`,
            timestamp: new Date(),
            type: 'message'
          }]);
        }
      });
    }
  }, [socket, currentUser.id]);

  const sendMessage = (content) => {
    if (!selectedChat || !content.trim()) return;

    const message = {
      id: Date.now(),
      content,
      senderId: currentUser.id,
      senderName: currentUser.name,
      timestamp: new Date(),
      chatId: selectedChat.id
    };

    if (socket) {
      socket.emit('sendMessage', message);
    }

    setChats(prevChats => 
      prevChats.map(chat => 
        chat.id === selectedChat.id 
          ? { ...chat, messages: [...chat.messages, message] }
          : chat
      )
    );
  };

  const getAvailableChats = () => {
    return chats.filter(chat => {
      if (currentUser.role === 'admin') return true;
      if (currentUser.role === 'faculty') {
        return chat.type === 'faculty' || chat.participants.includes(currentUser.id);
      }
      if (currentUser.role === 'student') {
        return chat.type === 'general' || chat.participants.includes(currentUser.id);
      }
      return false;
    });
  };

  return (
    <div className="app">
      <div className="app-header">
        <h1>🎓 Campus Connect</h1>
        <RoleSelector currentUser={currentUser} setCurrentUser={setCurrentUser} users={mockUsers} />
      </div>
      
      <div className="app-body">
        <div className="sidebar">
          <UserList 
            users={onlineUsers}
            chats={getAvailableChats()}
            selectedChat={selectedChat}
            onChatSelect={setSelectedChat}
            currentUser={currentUser}
          />
        </div>
        
        <div className="main-content">
          <ChatWindow 
            chat={selectedChat}
            currentUser={currentUser}
            onSendMessage={sendMessage}
          />
        </div>
        
        <div className="notifications">
          <NotificationPanel 
            notifications={notifications}
            onClearNotifications={() => setNotifications([])}
          />
        </div>
      </div>
    </div>
  );
}

export default App;