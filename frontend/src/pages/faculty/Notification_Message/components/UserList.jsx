import React, { useState } from 'react';

const UserList = ({ users, chats, selectedChat, onChatSelect, currentUser }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="user-list">
      <div className="user-list-header">
        <h3>Chats ({filteredChats.length})</h3>
        <input
          type="text"
          className="search-input"
          placeholder="Search chats..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="chat-list">
        {filteredChats.map((chat) => (
          <div
            key={chat.id}
            className={`chat-item ${selectedChat?.id === chat.id ? 'active' : ''}`}
            onClick={() => onChatSelect(chat)}
          >
            <div className="chat-item-header">
              <span className="chat-name">{chat.name}</span>
              <span className={`chat-type ${chat.type}`}>{chat.type}</span>
            </div>
            <div className="chat-preview">
              {chat.messages.length > 0 
                ? chat.messages[chat.messages.length - 1].content
                : 'No messages yet'
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;