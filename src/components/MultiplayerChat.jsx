import { useState, useEffect, useRef } from "react";

const MultiplayerChat = ({ socket, onClose }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!socket) {
      setError("Socket not connected");
      return;
    }

    console.log("Setting up chat listeners with socket ID:", socket.id);
    
    // Add a local message to confirm setup
    setMessages(prev => [...prev, {
      username: "System",
      text: `Chat initialized with socket ID: ${socket.id}`,
      timestamp: new Date().toISOString()
    }]);

    // Listen for incoming chat messages
    const handleChatMessage = (data) => {
      console.log("Received chat message:", data);
      setMessages((prevMessages) => [...prevMessages, data]);
    };

    socket.on("chatMessage", handleChatMessage);

    // Cleanup listener when component unmounts
    return () => {
      console.log("Cleaning up chat listeners");
      socket.off("chatMessage", handleChatMessage);
    };
  }, [socket]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() === "") return;

    if (!socket || !socket.connected) {
      setError("Cannot send message: Socket not connected");
      return;
    }

    const messageData = {
      username: socket.id.substring(0, 6),
      text: message,
      timestamp: new Date().toISOString()
    };

    console.log("Sending message:", messageData);

    // Send message to server
    socket.emit("chatMessage", messageData);

    // Add message to local state immediately for better UX
    setMessages(prev => [...prev, messageData]);
    setMessage("");
  };

  return (
    <div className="bg-gray-900 border border-green-500 p-3 my-3 h-64 flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-green-400">🌐 Multiplayer Chat {socket?.connected ? '(Connected)' : '(Disconnected)'}</h3>
        <button 
          onClick={onClose}
          className="text-green-400 hover:text-green-200"
        >
          ✕
        </button>
      </div>
      
      {error && <div className="bg-red-900 text-red-200 p-2 mb-2 rounded">{error}</div>}
      
      <div className="flex-1 overflow-y-auto mb-2">
        {messages.map((msg, index) => (
          <div key={index} className="mb-1">
            <span className="text-green-300">{msg.username}: </span>
            <span>{msg.text}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSendMessage} className="flex">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="bg-black text-green-500 border border-green-700 px-2 py-1 flex-1 mr-2"
          placeholder="Type a message..."
          disabled={!socket?.connected}
        />
        <button 
          type="submit"
          className={`px-3 py-1 ${socket?.connected ? 'bg-green-800 text-green-100 hover:bg-green-700' : 'bg-gray-800 text-gray-500 cursor-not-allowed'}`}
          disabled={!socket?.connected}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default MultiplayerChat;
