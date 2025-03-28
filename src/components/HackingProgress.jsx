import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const HackingProgress = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5; // Random speed
      });
    }, 500);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="w-80 p-3 bg-gray-900 border border-green-500 rounded-lg text-green-400"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <p>💻 Hacking in progress...</p>
      <div className="w-full bg-gray-700 rounded h-5 mt-2 overflow-hidden">
        <motion.div
          className="bg-green-500 h-full"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: "easeInOut", duration: 0.5 }}
        />
      </div>
      <p className="mt-2 text-sm">Progress: {progress}%</p>
    </motion.div>
  );
};

export default HackingProgress;
