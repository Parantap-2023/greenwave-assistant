
import { BarChart, Bot, GanttChart, Leaf, LineChart, MessageSquare, Recycle, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const FeatureSection = () => {
  const features = [
    {
      icon: <BarChart className="h-10 w-10 text-eco-emerald" />,
      title: "Emission Calculator",
      description: "Calculate your carbon footprint with our user-friendly interface and get personalized insights.",
    },
    {
      icon: <Bot className="h-10 w-10 text-eco-teal" />,
      title: "EcoChat Bot",
      description: "Get instant answers to your sustainability questions with our AI-powered chatbot.",
    },
    {
      icon: <GanttChart className="h-10 w-10 text-eco-sky" />,
      title: "Data Visualization",
      description: "View your emissions data through intuitive charts and graphs for better understanding.",
    },
    {
      icon: <Recycle className="h-10 w-10 text-eco-sage" />,
      title: "Reduction Strategies",
      description: "Receive tailored recommendations to reduce your environmental impact effectively.",
    }
  ];

  return (
    <div className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            Smart Features for a <span className="eco-gradient-text">Greener Future</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Our platform combines cutting-edge technology with environmental expertise
            to help you make more sustainable choices.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="eco-card border-border/50 h-full">
              <CardHeader className="pb-2">
                <div className="mb-2 rounded-full w-16 h-16 flex items-center justify-center bg-muted">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-muted p-6 rounded-xl text-center">
            <Leaf className="h-8 w-8 text-eco-emerald mx-auto mb-2" />
            <p className="text-3xl font-bold mb-1 eco-gradient-text">10,000+</p>
            <p className="text-muted-foreground">Tons of CO2 Reduced</p>
          </div>
          <div className="bg-muted p-6 rounded-xl text-center">
            <Users className="h-8 w-8 text-eco-teal mx-auto mb-2" />
            <p className="text-3xl font-bold mb-1 eco-gradient-text">5,000+</p>
            <p className="text-muted-foreground">Active Users</p>
          </div>
          <div className="bg-muted p-6 rounded-xl text-center">
            <MessageSquare className="h-8 w-8 text-eco-sky mx-auto mb-2" />
            <p className="text-3xl font-bold mb-1 eco-gradient-text">50,000+</p>
            <p className="text-muted-foreground">AI Responses</p>
          </div>
          <div className="bg-muted p-6 rounded-xl text-center">
            <LineChart className="h-8 w-8 text-eco-sage mx-auto mb-2" />
            <p className="text-3xl font-bold mb-1 eco-gradient-text">27%</p>
            <p className="text-muted-foreground">Avg. Emission Reduction</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
