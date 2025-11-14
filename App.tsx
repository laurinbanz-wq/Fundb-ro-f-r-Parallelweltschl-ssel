
import React, { useState, useEffect, useCallback } from 'react';
import { getBotResponse } from './services/geminiService';
import type { Message } from './types';
import ProgressBar from './components/ProgressBar';
import ChatWindow from './components/ChatWindow';
import UserInput from './components/UserInput';
import KeyDisplay from './components/KeyDisplay';

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isGameWon, setIsGameWon] = useState(false);

  const startConversation = useCallback(async () => {
    setIsLoading(true);
    setMessages([]);
    // Initial message from bot.
     const initialBotMessage: Message = {
      sender: 'bot',
      text: 'Digitale Archivariuseinheit Aktiva 7 ist betriebsbereit. Nennen Sie Ihr Anliegen gemäß der Atlantischen Fundverordnung. Unvollständige oder formlose Anträge werden abgewiesen.'
    };
    setMessages([initialBotMessage]);
    setProgress(0);
    setIsGameWon(false);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    startConversation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const botResponse = await getBotResponse(input, progress);

      const newProgress = Math.max(0, Math.min(100, progress + botResponse.progressChange));
      setProgress(newProgress);
      
      const botMessage: Message = { sender: 'bot', text: botResponse.responseText };
      setMessages(prev => [...prev, botMessage]);

      if (newProgress >= 100 && botResponse.isGameWon) {
        setTimeout(() => setIsGameWon(true), 1500); // Delay for dramatic effect
      }

    } catch (error) {
      console.error("Failed to get bot response:", error);
       const errorMessage: Message = { 
        sender: 'bot', 
        text: 'SYSTEMFEHLER: Ein kritisches Versagen in der Verarbeitungseinheit wurde festgestellt. Starten Sie den Vorgang neu.' 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="bg-[#0a192f] text-gray-200 h-screen flex flex-col font-mono selection:bg-cyan-300 selection:text-black">
      {isGameWon && <KeyDisplay />}
      <header className="relative text-center p-3 border-b-2 border-cyan-300/30 shadow-lg bg-[#0a192f]/80 backdrop-blur-sm">
        <h1 className="text-2xl md:text-4xl text-cyan-300 font-display tracking-widest">
          Fundbüro für Parallelweltschlüssel
        </h1>
        <p className="text-sm text-gray-400">Abteilung: Atlantis (Stillgelegt)</p>
        <button 
          onClick={startConversation} 
          className="absolute top-1/2 -translate-y-1/2 right-4 bg-cyan-800/50 hover:bg-cyan-700/70 text-cyan-200 font-bold p-2 rounded-md transition-colors"
          aria-label="Gespräch neustarten"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5M4 4l16 16" />
          </svg>
        </button>
      </header>

      <div className="flex-1 flex flex-col max-w-4xl w-full mx-auto overflow-hidden">
        <div className="px-4">
            <ProgressBar progress={progress} />
        </div>
        <ChatWindow messages={messages} isLoading={isLoading} />
        <UserInput 
          input={input}
          setInput={setInput}
          onSend={handleSend}
          isLoading={isLoading}
        />
      </div>
    </main>
  );
}

export default App;