import { useState, useEffect } from "react";
import axios from "axios";

const Sustainability = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post("/api/chat", {
        input,
        history: messages.slice(-5).map(msg => msg.content).join("\n"),
      });

      const botMessage = { role: "assistant", content: response.data.answer || "No response generated." };
      setMessages([...messages, userMessage, botMessage]);
    } catch (error) {
      console.error("Error fetching response:", error);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-gray-100 shadow-lg rounded-lg">
      <h1 className="text-xl font-bold text-center mb-4">♻️ Sustainability ChatBot</h1>
      <div className="h-96 overflow-y-auto p-2 border bg-white rounded-lg">
        {messages.map((msg, index) => (
          <div key={index} className={`p-2 my-2 rounded-lg ${msg.role === "user" ? "bg-blue-100 text-right" : "bg-green-100 text-left"}`}>
            {msg.content}
          </div>
        ))}
        {loading && <div className="text-gray-500">Thinking...</div>}
      </div>
      <div className="mt-4 flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a sustainability question..."
          className="flex-grow p-2 border rounded-l-lg"
        />
        <button onClick={handleSendMessage} className="bg-blue-500 text-white px-4 rounded-r-lg disabled:opacity-50" disabled={loading}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Sustainability;