
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Activity, Wrench, Users, Building2, Database, Wind } from "lucide-react";
import { Zone, MaintenanceRequest } from "@/types/zone";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "@/components/MetricCard";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const ZoneDetail = () => {
  const { id } = useParams();
  const [zone, setZone] = useState<Zone | undefined>();
  const { toast } = useToast();

  useEffect(() => {
    const fetchZoneData = async () => {
      if (!id) return;

      try {
        // Fetch zone details
        const { data: zoneData, error: zoneError } = await supabase
          .from('zones')
          .select('*')
          .eq('id', id)
          .single();

        if (zoneError) throw zoneError;

        // Fetch maintenance requests
        const { data: maintenanceData, error: maintenanceError } = await supabase
          .from('maintenance_requests')
          .select('*')
          .eq('zone_id', id);

        if (maintenanceError) throw maintenanceError;

        const maintenanceRequests = maintenanceData.map(req => ({
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

        setZone({
          id: zoneData.id,
          name: zoneData.name,
          maturityScore: zoneData.maturity_score,
          resources: [],
          infrastructure: {
            hospitals: 5,
            schools: 12,
            residentialUnits: 5000,
            transportationHubs: 3,
            powerPlants: 2,
            transportation: {
              uoeCount: 150,
              multilevelTrains: 10,
              flyingVehicles: 50,
              accessibilityRate: 85,
            }
          },
          demographics: {
            totalPopulation: 250000,
            growthRate: 2.5,
            density: 4500,
            ageDistribution: {
              under18: 25,
              adults: 60,
              seniors: 15,
            }
          },
          environment: {
            airQuality: 85,
            waterQuality: 90,
            seismicStability: 95,
            temperatureControl: 88,
          },
          alerts: [],
          maintenanceRequests,
        });
      } catch (error: any) {
        toast({
          title: "Error",
          description: "Failed to fetch zone data: " + error.message,
          variant: "destructive",
        });
      }
    };

    fetchZoneData();
  }, [id]);

  if (!zone) {
    return <div>Loading...</div>;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-red-100 text-red-800';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return '';
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-8 animate-fade-in">
      <div className="flex items-center space-x-4">
        <Link to="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight flex items-center space-x-2">
          <span>{zone.name}</span>
          <Activity className="w-6 h-6 text-muted-foreground" />
        </h1>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="Maturity Score"
              value={`${zone.maturityScore}%`}
              description="Overall zone performance"
              icon={Activity}
            />
            <MetricCard
              title="Population"
              value={zone.demographics.totalPopulation.toLocaleString()}
              description={`${zone.demographics.growthRate}% annual growth`}
              icon={Users}
            />
            <MetricCard
              title="Infrastructure"
              value={`${zone.infrastructure.residentialUnits.toLocaleString()}`}
              description={`${zone.infrastructure.hospitals} hospitals, ${zone.infrastructure.schools} schools`}
              icon={Building2}
            />
            <MetricCard
              title="Environment"
              value={`${zone.environment.airQuality}%`}
              description="Air quality index"
              icon={Wind}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Demographics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Age Distribution</p>
                    <p className="text-2xl font-bold">
                      {zone.demographics.ageDistribution.adults}% Adults
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Population Density</p>
                    <p className="text-2xl font-bold">
                      {zone.demographics.density}/km²
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  Infrastructure
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Transport Hubs</p>
                    <p className="text-2xl font-bold">
                      {zone.infrastructure.transportationHubs}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Power Plants</p>
                    <p className="text-2xl font-bold">
                      {zone.infrastructure.powerPlants}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <MetricCard
              title="Open Requests"
              value={zone.maintenanceRequests.filter(r => r.status === 'open').length}
              icon={Wrench}
            />
            <MetricCard
              title="In Progress"
              value={zone.maintenanceRequests.filter(r => r.status === 'in_progress').length}
              icon={Wrench}
            />
            <MetricCard
              title="Resolved"
              value={zone.maintenanceRequests.filter(r => r.status === 'resolved').length}
              icon={Wrench}
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Maintenance Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {zone.maintenanceRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {request.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={cn("capitalize", getStatusColor(request.status))}>
                          {request.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(request.createdAt).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ZoneDetail;

