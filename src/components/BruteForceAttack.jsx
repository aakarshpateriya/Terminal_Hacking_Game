import { useState, useEffect } from "react";

const BruteForceAttack = ({ onSuccess, onFail }) => {
  const [progress, setProgress] = useState(0);
  const [isCracking, setIsCracking] = useState(true);

  useEffect(() => {
    if (isCracking) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsCracking(false);
            Math.random() > 0.5 ? onSuccess() : onFail(); // 50% success rate
            return 100;
          }
          return prev + Math.floor(Math.random() * 10) + 5; // Random progress
        });
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isCracking, onSuccess, onFail]);

  return (
    <div className="w-80 p-3 bg-gray-900 border border-red-500 rounded-lg text-red-400">
      <p>💀 Brute Force Attack in Progress...</p>
      <div className="w-full bg-black border mt-2">
        <div
          className="h-3 bg-red-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-sm mt-2">Progress: {progress}%</p>
    </div>
  );
};

export default BruteForceAttack;
