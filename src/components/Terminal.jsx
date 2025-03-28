import { useState } from "react";
import { motion } from "framer-motion";

const fakeFileSystem = {
  root: {
    "secret.txt": "Confidential Data: TOP SECRET 🚨",
    "logs.txt": "Server logs - No anomalies detected...",
    system: {
      "passwords.txt": "root: P@ssw0rd123",
      "config.cfg": "System Configuration File",
    },
  },
};

const Terminal = () => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [currentPath, setCurrentPath] = useState(["root"]); // Tracks current folder

  const getCurrentFolder = () => {
    return currentPath.reduce((acc, folder) => acc[folder], fakeFileSystem);
  };

  const handleCommand = (command) => {
    let output = "";
    const args = command.split(" ");
    const cmd = args[0];

    if (cmd === "help") {
      output = "Available commands: help, clear, ls, cd <folder>, cat <file>";
    } else if (cmd === "clear") {
      setHistory([]);
      return;
    } else if (cmd === "ls") {
      const folder = getCurrentFolder();
      output = Object.keys(folder).join("\n");
    } else if (cmd === "cd") {
      const folderName = args[1];
      if (folderName && getCurrentFolder()[folderName]) {
        setCurrentPath([...currentPath, folderName]);
        output = `📂 Moved to /${currentPath.join("/")}/${folderName}`;
      } else {
        output = "❌ Folder not found!";
      }
    } else if (cmd === "cat") {
      const fileName = args[1];
      const folder = getCurrentFolder();
      if (folder[fileName]) {
        output = folder[fileName];
      } else {
        output = "❌ File not found!";
      }
    } else {
      output = `Unknown command: ${cmd}`;
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
