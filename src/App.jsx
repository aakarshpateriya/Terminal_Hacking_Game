import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Terminal from "./components/Terminal";

// Create socket outside component to prevent multiple connections
let socket;

function App() {
  const [players, setPlayers] = useState([]);
  const [connected, setConnected] = useState(false);
  const [socketInstance, setSocketInstance] = useState(null);

  useEffect(() => {
    // Initialize socket connection
    if (!socket) {
      socket = io("https://terminal-hacking-game.onrender.com", {
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        transports: ['websocket', 'polling'] // Try WebSocket first, then polling
      });
    }

    // Set connected status
    socket.on("connect", () => {
      console.log("Connected to server with ID:", socket.id);
      setConnected(true);
      setSocketInstance(socket);
    });

    socket.on("connect_error", (err) => {
      console.error("Connection error:", err);
      setConnected(false);
    });

    socket.on("disconnect", (reason) => {
      console.log("Disconnected:", reason);
      setConnected(false);
    });

    // Listen for player updates
    socket.on("updatePlayers", (updatedPlayers) => {
      console.log("Players updated:", updatedPlayers);
      setPlayers(updatedPlayers);
    });

    return () => {
      // Don't disconnect on component unmount, just remove listeners
      socket.off("connect");
      socket.off("connect_error");
      socket.off("disconnect");
      socket.off("updatePlayers");
    };
  }, []);

  return (
    <div className="bg-black min-h-screen text-green-500">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Hacking Simulator</h1>
          <div className="flex items-center">
            <div className={`w-3 h-3 rounded-full mr-2 ${connected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span>{connected ? `Connected (${socket?.id})` : 'Disconnected'}</span>
          </div>
        </div>
        
        <div className="bg-gray-900 p-3 mb-4 rounded">
          <p className="mb-2">Online Hackers: {players.length}</p>
          <ul className="flex flex-wrap gap-2">
            {players.map((player) => (
              <li key={player.id} className="bg-gray-800 px-2 py-1 rounded">
                {player.username}
              </li>
            ))}
          </ul>
        </div>
        
        {socketInstance && <Terminal socket={socketInstance} />}
        {!socketInstance && <div className="text-red-500 p-5">Waiting for connection...</div>}
      </div>
    </div>
  );
}

export default App;
