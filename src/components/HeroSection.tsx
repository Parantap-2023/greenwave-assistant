
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight, Leaf, BarChart, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-muted/50 to-background py-20 sm:py-32">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[40%] top-[30%] h-[30rem] w-[30rem] rounded-full bg-eco-emerald/5 blur-3xl"></div>
        <div className="absolute left-[10%] top-[20%] h-[20rem] w-[20rem] rounded-full bg-eco-teal/5 blur-3xl"></div>
        <div className="absolute left-[80%] top-[60%] h-[25rem] w-[25rem] rounded-full bg-eco-sky/5 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Text content */}
          <div className="lg:w-1/2 lg:pr-12 mb-12 lg:mb-0 text-center lg:text-left">
            <div className="inline-flex items-center rounded-full border border-eco-emerald/20 bg-eco-emerald/10 px-4 py-1 text-sm font-medium text-eco-emerald mb-6">
              <Leaf className="mr-1 h-3.5 w-3.5" />
              <span>Sustainability Simplified</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              <span className="eco-gradient-text">Empowering</span> Sustainability with Smart Solutions
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0">
              Calculate your carbon footprint and get AI-powered assistance to reduce your environmental impact, making sustainability accessible for everyone.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button asChild size="lg" className="bg-eco-emerald hover:bg-eco-forest text-white font-medium">
                <Link to="/calculator">
                  Try Calculator
                  <BarChart className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-eco-sky text-eco-sky hover:text-eco-sky font-medium">
                <Link to="/ecochat">
                  Chat with EcoBot
                  <MessageSquare className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="mt-8 flex items-center justify-center lg:justify-start text-sm text-muted-foreground">
              <span>Trusted by 500+ eco-conscious organizations</span>
              <ChevronRight className="h-4 w-4 ml-1" />
            </div>
          </div>
          
          {/* Image/Illustration */}
          <div className="lg:w-1/2 relative">
            <div className="relative rounded-lg overflow-hidden shadow-xl animate-float">
              <svg
                viewBox="0 0 500 500"
                className="w-full h-full"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="250" cy="250" r="200" fill="#E6F7EC" />
                <path
                  d="M360 150C360 150 300 90 220 90C140 90 80 150 80 150C80 150 140 210 220 210C300 210 360 150 360 150Z"
                  fill="#10B981"
                  fillOpacity="0.7"
                />
                <path
                  d="M360 250C360 250 300 190 220 190C140 190 80 250 80 250C80 250 140 310 220 310C300 310 360 250 360 250Z"
                  fill="#0EA5E9"
                  fillOpacity="0.7"
                />
                <path
                  d="M360 350C360 350 300 290 220 290C140 290 80 350 80 350C80 350 140 410 220 410C300 410 360 350 360 350Z"
                  fill="#22C55E"
                  fillOpacity="0.7"
                />
                <circle cx="250" cy="150" r="20" fill="#047857" />
                <circle cx="250" cy="250" r="20" fill="#0369A1" />
                <circle cx="250" cy="350" r="20" fill="#15803D" />
              </svg>
            </div>
            
            {/* Floating card elements */}
            <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-3 animate-float" style={{ animationDelay: '1s' }}>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-eco-emerald/20 flex items-center justify-center">
                  <Leaf className="h-4 w-4 text-eco-emerald" />
                </div>
                <div>
                  <p className="text-xs font-medium">Carbon Reduced</p>
                  <p className="text-sm font-bold text-eco-emerald">-27%</p>
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-4 -left-4 bg-white rounded-lg shadow-lg p-3 animate-float" style={{ animationDelay: '1.5s' }}>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-eco-sky/20 flex items-center justify-center">
                  <MessageSquare className="h-4 w-4 text-eco-sky" />
                </div>
                <div>
                  <p className="text-xs font-medium">AI Insights</p>
                  <p className="text-sm font-bold text-eco-sky">24/7</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
