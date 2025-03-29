import { useState, useEffect } from "react";

const DDoSAttack = ({ onSuccess, onFail }) => {
  const [progress, setProgress] = useState(0);
  const [isAttacking, setIsAttacking] = useState(true);
  const [detected, setDetected] = useState(false);

  useEffect(() => {
    if (isAttacking) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsAttacking(false);
            if (Math.random() > 0.7) {
              setDetected(true);
              onFail(); // 30% chance of being detected
            } else {
              onSuccess();
            }
            return 100;
          }
          return prev + Math.floor(Math.random() * 15) + 5; // Random progress
        });
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isAttacking, onSuccess, onFail]);

  return (
    <div className="w-80 p-3 bg-gray-900 border border-blue-500 rounded-lg text-blue-400">
      <p>🌐 Launching DDoS Attack...</p>
      <div className="w-full bg-black border mt-2">
        <div
          className={`h-3 ${detected ? "bg-red-500" : "bg-blue-500"}`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-sm mt-2">Progress: {progress}%</p>
      {detected && <p className="text-red-500">⚠️ Attack detected! Trace initiated...</p>}
    </div>
  );
};

export default DDoSAttack;
