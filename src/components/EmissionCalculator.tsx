
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, Home, Plane, ShoppingBag, Leaf } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CalculationResults from "./CalculationResults";

const EmissionCalculator = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("transport");
  const [calculationComplete, setCalculationComplete] = useState(false);
  const [results, setResults] = useState<any>(null);

  // Form state
  const [transport, setTransport] = useState({
    vehicleType: "car",
    fuelType: "gasoline",
    distance: 0,
    fuelEfficiency: 0,
  });

  const [home, setHome] = useState({
    energyType: "electricity",
    consumption: 0,
    residents: 1,
    homeSize: 0,
  });

  const [travel, setTravel] = useState({
    flightType: "domestic",
    distance: 0,
    passengers: 1,
  });

  const [lifestyle, setLifestyle] = useState({
    dietType: "omnivore",
    shoppingFrequency: "average",
  });

  const handleCalculate = () => {
    // In a real app, this would perform actual calculations based on scientific formulas
    // For this demo, we'll simulate a calculation

    let totalEmissions = 0;
    let breakdowns = {
      transport: 0,
      home: 0,
      travel: 0,
      lifestyle: 0,
    };

    // Transport emissions calculation (simplified)
    if (transport.vehicleType === "car") {
      const fuelFactor = transport.fuelType === "gasoline" ? 2.3 : 
                         transport.fuelType === "diesel" ? 2.7 : 1.1; // kg CO2e per liter
      const consumption = transport.distance / (transport.fuelEfficiency || 10); // liters
      breakdowns.transport = consumption * fuelFactor;
    }

    // Home emissions calculation (simplified)
    if (home.energyType === "electricity") {
      const emissionFactor = 0.5; // kg CO2e per kWh (varies by region)
      breakdowns.home = (home.consumption * emissionFactor) / (home.residents || 1);
    }

    // Travel emissions calculation (simplified)
    if (travel.flightType === "domestic") {
      const flightFactor = 0.2; // kg CO2e per km (domestic)
      breakdowns.travel = (travel.distance * flightFactor) / (travel.passengers || 1);
    } else {
      const flightFactor = 0.15; // kg CO2e per km (international)
      breakdowns.travel = (travel.distance * flightFactor) / (travel.passengers || 1);
    }

    // Lifestyle emissions calculation (simplified)
    const dietFactor = 
      lifestyle.dietType === "omnivore" ? 7.2 : 
      lifestyle.dietType === "vegetarian" ? 3.8 : 
      lifestyle.dietType === "vegan" ? 2.9 : 7.2; // kg CO2e per day
      
    const shoppingFactor = 
      lifestyle.shoppingFrequency === "minimal" ? 0.5 : 
      lifestyle.shoppingFrequency === "average" ? 1 : 
      lifestyle.shoppingFrequency === "frequent" ? 1.5 : 1;
      
    breakdowns.lifestyle = dietFactor * 30 * shoppingFactor; // monthly estimate

    // Total emissions
    totalEmissions = Object.values(breakdowns).reduce((sum, val) => sum + val, 0);

    // Prepare recommendations based on the highest emission category
    const highestCategory = Object.entries(breakdowns).reduce(
      (max, [category, value]) => (value > max.value ? { category, value } : max),
      { category: "", value: 0 }
    );

    const recommendations = generateRecommendations(highestCategory.category);

    // Set results
    setResults({
      totalEmissions: Math.round(totalEmissions * 10) / 10, // Round to 1 decimal place
      breakdowns: {
        transport: Math.round(breakdowns.transport * 10) / 10,
        home: Math.round(breakdowns.home * 10) / 10,
        travel: Math.round(breakdowns.travel * 10) / 10,
        lifestyle: Math.round(breakdowns.lifestyle * 10) / 10,
      },
      recommendations
    });

    setCalculationComplete(true);
    
    toast({
      title: "Calculation complete!",
      description: "Your carbon footprint has been calculated successfully.",
      variant: "default",
    });
  };

  const generateRecommendations = (highestCategory: string) => {
    const recommendations = {
      transport: [
        "Consider carpooling or using public transportation",
        "Switch to a more fuel-efficient vehicle or electric car",
        "Combine errands to reduce total driving distance",
        "Use a bike for short trips when possible"
      ],
      home: [
        "Switch to LED light bulbs throughout your home",
        "Improve home insulation to reduce energy needs",
        "Consider renewable energy sources like solar panels",
        "Unplug electronics when not in use to reduce phantom power"
      ],
      travel: [
        "Consider taking direct flights when possible",
        "Offset your flight emissions through verified carbon offset programs",
        "Choose economy class over business or first class",
        "Consider alternatives to flying for shorter distances"
      ],
      lifestyle: [
        "Reduce meat consumption, especially red meat",
        "Buy local and seasonal produce when possible",
        "Reduce single-use plastic consumption",
        "Practice mindful consumption and reduce unnecessary purchases"
      ]
    };

    return recommendations[highestCategory as keyof typeof recommendations] || recommendations.lifestyle;
  };

  const resetCalculator = () => {
    setCalculationComplete(false);
    setResults(null);
    setTransport({
      vehicleType: "car",
      fuelType: "gasoline",
      distance: 0,
      fuelEfficiency: 0,
    });
    setHome({
      energyType: "electricity",
      consumption: 0,
      residents: 1,
      homeSize: 0,
    });
    setTravel({
      flightType: "domestic",
      distance: 0,
      passengers: 1,
    });
    setLifestyle({
      dietType: "omnivore",
      shoppingFrequency: "average",
    });
  };

  if (calculationComplete && results) {
    return <CalculationResults results={results} onReset={resetCalculator} />;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-4">
            Carbon <span className="eco-gradient-text">Emission Calculator</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Calculate your carbon footprint by entering details about your transportation, energy usage, travel, and lifestyle habits.
          </p>
        </div>

        <Card className="eco-card">
          <CardHeader>
            <CardTitle>Enter Your Information</CardTitle>
            <CardDescription>
              Fill in the details in each category to get an accurate calculation of your carbon footprint.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-4 mb-8">
                <TabsTrigger value="transport" className="flex items-center gap-2">
                  <Car className="h-4 w-4" />
                  <span className="hidden sm:inline">Transport</span>
                </TabsTrigger>
                <TabsTrigger value="home" className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  <span className="hidden sm:inline">Home</span>
                </TabsTrigger>
                <TabsTrigger value="travel" className="flex items-center gap-2">
                  <Plane className="h-4 w-4" />
                  <span className="hidden sm:inline">Travel</span>
                </TabsTrigger>
                <TabsTrigger value="lifestyle" className="flex items-center gap-2">
                  <ShoppingBag className="h-4 w-4" />
                  <span className="hidden sm:inline">Lifestyle</span>
                </TabsTrigger>
              </TabsList>

              {/* Transport Tab */}
              <TabsContent value="transport">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="vehicleType">Vehicle Type</Label>
                      <Select
                        value={transport.vehicleType}
                        onValueChange={(value) => setTransport({ ...transport, vehicleType: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select vehicle type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="car">Car</SelectItem>
                          <SelectItem value="motorcycle">Motorcycle</SelectItem>
                          <SelectItem value="bus">Bus</SelectItem>
                          <SelectItem value="train">Train</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="fuelType">Fuel Type</Label>
                      <Select
                        value={transport.fuelType}
                        onValueChange={(value) => setTransport({ ...transport, fuelType: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select fuel type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gasoline">Gasoline</SelectItem>
                          <SelectItem value="diesel">Diesel</SelectItem>
                          <SelectItem value="electric">Electric</SelectItem>
                          <SelectItem value="hybrid">Hybrid</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="distance">
                        Monthly Distance (km)
                      </Label>
                      <Input
                        type="number"
                        placeholder="Enter distance"
                        value={transport.distance || ""}
                        onChange={(e) => setTransport({ ...transport, distance: Number(e.target.value) })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="fuelEfficiency">
                        Fuel Efficiency (km/L)
                      </Label>
                      <Input
                        type="number"
                        placeholder="Enter fuel efficiency"
                        value={transport.fuelEfficiency || ""}
                        onChange={(e) => setTransport({ ...transport, fuelEfficiency: Number(e.target.value) })}
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Home Tab */}
              <TabsContent value="home">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="energyType">Energy Type</Label>
                      <Select
                        value={home.energyType}
                        onValueChange={(value) => setHome({ ...home, energyType: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select energy type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="electricity">Electricity</SelectItem>
                          <SelectItem value="naturalGas">Natural Gas</SelectItem>
                          <SelectItem value="propane">Propane</SelectItem>
                          <SelectItem value="solar">Solar</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="consumption">
                        Monthly Consumption (kWh)
                      </Label>
                      <Input
                        type="number"
                        placeholder="Enter consumption"
                        value={home.consumption || ""}
                        onChange={(e) => setHome({ ...home, consumption: Number(e.target.value) })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="residents">Number of Residents</Label>
                      <Input
                        type="number"
                        placeholder="Enter number of residents"
                        value={home.residents || ""}
                        onChange={(e) => setHome({ ...home, residents: Number(e.target.value) })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="homeSize">Home Size (m²)</Label>
                      <Input
                        type="number"
                        placeholder="Enter home size"
                        value={home.homeSize || ""}
                        onChange={(e) => setHome({ ...home, homeSize: Number(e.target.value) })}
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Travel Tab */}
              <TabsContent value="travel">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="flightType">Flight Type</Label>
                      <Select
                        value={travel.flightType}
                        onValueChange={(value) => setTravel({ ...travel, flightType: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select flight type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="domestic">Domestic</SelectItem>
                          <SelectItem value="international">International</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="flightDistance">
                        Total Flight Distance (km)
                      </Label>
                      <Input
                        type="number"
                        placeholder="Enter flight distance"
                        value={travel.distance || ""}
                        onChange={(e) => setTravel({ ...travel, distance: Number(e.target.value) })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="passengers">Number of Passengers</Label>
                    <Input
                      type="number"
                      placeholder="Enter number of passengers"
                      value={travel.passengers || ""}
                      onChange={(e) => setTravel({ ...travel, passengers: Number(e.target.value) })}
                    />
                  </div>
                </div>
              </TabsContent>

              {/* Lifestyle Tab */}
              <TabsContent value="lifestyle">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="dietType">Diet Type</Label>
                      <Select
                        value={lifestyle.dietType}
                        onValueChange={(value) => setLifestyle({ ...lifestyle, dietType: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select diet type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="omnivore">Omnivore</SelectItem>
                          <SelectItem value="vegetarian">Vegetarian</SelectItem>
                          <SelectItem value="vegan">Vegan</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="shoppingFrequency">Shopping Frequency</Label>
                      <Select
                        value={lifestyle.shoppingFrequency}
                        onValueChange={(value) => setLifestyle({ ...lifestyle, shoppingFrequency: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select shopping frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="minimal">Minimal</SelectItem>
                          <SelectItem value="average">Average</SelectItem>
                          <SelectItem value="frequent">Frequent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-between items-center mt-10">
              <Button
                variant="outline"
                onClick={() => {
                  const prevTab = {
                    transport: "lifestyle",
                    home: "transport",
                    travel: "home",
                    lifestyle: "travel",
                  }[activeTab] as string;
                  setActiveTab(prevTab);
                }}
              >
                Previous
              </Button>
              
              {activeTab !== "lifestyle" ? (
                <Button
                  onClick={() => {
                    const nextTab = {
                      transport: "home",
                      home: "travel",
                      travel: "lifestyle",
                      lifestyle: "transport",
                    }[activeTab] as string;
                    setActiveTab(nextTab);
                  }}
                >
                  Next
                </Button>
              ) : (
                <Button
                  className="bg-eco-emerald hover:bg-eco-forest text-white"
                  onClick={handleCalculate}
                >
                  <Leaf className="mr-2 h-4 w-4" />
                  Calculate Emissions
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmissionCalculator;
