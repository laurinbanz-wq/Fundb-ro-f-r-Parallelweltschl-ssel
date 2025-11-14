
import React from 'react';

const KeyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-48 h-48 text-yellow-300 drop-shadow-[0_0_10px_rgba(253,249,150,0.7)]">
      <path fill="currentColor" d="M78.2,12.2c-10.4-10.4-27.4-10.4-37.8,0L12.2,40.4c-2.4,2.4-2.4,6.2,0,8.5l4.3,4.3c2.4,2.4,6.2,2.4,8.5,0l4.3-4.3V56 h-7.1c-3.4,0-6.2,2.8-6.2,6.2v7.1c0,3.4,2.8,6.2,6.2,6.2h7.1v7.1c0,3.4,2.8,6.2,6.2,6.2h7.1c3.4,0,6.2-2.8,6.2-6.2v-7.1h7.1 c3.4,0,6.2-2.8,6.2-6.2v-7.1c0-3.4-2.8-6.2-6.2-6.2h-7.1V50.5l14.9-14.9C88.6,25.2,88.6,14.8,78.2,12.2z M65,25.4 c-4.2,4.2-11,4.2-15.2,0s-4.2-11,0-15.2c4.2-4.2,11-4.2,15.2,0S69.2,21.2,65,25.4z"/>
      <text x="36" y="82" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="18" fill="black">8</text>
    </svg>
);


const KeyDisplay: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-black/80 flex flex-col items-center justify-center z-50 animate-fade-in">
      <div className="bg-[#0a192f] border-2 border-cyan-400 p-8 rounded-lg shadow-2xl shadow-cyan-500/20 text-center">
        <h2 className="text-3xl font-display text-cyan-300 mb-4">ANTRAG GENEHMIGT</h2>
        <p className="text-gray-300 mb-6 max-w-md">
          Nach eingehender Prüfung der vorgelegten Unterlagen und unter Berücksichtigung aller relevanten Paragraphen, wird das Fundstück Nr. 8 zur Freigabe erteilt.
        </p>
        <div className="my-6 animate-pulse">
            <KeyIcon />
        </div>
        <p className="text-xs text-gray-500">Die Verwahrungsobliegenheit endet hiermit. Akte geschlossen.</p>
      </div>
    </div>
  );
};

export default KeyDisplay;