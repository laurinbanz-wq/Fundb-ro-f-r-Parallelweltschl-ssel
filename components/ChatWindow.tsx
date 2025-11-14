
import React, { useRef, useEffect } from 'react';
import type { Message } from '../types';

interface ChatWindowProps {
  messages: Message[];
  isLoading: boolean;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, isLoading }) => {
  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((msg, index) => (
        <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
          <div className={`max-w-xs md:max-w-md lg:max-w-2xl px-4 py-2 rounded-lg shadow-md ${
            msg.sender === 'user' 
              ? 'bg-cyan-800/70 text-cyan-50' 
              : 'bg-gray-700/80 text-gray-200'
          }`}>
            <p className="whitespace-pre-wrap">{msg.text}</p>
          </div>
        </div>
      ))}
      {isLoading && (
        <div className="flex justify-start">
            <div className="max-w-xs md:max-w-md lg:max-w-2xl px-4 py-2 rounded-lg shadow-md bg-gray-700/80 text-gray-200">
                <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-cyan-300 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-cyan-300 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-cyan-300 rounded-full animate-pulse"></div>
                    <span className="text-gray-400">bearbeite...</span>
                </div>
            </div>
        </div>
      )}
      <div ref={endOfMessagesRef} />
    </div>
  );
};

export default ChatWindow;
   