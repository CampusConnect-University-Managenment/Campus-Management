import React, { useRef, useEffect } from 'react';
import MessageInput from './MessageInput';

const ChatWindow = ({ chat, currentUser, onSendMessage }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat]);

  if (!chat) {
    return (
      <div className="chat-window chat-window-empty">
        <div className="no-chat-selected">
          <span role="img" aria-label="chat">💬</span> Select a chat to start messaging
        </div>
      </div>
    );
  }

  return (
    <div className="chat-window">
      <div className="chat-header">
        <h2>{chat.name}</h2>
        <div className="chat-info">
          <span className="participants">
            <span role="img" aria-label="users">👥</span> {chat.participants.length} participants
          </span>
          <span className="dot">•</span>
          <span className="chat-type">{chat.type} chat</span>
        </div>
      </div>
      <div className="messages-container">
        {chat.messages.length === 0 ? (
          <div className="no-messages">No messages yet. Start the conversation!</div>
        ) : (
          chat.messages.map((message) => (
            <div
              key={message.id}
              className={`message ${message.senderId === currentUser.id ? 'own' : 'other'}`}
            >
              <div className="message-avatar" title={message.senderName} style={{ background: message.senderId === currentUser.id ? '#a18cd1' : '#fbc2eb' }}>
                {message.senderName.charAt(0).toUpperCase()}
              </div>
              <div className="message-content">
                <div className="message-bubble">
                  <div className="message-text">{message.content}</div>
                </div>
                <div className="message-meta">
                  <span className="sender">{message.senderName}</span>
                  <span className="meta-dot">•</span>
                  <span className="timestamp">{new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      <MessageInput onSendMessage={onSendMessage} />
    </div>
  );
};

export default ChatWindow;