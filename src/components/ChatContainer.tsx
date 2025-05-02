import React, { useEffect, useState, useRef } from 'react';
import { Message } from '../types';
import { chatApi } from '../api/chatApi';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import '../styles/ChatContainer.css';

const ChatContainer: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    loadChatHistory();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadChatHistory = async () => {
    const response = await chatApi.getChatHistory();
    if (response.success && response.data) {
      setMessages(response.data.messages);
    }
  };

  const handleSendMessage = async (content: string) => {
    // Optimistically add user message to UI
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await chatApi.sendMessage(content);

      if (response.success && response.data) {
        setMessages((prev) => [...prev, response.data as Message]);
      } else {
        // Handle error
        console.error('Error sending message:', response.error);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = async () => {
    const response = await chatApi.clearChat();
    if (response.success) {
      setMessages([]);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>AI Friend Chat</h2>
        <button onClick={handleClearChat} className="clear-button">
          Clear Chat
        </button>
      </div>

      <div className="messages-container">
        {messages.length === 0 ? (
          <div className="empty-chat">Start a conversation with your AI friend!</div>
        ) : (
          messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default ChatContainer;
