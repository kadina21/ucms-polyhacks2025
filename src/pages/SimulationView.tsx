
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { PlayCircle } from "lucide-react";

const SimulationView = () => {
  const { toast } = useToast();
  const [isSimulating, setIsSimulating] = useState(false);

  const runSimulation = () => {
    setIsSimulating(true);
    toast({
      title: "Simulation Started",
      description: "Resource allocation simulation is now running...",
    });

    // Simulate a delay
    setTimeout(() => {
      setIsSimulating(false);
      toast({
        title: "Simulation Complete",
        description: "Resource allocation has been optimized based on the simulation results.",
      });
    }, 3000);
  };

  return (
    <div className="container mx-auto p-6 space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Resource Simulation</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Run Simulation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Run a simulation to optimize resource allocation across all zones based on
            current usage patterns and predicted future needs.
          </p>
          <Button
            onClick={runSimulation}
            disabled={isSimulating}
            className="w-full"
          >
            <PlayCircle className="mr-2 h-4 w-4" />
            {isSimulating ? "Simulating..." : "Start Simulation"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SimulationView;
