import { useState } from "react";

const FirewallBypass = ({ onSuccess, onFail }) => {
  const correctCode = "3175"; // Randomly generated passcode
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input === correctCode) {
      onSuccess();
    } else {
      onFail();
    }
  };

  return (
    <div className="w-80 p-3 bg-gray-900 border border-red-500 rounded-lg text-red-400">
      <p>🛡️ Firewall Detected!</p>
      <p className="text-sm">Enter passcode to bypass:</p>
      <form onSubmit={handleSubmit} className="mt-2 flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-black text-red-400 border p-1 w-full"
        />
        <button type="submit" className="bg-red-500 px-2 ml-2">Bypass</button>
      </form>
    </div>
  );
};

export default FirewallBypass;
