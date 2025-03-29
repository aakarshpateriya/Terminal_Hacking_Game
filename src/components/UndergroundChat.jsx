import { useState } from "react";

const UndergroundChat = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { sender: "ShadowFox", text: "Welcome to the Underground. Type 'info' for help." },
  ]);
  const [input, setInput] = useState("");

  const responses = {
    info: "Commands: 'mission' (new mission), 'tip' (hacking tip), 'deal' (black market offer).",
    mission: "🕵️ New Mission Unlocked: Hack into a financial server for $3000. Type 'hack 99' to start.",
    tip: "💡 Tip: Never use the same exploit twice, security systems adapt.",
    deal: "💰 Exclusive Deal: 'Quantum Cryptobreaker' available in Black Market for $5000.",
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const lowerInput = input.toLowerCase();
    const botResponse = responses[lowerInput] || "🤷‍♂️ Unknown command. Try 'info'.";
    
    setMessages([...messages, { sender: "You", text: input }, { sender: "ShadowFox", text: botResponse }]);
    setInput("");
  };

  return (
    <div className="fixed top-20 right-10 w-80 bg-gray-900 border border-red-500 p-4 rounded-lg text-red-400 shadow-lg">
      <h2 className="text-lg font-bold">🕵️ Underground Chat</h2>
      <div className="h-48 overflow-y-auto border border-gray-600 p-2 bg-black">
        {messages.map((msg, index) => (
          <p key={index} className={msg.sender === "You" ? "text-green-400" : "text-red-400"}>
            <strong>{msg.sender}:</strong> {msg.text}
          </p>
        ))}
      </div>
      <div className="flex mt-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full bg-gray-800 text-white p-1 rounded"
          placeholder="Type a command..."
        />
        <button onClick={handleSendMessage} className="ml-2 bg-red-600 px-2 rounded text-black hover:bg-red-500">
          Send
        </button>
      </div>
      <button onClick={onClose} className="mt-2 bg-gray-700 px-2 py-1 rounded text-white w-full">
        Close Chat
      </button>
    </div>
  );
};

export default UndergroundChat;
