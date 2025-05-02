import React from 'react';
import { Message } from '../types';
import '../styles/ChatMessage.css';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isAi = message.sender === 'ai';
  
  return (
    <div className={`chat-message ${isAi ? 'ai-message' : 'user-message'}`}>
      <div className="message-content">
        <div className="message-sender">{isAi ? 'AI' : 'You'}</div>
        <div className="message-text">{message.content}</div>
        <div className="message-timestamp">{new Date(message.timestamp).toLocaleTimeString()}</div>
      </div>
    </div>
  );
};

export default ChatMessage;
