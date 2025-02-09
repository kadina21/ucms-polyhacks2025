
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { PlayCircle } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockZones } from "@/data/mockData";

interface SimulationResults {
  oxygen: number;
  water: number;
  electricity: number;
  efficiency: number;
}

const SimulationView = () => {
  const { toast } = useToast();
  const [isSimulating, setIsSimulating] = useState(false);
  const [selectedZone, setSelectedZone] = useState(mockZones[0].id);
  const [oxygen, setOxygen] = useState(50);
  const [water, setWater] = useState(50);
  const [electricity, setElectricity] = useState(50);
  const [results, setResults] = useState<SimulationResults | null>(null);

  const selectedZoneData = mockZones.find((zone) => zone.id === selectedZone);

  const runSimulation = () => {
    if (!selectedZoneData) return;

    setIsSimulating(true);
    toast({
      title: "Simulation Started",
      description: "Resource allocation simulation is now running...",
    });

    // Calculate population factor (1 for normal population, less for lower population)
    const populationFactor = selectedZoneData.demographics.totalPopulation / 25000; // Normalized to largest zone
    const efficiencyMultiplier = 0.8 + (Math.random() * 0.4); // Base efficiency (80-120%)

    setTimeout(() => {
      // Mock simulation results based on input values and population
      const mockResults: SimulationResults = {
        oxygen: Math.min(100, (oxygen * efficiencyMultiplier) / populationFactor),
        water: Math.min(100, (water * efficiencyMultiplier) / populationFactor),
        electricity: Math.min(100, (electricity * efficiencyMultiplier) / populationFactor),
        efficiency: Math.min(100, ((oxygen + water + electricity) / 3) / populationFactor),
      };
      
      setResults(mockResults);
      setIsSimulating(false);
      toast({
        title: "Simulation Complete",
        description: `Resource allocation has been optimized for ${selectedZoneData.name} with population of ${selectedZoneData.demographics.totalPopulation}.`,
      });
    }, 3000);
  };

  return (
    <div className="container mx-auto p-6 space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Resource Simulation</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Configure Resources</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">
                  Select Zone
                </label>
                <Select
                  value={selectedZone}
                  onValueChange={setSelectedZone}
                  disabled={isSimulating}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a zone" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockZones.map((zone) => (
                      <SelectItem key={zone.id} value={zone.id}>
                        {zone.name} (Pop: {zone.demographics.totalPopulation})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Oxygen Capacity (m³/hour)
                </label>
                <Slider
                  value={[oxygen]}
                  onValueChange={(value) => setOxygen(value[0])}
                  max={100}
                  step={1}
                  disabled={isSimulating}
                />
                <p className="text-sm text-muted-foreground text-right">{oxygen}%</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Water Supply (L/hour)
                </label>
                <Slider
                  value={[water]}
                  onValueChange={(value) => setWater(value[0])}
                  max={100}
                  step={1}
                  disabled={isSimulating}
                />
                <p className="text-sm text-muted-foreground text-right">{water}%</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Electricity Output (kW)
                </label>
                <Slider
                  value={[electricity]}
                  onValueChange={(value) => setElectricity(value[0])}
                  max={100}
                  step={1}
                  disabled={isSimulating}
                />
                <p className="text-sm text-muted-foreground text-right">{electricity}%</p>
              </div>
            </div>

            <Button
              onClick={runSimulation}
              disabled={isSimulating || !selectedZoneData}
              className="w-full"
            >
              <PlayCircle className="mr-2 h-4 w-4" />
              {isSimulating ? "Simulating..." : "Start Simulation"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Simulation Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {results ? (
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Oxygen Efficiency</span>
                    <span>{Math.round(results.oxygen)}%</span>
                  </div>
                  <Progress value={results.oxygen} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Water Efficiency</span>
                    <span>{Math.round(results.water)}%</span>
                  </div>
                  <Progress value={results.water} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Electricity Efficiency</span>
                    <span>{Math.round(results.electricity)}%</span>
                  </div>
                  <Progress value={results.electricity} className="h-2" />
                </div>

                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Overall Efficiency</span>
                    <span className="text-2xl font-bold">
                      {Math.round(results.efficiency)}%
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                Configure resources and run the simulation to see results
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SimulationView;
