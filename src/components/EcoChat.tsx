
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bot, Send, X, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: "1",
    text: "Hi there! I'm EcoBot, your sustainability assistant. Ask me anything about carbon emissions, sustainable practices, or how to reduce your environmental footprint!",
    sender: "bot",
    timestamp: new Date(),
  },
];

const suggestions = [
  "How can I reduce my carbon footprint?",
  "What are the most sustainable food choices?",
  "Tell me about renewable energy options for my home",
  "How does air travel impact the environment?",
  "What is the carbon footprint of HDPE material?",
];

// Update this to your actual API URL
// Local URL for development
// const API_URL = "http://localhost:8000/chat";
// Use this when deployed to production
// const API_URL = "https://your-production-api.com/chat";
// For demo purposes (fallback mode)
const USE_FALLBACK = true;
const API_URL = "http://localhost:8000/chat";

const EcoChat = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [useFallback, setUseFallback] = useState(USE_FALLBACK);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Check if the API is available
  useEffect(() => {
    const checkApiAvailability = async () => {
      try {
        const response = await fetch(API_URL.replace('/chat', ''), { 
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          // Signal for timeout
          signal: AbortSignal.timeout(5000)
        });
        
        if (response.ok) {
          console.log("EcoChat API is available");
          setUseFallback(false);
        } else {
          console.log("EcoChat API returned an error status");
          setUseFallback(true);
        }
      } catch (error) {
        console.log("EcoChat API is not available, using fallback mode");
        setUseFallback(true);
      }
    };
    
    checkApiAvailability();
  }, []);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);
    
    if (useFallback) {
      // Use fallback mode - simulate API response
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
      const responseText = handleFallbackResponse(userMessage.text);
      
      // Add bot response
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
      return;
    }
    
    try {
      // Send request to backend API
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          message: userMessage.text,
          // Send chat history (last 5 messages)
          history: messages.slice(-5).map(msg => ({
            role: msg.sender === "user" ? "user" : "assistant",
            content: msg.text
          }))
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      
      // Add bot response
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response || "Sorry, I couldn't process your request at this time.",
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
      
      toast({
        title: "EcoBot responded",
        description: "Got a new message from EcoBot!",
        variant: "default",
      });
    } catch (error) {
      console.error("Failed to get response from EcoChat backend:", error);
      
      // Add error message and switch to fallback mode
      setUseFallback(true);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I'm having trouble connecting to my knowledge base. I'll continue in a limited mode with general information only.",
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
      
      toast({
        title: "Connection Error",
        description: "Switched to fallback mode with limited responses",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const selectSuggestion = (suggestion: string) => {
    setInputValue(suggestion);
  };

  // Function to provide fallback responses when backend is not available
  const handleFallbackResponse = (input: string) => {
    // Mock response based on user input
    let responseText = "";
    const lowercaseInput = input.toLowerCase();
    
    if (lowercaseInput.includes("hdpe") || lowercaseInput.includes("plastic")) {
      responseText = "**HDPE (High-Density Polyethylene) Emissions Data:**\n\nThe carbon footprint of HDPE production is approximately 1.8-2.1 kg CO2e per kg of material. This is lower than many other plastics like PET (2.7 kg CO2e/kg) or PVC (2.9 kg CO2e/kg).\n\n**Real-world equivalents:**\n- 2 kg of CO2e is equivalent to driving a car for ~8 miles (13 km)\n- Or running a laptop for about 10 days\n\n**Bio-HDPE** made from sugarcane or other plant materials can have 70-80% lower emissions compared to fossil-based HDPE.";
    } else if (lowercaseInput.includes("carbon") || lowercaseInput.includes("footprint")) {
      responseText = "Carbon footprint is the total amount of greenhouse gases that are generated by our actions. The average person's carbon footprint is about 4 tons per year. You can reduce your carbon footprint by using public transportation, reducing meat consumption, and choosing energy-efficient appliances.";
    } else if (lowercaseInput.includes("food") || lowercaseInput.includes("diet")) {
      responseText = "Food choices have a significant impact on your carbon footprint. Plant-based diets generally have a lower carbon footprint than meat-heavy diets. Beef and lamb are particularly carbon-intensive. Consider reducing your meat consumption and opting for locally-grown, seasonal produce when possible.";
    } else if (lowercaseInput.includes("energy") || lowercaseInput.includes("electricity")) {
      responseText = "Switching to renewable energy sources like solar or wind power can significantly reduce your carbon footprint. You can also reduce your energy consumption by using energy-efficient appliances, turning off lights and electronics when not in use, and improving your home's insulation.";
    } else if (lowercaseInput.includes("travel") || lowercaseInput.includes("flight") || lowercaseInput.includes("airplane")) {
      responseText = "Air travel has a significant carbon footprint. A single round-trip flight from New York to London emits about 1.5 tons of CO2 per passenger. Consider alternatives like video conferencing or train travel when possible, and if you must fly, consider offsetting your emissions through verified carbon offset programs.";
    } else if (lowercaseInput.includes("commute") || lowercaseInput.includes("car")) {
      responseText = "The carbon footprint of your daily commute depends on your mode of transportation and distance. Driving a gasoline car produces about 0.4 kg of CO2 per mile. Consider carpooling, using public transportation, biking, or walking to reduce your commute's environmental impact.";
    } else {
      responseText = "That's an interesting question about sustainability! While I'm currently in offline mode with limited knowledge, I typically provide information on various sustainability topics, calculate emissions for specific activities, and offer personalized recommendations based on your lifestyle. My full capabilities require connection to my knowledge base.";
    }
    
    return responseText;
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-4">
            EcoChat <span className="eco-gradient-text">AI Assistant</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Chat with our AI-powered assistant to get answers to your sustainability questions and personalized guidance.
          </p>
          {useFallback && (
            <div className="mt-2 p-2 bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 rounded-md text-sm">
              Running in offline mode with limited responses. Some advanced features are unavailable.
            </div>
          )}
        </div>

        <Card className="eco-card border-border/50 overflow-hidden">
          <CardHeader className="border-b border-border/50 pb-4">
            <div className="flex items-center">
              <Avatar className="h-10 w-10 mr-4 bg-eco-emerald/20">
                <AvatarImage src="" />
                <AvatarFallback>
                  <Bot className="h-5 w-5 text-eco-emerald" />
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>EcoBot</CardTitle>
                <CardDescription>Your sustainability assistant</CardDescription>
              </div>
              <div className="flex items-center ml-auto">
                <span className={`flex h-2.5 w-2.5 rounded-full ${useFallback ? "bg-amber-500" : "bg-eco-emerald"} mr-2`}></span>
                <span className="text-sm text-muted-foreground">{useFallback ? "Limited Mode" : "Online"}</span>
              </div>
            </div>
          </CardHeader>
          
          <div className="h-[500px] overflow-y-auto p-4 bg-muted/30">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex mb-4 ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.sender === "bot" && (
                  <Avatar className="h-8 w-8 mr-2 mt-1 bg-eco-emerald/20">
                    <AvatarFallback>
                      <Bot className="h-4 w-4 text-eco-emerald" />
                    </AvatarFallback>
                  </Avatar>
                )}
                
                <div
                  className={`rounded-lg px-4 py-2 max-w-[80%] ${
                    message.sender === "user"
                      ? "bg-eco-emerald text-white rounded-tr-none"
                      : "bg-muted rounded-tl-none"
                  }`}
                >
                  <div dangerouslySetInnerHTML={{ 
                    __html: message.text
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      .replace(/\n/g, '<br />')
                  }} />
                  <div
                    className={`text-xs mt-1 ${
                      message.sender === "user" ? "text-white/70" : "text-muted-foreground"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
                
                {message.sender === "user" && (
                  <Avatar className="h-8 w-8 ml-2 mt-1">
                    <AvatarFallback className="bg-secondary">U</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start mb-4">
                <Avatar className="h-8 w-8 mr-2 mt-1 bg-eco-emerald/20">
                  <AvatarFallback>
                    <Bot className="h-4 w-4 text-eco-emerald" />
                  </AvatarFallback>
                </Avatar>
                <div className="rounded-lg px-4 py-2 bg-muted rounded-tl-none">
                  <div className="flex space-x-2">
                    <div className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce" />
                    <div className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <div className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          <CardContent className="p-4 border-t border-border/50 bg-card">
            {messages.length <= 2 && (
              <div className="mb-4">
                <p className="text-sm font-medium mb-2 text-muted-foreground">Suggested questions:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      onClick={() => selectSuggestion(suggestion)}
                    >
                      <Sparkles className="h-3 w-3 mr-1 text-eco-emerald" />
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex">
              <Input
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="mr-2"
                disabled={isLoading}
              />
              {inputValue ? (
                <Button
                  onClick={() => setInputValue("")}
                  variant="outline"
                  size="icon"
                  className="mr-2"
                  disabled={isLoading}
                >
                  <X className="h-4 w-4" />
                </Button>
              ) : null}
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="bg-eco-emerald hover:bg-eco-forest text-white"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EcoChat;
