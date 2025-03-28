import { useState } from "react";
import { motion } from "framer-motion";
import { missions } from "../data/missions";
import PasswordCracker from "./PasswordCracker";

const Terminal = () => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [currentMission, setCurrentMission] = useState(null);
  const [targetSystem, setTargetSystem] = useState({});
  const [crackingPassword, setCrackingPassword] = useState(null);

  const handleCommand = (command) => {
    let output = "";
    const args = command.split(" ");
    const cmd = args[0];

    if (cmd === "help") {
      output = "Available commands: help, clear, ls, cat <file>, hack <mission_id>";
    } else if (cmd === "clear") {
      setHistory([]);
      return;
    } else if (cmd === "missions") {
      output = missions
        .map((m) => `🔹 ${m.id}: ${m.name} - ${m.description}`)
        .join("\n");
    } else if (cmd === "hack") {
      const missionId = parseInt(args[1]);
      const mission = missions.find((m) => m.id === missionId);

      if (mission) {
        setCurrentMission(mission);
        setTargetSystem(mission.targetSystem);
        output = `🚀 Starting mission: ${mission.name}\n🎯 Objective: ${mission.objective}`;
      } else {
        output = "❌ Mission not found!";
      }
    } else if (cmd === "ls") {
      output = Object.keys(targetSystem).length > 0 ? Object.keys(targetSystem).join("\n") : "📂 No active mission";
    } else if (cmd === "cat") {
      const fileName = args[1];

      if (targetSystem[fileName]) {
        if (fileName === "credentials.txt") {
          setCrackingPassword("Bank@1234"); // Example for Mission 1
          output = "🔓 Cracking password...";
        } else {
          output = targetSystem[fileName];
        }
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

        {crackingPassword && (
          <PasswordCracker
            password={crackingPassword}
            onSuccess={() => {
              setHistory([...history, { command: "cat credentials.txt", output: targetSystem["credentials.txt"] }]);
              setCrackingPassword(null);
            }}
          />
        )}

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

