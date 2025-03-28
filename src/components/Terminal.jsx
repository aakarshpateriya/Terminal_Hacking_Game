import { useState } from "react";
import { motion } from "framer-motion";

const Terminal = () => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);

  const handleCommand = (command) => {
    let output = "";

    if (command === "help") {
      output = "Available commands: help, clear, hack, exit";
    } else if (command === "clear") {
      setHistory([]);
      return;
    } else if (command === "hack") {
      output = "⚠️ Hacking in progress... [ACCESS DENIED]";
    } else if (command === "exit") {
      output = "Exiting system... Goodbye!";
    } else {
      output = `Unknown command: ${command}`;
    }

    setHistory([...history, { command, output }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    handleCommand(input.trim());
    setInput("");
  };

  return (
    <motion.div
      className="w-full h-screen bg-black text-green-500 font-mono p-5"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="overflow-auto h-full">
        <p>🔓 Welcome to HACKNET Terminal. Type "help" for commands.</p>

        {history.map((entry, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: index * 0.1 }}
          >
            <p className="text-green-300">> {entry.command}</p>
            <p>{entry.output}</p>
          </motion.div>
        ))}

        {/* Input Field */}
        <form onSubmit={handleSubmit} className="flex mt-2">
          <span className="mr-2">> </span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="bg-black text-green-500 outline-none w-full"
            autoFocus
          />
        </form>
      </div>
    </motion.div>
  );
};

export default Terminal;
