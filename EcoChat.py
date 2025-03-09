import React, { useState, useRef, useEffect } from 'react';
import { RecycleIcon, SendIcon, ClockIcon, AlertCircleIcon } from 'lucide-react';

const Sustainability = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Mock function to simulate API call to LLM and vector store
  const fetchResponse = async (userPrompt, history) => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Check if the query is about emissions
    const isEmissionsQuery = ['emissions', 'carbon footprint', 'ghg', 'co2'].some(
      keyword => userPrompt.toLowerCase().includes(keyword)
    );
    
    let response;
    
    if (isEmissionsQuery) {
      // Mock data for emissions-related queries
      const mockData = {
        "HDPE": "1.92 kg CO2 equivalent per kg of material",
        "Bio-HDPE": "0.78 kg CO2 equivalent per kg of material",
        "PET": "2.73 kg CO2 equivalent per kg of material",
        "PP": "1.86 kg CO2 equivalent per kg of material"
      };
      
      // Check if we have data for the material mentioned
      const materialMatches = Object.keys(mockData).filter(
        material => userPrompt.toUpperCase().includes(material)
      );
      
      if (materialMatches.length > 0) {
        const material = materialMatches[0];
        response = `📊 **Data found in provided documents:**\n\n${material}: ${mockData[material]}\n\n**Real-world equivalents:**\n- This is equal to driving a car for ~40 miles (64 km)\n- A 100-watt light bulb running for ~4.5 days\n- Carbon sequestration of ~12 sq. meters of forest per year`;
      } else {
        response = "⚠️ **This specific information is not available in the provided data.**\n\n🌍 **But according to my sustainability knowledge:**\n\nTypical plastic materials have carbon footprints ranging from 1.5 to 3.5 kg CO2 equivalent per kg of material. For more specific data, please mention the exact material you're interested in.";
      }
    } else {
      // Generic response for non-emissions queries
      response = "As a sustainability expert, I recommend considering the full lifecycle impact of materials. This includes raw material extraction, manufacturing processes, transportation, use phase, and end-of-life disposal. Would you like more specific information about a particular aspect of sustainability?";
    }
    
    setIsLoading(false);
    return response;
  };

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Add user message
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    
    // Get last 5 messages for history
    const history = [...messages.slice(-4), userMessage]
      .map(msg => msg.content)
      .join('\n');
    
    // Clear input field
    setInput('');
    
    // Get response
    const response = await fetchResponse(input, history);
    
    // Add assistant message
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-green-600 p-4 text-white">
        <div className="flex items-center justify-center space-x-2">
          <RecycleIcon className="h-8 w-8" />
          <h1 className="text-2xl font-bold">Sustainability ChatBot - Powered by AI & Document Data</h1>
        </div>
      </header>
      
      {/* Chat container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <RecycleIcon className="h-16 w-16 mb-4 text-green-500" />
            <p className="text-xl">Ask a sustainability-related question...</p>
          </div>
        )}
        
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-3xl rounded-lg p-4 ${
                message.role === 'user' 
                  ? 'bg-green-500 text-white rounded-br-none' 
                  : 'bg-white shadow rounded-bl-none'
              }`}
            >
              <div 
                className="text-base whitespace-pre-line"
                dangerouslySetInnerHTML={{ 
                  __html: message.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
                }}
              />
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white shadow rounded-lg rounded-bl-none p-4 max-w-3xl">
              <div className="flex items-center text-gray-500">
                <ClockIcon className="h-5 w-5 mr-2 animate-pulse" />
                <span>Generating response...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input area */}
      <div className="border-t border-gray-200 p-4 bg-white">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a sustainability-related question..."
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-green-600 text-white p-3 rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <SendIcon className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Sustainability;