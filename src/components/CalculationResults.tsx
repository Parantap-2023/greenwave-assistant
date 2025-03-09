
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, PieChart, LineChart, ArrowLeft, Download, Share2, Leaf } from "lucide-react";
import { ResponsiveContainer, PieChart as RechartPie, Pie, Cell, BarChart as RechartBar, Bar, XAxis, YAxis, Tooltip, CartesianGrid, LineChart as RechartLine, Line } from "recharts";

interface CalculationResultsProps {
  results: {
    totalEmissions: number;
    breakdowns: {
      transport: number;
      home: number;
      travel: number;
      lifestyle: number;
    };
    recommendations: string[];
  };
  onReset: () => void;
}

const COLORS = ["#10B981", "#0EA5E9", "#14B8A6", "#84CC16"];

const CalculationResults: React.FC<CalculationResultsProps> = ({ results, onReset }) => {
  // Prepare data for charts
  const pieData = [
    { name: "Transport", value: results.breakdowns.transport },
    { name: "Home", value: results.breakdowns.home },
    { name: "Travel", value: results.breakdowns.travel },
    { name: "Lifestyle", value: results.breakdowns.lifestyle },
  ];

  const barData = [
    { name: "Transport", emissions: results.breakdowns.transport, fill: "#10B981" },
    { name: "Home", emissions: results.breakdowns.home, fill: "#0EA5E9" },
    { name: "Travel", emissions: results.breakdowns.travel, fill: "#14B8A6" },
    { name: "Lifestyle", emissions: results.breakdowns.lifestyle, fill: "#84CC16" },
  ];

  // Mock historical data for line chart
  const lineData = [
    { month: "Jan", emissions: results.totalEmissions * 1.2 },
    { month: "Feb", emissions: results.totalEmissions * 1.1 },
    { month: "Mar", emissions: results.totalEmissions * 1.15 },
    { month: "Apr", emissions: results.totalEmissions * 1.05 },
    { month: "May", emissions: results.totalEmissions * 0.95 },
    { month: "Jun", emissions: results.totalEmissions * 0.9 },
    { month: "Jul", emissions: results.totalEmissions * 0.85 },
    { month: "Aug", emissions: results.totalEmissions },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-5xl mx-auto">
        <Button
          variant="ghost"
          onClick={onReset}
          className="mb-8 hover:bg-transparent"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Calculator
        </Button>

        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-4">
            Your Carbon <span className="eco-gradient-text">Footprint Results</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Based on your input, we've calculated your carbon footprint and prepared personalized recommendations.
          </p>
        </div>

        {/* Summary Card */}
        <Card className="eco-card mb-10">
          <CardHeader className="border-b pb-6">
            <CardTitle className="flex justify-between items-center">
              <span>Total Carbon Footprint</span>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="hidden sm:flex">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
                <Button variant="outline" size="sm" className="hidden sm:flex">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="text-center md:text-left mb-6 md:mb-0">
                <div className="text-4xl font-bold eco-gradient-text mb-2">
                  {results.totalEmissions} kg CO<sub>2</sub>e
                </div>
                <p className="text-muted-foreground">
                  Monthly carbon dioxide equivalent emissions
                </p>
                <div className="mt-4 flex items-center">
                  <Leaf className="text-eco-emerald h-5 w-5 mr-2" />
                  <span className="text-sm text-muted-foreground">
                    This is{" "}
                    <span className="font-medium text-foreground">
                      {results.totalEmissions > 500 ? "higher" : "lower"}
                    </span>{" "}
                    than the average person's footprint
                  </span>
                </div>
              </div>

              <div className="w-full md:w-1/2 h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={4}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} kg CO₂e`, ""]} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Charts */}
        <Card className="eco-card mb-10">
          <CardHeader>
            <CardTitle>Detailed Breakdown</CardTitle>
            <CardDescription>
              Explore your emissions across different categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="breakdown">
              <TabsList className="mb-6">
                <TabsTrigger value="breakdown" className="flex items-center gap-2">
                  <BarChart className="h-4 w-4" />
                  <span>Breakdown</span>
                </TabsTrigger>
                <TabsTrigger value="trends" className="flex items-center gap-2">
                  <LineChart className="h-4 w-4" />
                  <span>Trends</span>
                </TabsTrigger>
                <TabsTrigger value="distribution" className="flex items-center gap-2">
                  <PieChart className="h-4 w-4" />
                  <span>Distribution</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="breakdown">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartBar data={barData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                      <XAxis dataKey="name" />
                      <YAxis unit=" kg" />
                      <Tooltip formatter={(value) => [`${value} kg CO₂e`, "Emissions"]} />
                      <Bar dataKey="emissions" />
                    </RechartBar>
                  </ResponsiveContainer>
                </div>
              </TabsContent>

              <TabsContent value="trends">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartLine data={lineData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                      <XAxis dataKey="month" />
                      <YAxis unit=" kg" />
                      <Tooltip formatter={(value) => [`${value} kg CO₂e`, "Emissions"]} />
                      <Line type="monotone" dataKey="emissions" stroke="#10B981" strokeWidth={2} />
                    </RechartLine>
                  </ResponsiveContainer>
                </div>
              </TabsContent>

              <TabsContent value="distribution">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value} kg`}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value} kg CO₂e`, ""]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card className="eco-card">
          <CardHeader>
            <CardTitle>Personalized Recommendations</CardTitle>
            <CardDescription>
              Based on your emissions profile, here are some targeted suggestions to reduce your carbon footprint
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {results.recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start">
                  <div className="mr-3 mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-eco-emerald/20">
                    <Leaf className="h-3.5 w-3.5 text-eco-emerald" />
                  </div>
                  <p>{recommendation}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CalculationResults;
