import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const PasswordCracker = ({ password, onSuccess }) => {
  const [attempt, setAttempt] = useState("");
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const [hint, setHint] = useState("");

  useEffect(() => {
    setHint(`Hint: Starts with "${password[0]}" and ends with "${password.slice(-1)}"`);
  }, [password]);

  const handleCrack = () => {
    if (attempt.toLowerCase() === password.toLowerCase()) {
      onSuccess();
    } else {
      setAttemptsLeft(attemptsLeft - 1);
      if (attemptsLeft - 1 <= 0) {
        alert("❌ Hacking failed! System locked!");
      }
    }
  };

  return (
    <motion.div
      className="bg-black text-green-400 p-5 border border-green-500 w-80 rounded-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="text-lg font-bold">🔓 Password Cracker</h2>
      <p>{hint}</p>
      <input
        type="text"
        placeholder="Enter password..."
        value={attempt}
        onChange={(e) => setAttempt(e.target.value)}
        className="mt-2 p-2 w-full bg-gray-900 text-green-400 border border-green-500"
      />
      <button
        onClick={handleCrack}
        className="mt-3 p-2 bg-green-700 hover:bg-green-500 text-white w-full rounded"
      >
        Crack Password
      </button>
      <p className="mt-2">Attempts Left: {attemptsLeft}</p>
    </motion.div>
  );
};

export default PasswordCracker;
