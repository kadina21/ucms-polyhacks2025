
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
import { Zone } from "@/types/zone";
import { MaintenanceTask } from "@/types/maintenance";
import { mockZones, mockAlerts } from "@/data/mockData";
import { MetricCard } from "@/components/MetricCard";
import { AlertBadge } from "@/components/AlertBadge";
import { ResourceBar } from "@/components/ResourceBar";
import { MaintenanceCard } from "@/components/MaintenanceCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [zones, setZones] = useState<Zone[]>(mockZones);
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [maintenanceTasks, setMaintenanceTasks] = useState<MaintenanceTask[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    loadMaintenanceTasks();
    toast({
      title: "Dashboard Initialized",
      description: "Live monitoring of underground zones activated.",
    });
  }, []);

  const loadMaintenanceTasks = async () => {
    const { data, error } = await supabase
      .from('maintenance_tasks')
      .select('*')
      .order('scheduled_date', { ascending: true });

    if (error) {
      console.error('Error loading maintenance tasks:', error);
      toast({
        title: "Error",
        description: "Failed to load maintenance tasks",
        variant: "destructive",
      });
      return;
    }

    setMaintenanceTasks(data);
  };

  return (
    <div className="container mx-auto p-6 space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Underground Cities Dashboard</h1>
        <div className="flex items-center space-x-4">
          <AlertBadge priority="high" />
          <span className="text-sm text-muted-foreground">
            {alerts.filter((a) => a.priority === "high").length} Critical Alerts
          </span>
        </div>
      </div>

      {/* Zones Section */}
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

              <div className="space-y-2">
                <h4 className="text-sm font-semibold">Recent Alerts</h4>
                <ScrollArea className="h-[100px]">
                  {alerts
                    .filter((alert) => alert.zoneId === zone.id)
                    .map((alert) => (
                      <div
                        key={alert.id}
                        className="flex items-center space-x-2 py-2"
                      >
                        <AlertTriangle
                          className={cn("w-4 h-4", {
                            "text-alert-low": alert.priority === "low",
                            "text-alert-medium": alert.priority === "medium",
                            "text-alert-high": alert.priority === "high",
                          })}
                        />
                        <span className="text-sm">{alert.title}</span>
                      </div>
                    ))}
                </ScrollArea>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Maintenance Section */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Wrench className="w-6 h-6" />
            Maintenance Tasks
          </h2>
          <Link
            to="/maintenance/new"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            New Task
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {maintenanceTasks.map((task) => (
            <MaintenanceCard key={task.id} task={task} />
          ))}
          {maintenanceTasks.length === 0 && (
            <p className="text-muted-foreground col-span-full text-center py-8">
              No maintenance tasks scheduled
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
