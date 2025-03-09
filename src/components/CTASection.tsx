
import { Button } from "@/components/ui/button";
import { BarChart, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <div className="py-20 bg-gradient-to-br from-eco-emerald/10 to-eco-sky/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your <span className="eco-gradient-text">Sustainability Journey</span>?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Choose how you want to begin your path to a greener future. Calculate your emissions or chat with our AI assistant.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Calculator Card */}
            <div className="eco-card bg-white p-8 text-center flex flex-col h-full">
              <div className="rounded-full w-16 h-16 mx-auto flex items-center justify-center bg-eco-emerald/10 mb-4">
                <BarChart className="h-8 w-8 text-eco-emerald" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Emission Calculator</h3>
              <p className="text-muted-foreground mb-6 flex-grow">
                Calculate your carbon footprint with our user-friendly interface and get personalized insights on how to reduce it.
              </p>
              <Button asChild className="w-full bg-eco-emerald hover:bg-eco-forest text-white font-medium mt-auto">
                <Link to="/calculator">
                  Try Calculator
                </Link>
              </Button>
            </div>

            {/* EcoChat Card */}
            <div className="eco-card bg-white p-8 text-center flex flex-col h-full">
              <div className="rounded-full w-16 h-16 mx-auto flex items-center justify-center bg-eco-sky/10 mb-4">
                <MessageSquare className="h-8 w-8 text-eco-sky" />
              </div>
              <h3 className="text-xl font-semibold mb-2">EcoChat Bot</h3>
              <p className="text-muted-foreground mb-6 flex-grow">
                Chat with our AI-powered assistant to get real-time answers to your sustainability questions and guidance.
              </p>
              <Button asChild className="w-full bg-eco-sky hover:bg-eco-sky/80 text-white font-medium mt-auto">
                <a href="https://ecochat.streamlit.app/" target="_blank" rel="noopener noreferrer" className="text-foreground/80 hover:text-foreground transition-colors">
                  Chat with EcoBot
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
