import { useState } from "react";

const PasswordGuess = ({ possiblePasswords, correctPassword, onSuccess, onFail }) => {
  const [selectedPassword, setSelectedPassword] = useState("");
  const [attempts, setAttempts] = useState(3);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedPassword === correctPassword) {
      onSuccess();
    } else {
      setAttempts(attempts - 1);
      if (attempts - 1 === 0) {
        onFail();
      }
    }
  };

  return (
    <div className="w-80 p-3 bg-gray-900 border border-yellow-500 rounded-lg text-yellow-400">
      <p>🔐 Password Required!</p>
      <p className="text-sm">Select the correct password to proceed:</p>
      <form onSubmit={handleSubmit} className="mt-2 flex flex-col">
        <select
          value={selectedPassword}
          onChange={(e) => setSelectedPassword(e.target.value)}
          className="bg-black text-yellow-400 border p-1"
        >
          <option value="">-- Select Password --</option>
          {possiblePasswords.map((pwd, index) => (
            <option key={index} value={pwd}>{pwd}</option>
          ))}
        </select>
        <button type="submit" className="bg-yellow-500 px-2 mt-2">Attempt</button>
      </form>
      <p className="text-sm mt-2">Attempts left: {attempts}</p>
    </div>
  );
};

export default PasswordGuess;
