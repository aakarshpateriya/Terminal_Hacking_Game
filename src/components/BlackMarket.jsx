import { useState } from "react";

const BlackMarket = ({ balance, onPurchase }) => {
  const items = [
    { id: 1, name: "Brute Force Software", price: 500 },
    { id: 2, name: "Firewall Bypass Tool", price: 700 },
    { id: 3, name: "DDoS Booster", price: 1200 },
    { id: 4, name: "Zero-Day Exploit", price: 2500 },
  ];

  const [message, setMessage] = useState("");

  const handleBuy = (item) => {
    if (balance >= item.price) {
      onPurchase(item);
      setMessage(`✅ Purchased ${item.name} for $${item.price}`);
    } else {
      setMessage("❌ Not enough money!");
    }
  };

  return (
    <div className="w-96 p-4 bg-gray-900 border border-yellow-500 rounded-lg text-yellow-400">
      <h2 className="text-lg font-bold">🏴 Black Market</h2>
      <p>Your Balance: 💰 ${balance}</p>
      <ul>
        {items.map((item) => (
          <li key={item.id} className="flex justify-between mt-2">
            <span>{item.name} - ${item.price}</span>
            <button
              className="bg-yellow-600 px-2 py-1 rounded text-black hover:bg-yellow-500"
              onClick={() => handleBuy(item)}
            >
              Buy
            </button>
          </li>
        ))}
      </ul>
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
};

export default BlackMarket;
