
import React from 'react';

interface UserInputProps {
  input: string;
  setInput: (value: string) => void;
  onSend: () => void;
  isLoading: boolean;
}

const UserInput: React.FC<UserInputProps> = ({ input, setInput, onSend, isLoading }) => {
  const handleSendClick = () => {
    if (!isLoading) {
      onSend();
    }
  };

  return (
    <div className="p-4 bg-[#0a192f]/80 backdrop-blur-sm border-t-2 border-cyan-300/30">
      <div className="flex items-start space-x-3">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Antrag hier formulieren..."
          disabled={isLoading}
          className="flex-1 bg-gray-800 border-2 border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 text-white disabled:opacity-50 transition-all resize-none"
          rows={2}
        />
        <button
          type="button"
          onClick={handleSendClick}
          disabled={isLoading}
          className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold p-2 rounded-md disabled:bg-cyan-800 disabled:cursor-not-allowed transition-colors flex items-center justify-center self-stretch"
          aria-label="Senden"
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default UserInput;