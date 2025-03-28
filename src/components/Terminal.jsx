import { useState } from "react";
import { motion } from "framer-motion";
import { missions } from "../data/missions";
import HackingProgress from "./HackingProgress";
import FirewallBypass from "./FirewallBypass";
import PasswordGuess from "./PasswordGuess";

const Terminal = () => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [currentMission, setCurrentMission] = useState(null);
  const [targetSystem, setTargetSystem] = useState({});
  const [hacking, setHacking] = useState(false);
  const [firewall, setFirewall] = useState(false);
  const [passwordRequired, setPasswordRequired] = useState(false);

  const handleCommand = (command) => {
    let output = "";
    const args = command.split(" ");
    const cmd = args[0];

    if (cmd === "help") {
      output = "Available commands: help, clear, missions, hack <mission_id>, ls, cat <file>";
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
        if (mission.hasFirewall) {
          setFirewall(true);
          output = "🛡️ Firewall detected! Solve the bypass challenge.";
        } else if (mission.requiresPassword) {
          setPasswordRequired(true);
          output = "🔐 Password Required!";
        } else {
          setHacking(true);
          setTimeout(() => {
            setCurrentMission(mission);
            setTargetSystem(mission.targetSystem);
            setHistory([...history, { command, output: `🚀 Hacking ${mission.name}...` }]);
            setHacking(false);
          }, 3000);
        }
      } else {
        output = "❌ Mission not found!";
      }
    } else if (cmd === "ls") {
      output = Object.keys(targetSystem).length > 0 ? Object.keys(targetSystem).join("\n") : "📂 No active mission";
    } else if (cmd === "cat") {
      const fileName = args[1];
      output = targetSystem[fileName] || "❌ File not found!";
    } else {
      output = `Unknown command: ${cmd}`;
    }

    if (!firewall && !hacking && !passwordRequired) {
      setHistory([...history, { command, output }]);
    }
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
          <motion.div key={index} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2 }}>
            <p className="text-green-300">> {entry.command}</p>
            <p>{entry.output}</p>
          </motion.div>
        ))}

        {firewall && (
          <FirewallBypass
            onSuccess={() => {
              setFirewall(false);
              setHistory([...history, { command: "hack", output: "🚀 Firewall bypassed!" }]);
            }}
            onFail={() => {
              setFirewall(false);
              setHistory([...history, { command: "hack", output: "❌ Firewall breach failed!" }]);
            }}
          />
        )}

        {passwordRequired && (
          <PasswordGuess
            possiblePasswords={missions[1].possiblePasswords}
            correctPassword={missions[1].correctPassword}
            onSuccess={() => {
              setPasswordRequired(false);
              setHacking(true);
            }}
            onFail={() => {
              setPasswordRequired(false);
              setHistory([...history, { command: "hack 2", output: "❌ Incorrect password!" }]);
            }}
          />
        )}

        <form onSubmit={handleSubmit} className="flex mt-2">
          <span className="mr-2">> </span>
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} className="bg-black text-green-500 outline-none w-full" autoFocus disabled={hacking || firewall || passwordRequired} />
        </form>
      </div>
    </motion.div>
  );
};

export default Terminal;
