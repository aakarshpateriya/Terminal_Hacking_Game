import { useState, useEffect } from "react";
import MultiplayerChat from "./MultiplayerChat";

const Terminal = ({ socket }) => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [chatOpen, setChatOpen] = useState(false);
  const [socketStatus, setSocketStatus] = useState("unknown");

  useEffect(() => {
    if (socket) {
      setSocketStatus(socket.connected ? "connected" : "disconnected");
      
      const handleConnect = () => setSocketStatus("connected");
      const handleDisconnect = () => setSocketStatus("disconnected");
      
      socket.on("connect", handleConnect);
      socket.on("disconnect", handleDisconnect);
      
      return () => {
        socket.off("connect", handleConnect);
        socket.off("disconnect", handleDisconnect);
      };
    }
  }, [socket]);

  const handleCommand = (command) => {
    let output = "";

    if (command === "multiplayer") {
      setChatOpen(true);
      output = `🌍 Connecting to multiplayer chat... Socket status: ${socketStatus}`;
    } else if (command === "status") {
      output = `Socket status: ${socketStatus}, ID: ${socket?.id || 'none'}`;
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
    <div className="w-full h-screen bg-black text-green-500 font-mono p-5">
      <p>🔓 Welcome to HACKNET Terminal. Type "multiplayer" to chat with hackers or "status" to check connection.</p>

      {history.map((entry, index) => (
        <div key={index} className="mt-1">
          <p className="text-green-300">{'>'} {entry.command}</p>
          <p>{entry.output}</p>
        </div>
      ))}

      {chatOpen && <MultiplayerChat socket={socket} onClose={() => setChatOpen(false)} />}

      <form onSubmit={handleSubmit} className="flex mt-2">
        <span className="mr-2">{'>'}</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-black text-green-500 outline-none w-full"
          autoFocus
        />
      </form>
    </div>
  );
};

export default Terminal;
