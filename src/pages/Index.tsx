
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Activity,
  Building2,
  Users,
  Droplet,
  Gauge,
} from "lucide-react";
import { Zone } from "@/types/zone";
import { mockZones } from "@/data/mockData";
import { MetricCard } from "@/components/MetricCard";
import { ResourceBar } from "@/components/ResourceBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const Index = () => {
  const [zones, setZones] = useState<Zone[]>(mockZones);
  const { toast } = useToast();

  useEffect(() => {
    toast({
      title: "Dashboard Initialized",
      description: "Live monitoring of underground zones activated.",
    });
  }, []);

  return (
    <div className="container mx-auto p-6 space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Underground Cities Dashboard</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {zones.map((zone) => (
          <Card
            key={zone.id}
            className={cn(
              "transition-all hover:shadow-lg border-l-4",
              {
                "border-l-zone-alpha": zone.id === "alpha",
                "border-l-zone-beta": zone.id === "beta",
                "border-l-zone-gamma": zone.id === "gamma",
              }
            )}
          >
            <CardHeader>
              <CardTitle>
                <Link
                  to={`/zone/${zone.id}`}
                  className="flex items-center space-x-2 hover:text-primary transition-colors"
                >
                  <span>{zone.name}</span>
                  <Activity className="w-5 h-5" />
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 grid-cols-2">
                <Link to={`/zone/${zone.id}/population`}>
                  <MetricCard
                    title="Population"
                    value={zone.demographics.totalPopulation.toLocaleString()}
                    icon={Users}
                    className="cursor-pointer hover:border-primary transition-colors"
                  />
                </Link>
                <MetricCard
                  title="Maturity Score"
                  value={`${zone.maturityScore}%`}
                  icon={Gauge}
                />
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-semibold">Resources</h4>
                {zone.resources.map((resource) => (
                  <ResourceBar key={resource.type} resource={resource} />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Index;
