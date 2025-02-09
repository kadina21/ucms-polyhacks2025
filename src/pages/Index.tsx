
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Activity,
  AlertTriangle,
  Building2,
  Users,
  Droplet,
  Gauge,
  Wrench,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Zone, Alert, MaintenanceRequest } from "@/types/zone";
import { MetricCard } from "@/components/MetricCard";
import { AlertBadge } from "@/components/AlertBadge";
import { ResourceBar } from "@/components/ResourceBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const Index = () => {
  const [zones, setZones] = useState<Zone[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch zones
        const { data: zonesData, error: zonesError } = await supabase
          .from('zones')
          .select('*');
        
        if (zonesError) throw zonesError;

        // Fetch maintenance requests
        const { data: maintenanceData, error: maintenanceError } = await supabase
          .from('maintenance_requests')
          .select('*');

        if (maintenanceError) throw maintenanceError;

        // Format the data to match our TypeScript types
        const formattedZones = zonesData.map(zone => {
          const zoneRequests = maintenanceData
            .filter(req => req.zone_id === zone.id)
            .map(req => ({
              id: req.id,
              title: req.title,
              description: req.description,
              category: req.category,
              status: req.status,
              zoneId: req.zone_id,
              createdAt: req.created_at,
              updatedAt: req.updated_at,
              resolvedAt: req.resolved_at,
            }));

          return {
            id: zone.id,
            name: zone.name,
            maturityScore: zone.maturity_score,
            resources: [], // You may want to fetch these from your resources table
            infrastructure: {} as any, // You may want to fetch these from your infrastructure table
            demographics: {} as any, // You may want to fetch these from your demographics table
            environment: {} as any, // You may want to fetch these from your environment table
            alerts: [],
            maintenanceRequests: zoneRequests,
          };
        });

        setZones(formattedZones);
        toast({
          title: "Dashboard Initialized",
          description: "Live monitoring of underground zones activated.",
        });
      } catch (error: any) {
        toast({
          title: "Error",
          description: "Failed to fetch zone data: " + error.message,
          variant: "destructive",
        });
      }
    };

    fetchData();
  }, []);

  const getOpenRequestsCount = (zoneId: string) => {
    return zones.find(z => z.id === zoneId)?.maintenanceRequests.filter(r => r.status === 'open').length || 0;
  };

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
                <MetricCard
                  title="Maturity Score"
                  value={`${zone.maturityScore}%`}
                  icon={Gauge}
                />
                <MetricCard
                  title="Maintenance Requests"
                  value={getOpenRequestsCount(zone.id)}
                  description="Open requests"
                  icon={Wrench}
                  className={cn({
                    "border-red-200 bg-red-50": getOpenRequestsCount(zone.id) > 2,
                    "border-yellow-200 bg-yellow-50": getOpenRequestsCount(zone.id) === 2,
                  })}
                />
              </div>

              {/* Display recent maintenance requests */}
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">Recent Maintenance Requests</h4>
                <ScrollArea className="h-[100px]">
                  {zone.maintenanceRequests
                    .filter(request => request.status === 'open')
                    .map((request) => (
                      <div
                        key={request.id}
                        className="flex items-center space-x-2 py-2"
                      >
                        <Wrench className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{request.title}</span>
                      </div>
                    ))}
                </ScrollArea>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Index;
