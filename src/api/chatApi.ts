import { ApiResponse, ChatHistory, Message } from '../types';

// Use environment variable in production, fallback to localhost in development
const API_URL = (import.meta.env?.VITE_API_URL as string) || 'http://localhost:5000/api';

export const chatApi = {
  async sendMessage(message: string): Promise<ApiResponse<Message>> {
    try {
      const response = await fetch(`${API_URL}/send_message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies for session authentication
        body: JSON.stringify({ message }),
      });

      return await response.json();
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  },

  async getChatHistory(): Promise<ApiResponse<ChatHistory>> {
    try {
      const response = await fetch(`${API_URL}/chat_history`, {
        credentials: 'include', // Include cookies for session authentication
      });
      return await response.json();
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  },

  async clearChat(): Promise<ApiResponse<null>> {
    try {
      const response = await fetch(`${API_URL}/clear_chat`, {
        method: 'POST',
        credentials: 'include', // Include cookies for session authentication
      });
      return await response.json();
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  },

  async login(username: string, password: string): Promise<ApiResponse<{ user_id: string }>> {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies for session authentication
        body: JSON.stringify({ username, password }),
      });

      return await response.json();
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  },

  async register(username: string, password: string): Promise<ApiResponse<null>> {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies for session authentication
        body: JSON.stringify({ username, password }),
      });

      return await response.json();
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  },

  async logout(): Promise<ApiResponse<null>> {
    try {
      const response = await fetch(`${API_URL}/logout`, {
        method: 'POST',
        credentials: 'include', // Include cookies for session authentication
      });
      return await response.json();
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  },
};
