
import React from 'react';

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  const clampedProgress = Math.max(0, Math.min(100, progress));

  return (
    <div className="w-full bg-gray-700 rounded-full h-4 my-4 border-2 border-cyan-300/50 shadow-inner shadow-black">
      <div
        className="bg-cyan-400 h-full rounded-full transition-all duration-1000 ease-out"
        style={{ width: `${clampedProgress}%` }}
      ></div>
      <span className="absolute w-full text-center -mt-4 text-xs font-bold text-white font-display tracking-widest">
        ÜBERZEUGUNGSFORTSCHRITT
      </span>
    </div>
  );
};

export default ProgressBar;
   