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
  Clock,
} from "lucide-react";
import { Alert, Zone } from "@/types/zone";
import { mockZones, mockAlerts } from "@/data/mockData";
import { MetricCard } from "@/components/MetricCard";
import { AlertBadge } from "@/components/AlertBadge";
import { ResourceBar } from "@/components/ResourceBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const Index = () => {
  const [zones, setZones] = useState<Zone[]>(mockZones);
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    toast({
      title: "Dashboard Initialized",
      description: "Live monitoring of underground zones activated.",
    });
  }, []);

  const highPriorityAlerts = alerts.filter((a) => a.priority === "high");

  return (
    <div className="container mx-auto p-6 space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Underground Cities Dashboard</h1>
        <div 
          className="flex items-center space-x-4 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => setSelectedAlert(highPriorityAlerts[0])}
        >
          <AlertBadge priority="high" />
          <span className="text-sm text-muted-foreground">
            {highPriorityAlerts.length} Critical Alerts
          </span>
        </div>
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

              <div className="grid gap-4 grid-cols-2">
                <MetricCard
                  title="Pending Maintenance"
                  value={zone.maintenanceRequests?.filter(r => r.status === "pending").length || 0}
                  icon={Clock}
                />
                <MetricCard
                  title="High Priority"
                  value={zone.maintenanceRequests?.filter(r => r.priority === "high").length || 0}
                  icon={AlertTriangle}
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
                        className="flex items-center space-x-2 py-2 cursor-pointer hover:bg-muted/50 px-2 rounded-md transition-colors"
                        onClick={() => setSelectedAlert(alert)}
                      >
                        <AlertTriangle
                          className={cn("w-4 h-4", {
                            "text-alert-medium": alert.priority === "low",
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

      <Dialog open={!!selectedAlert} onOpenChange={() => setSelectedAlert(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className={cn("w-5 h-5", {
                "text-alert-low": selectedAlert?.priority === "low",
                "text-alert-medium": selectedAlert?.priority === "medium",
                "text-alert-high": selectedAlert?.priority === "high",
              })} />
              {selectedAlert?.title}
            </DialogTitle>
            <DialogDescription>
              {selectedAlert?.message}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Priority</span>
              <AlertBadge priority={selectedAlert?.priority || "low"} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Zone</span>
              <span className="text-sm font-medium">
                {zones.find(z => z.id === selectedAlert?.zoneId)?.name}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Timestamp</span>
              <span className="text-sm font-medium">
                {selectedAlert?.timestamp ? new Date(selectedAlert.timestamp).toLocaleString() : '-'}
              </span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
