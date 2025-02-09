import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Activity, Clock, AlertTriangle } from "lucide-react";
import { Zone } from "@/types/zone";
import { mockZones } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "@/components/MetricCard";
import { ResourceBar } from "@/components/ResourceBar";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

const ZoneDetail = () => {
  const { id } = useParams();
  const [zone, setZone] = useState<Zone | undefined>();

  useEffect(() => {
    const foundZone = mockZones.find((z) => z.id === id);
    setZone(foundZone);
  }, [id]);

  if (!zone) {
    return <div>Zone not found</div>;
  }

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
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
          <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="environment">Environment</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="Maturity Score"
              value={`${zone.maturityScore}%`}
              description="Overall zone performance"
            />
            <MetricCard
              title="Population"
              value={zone.demographics.totalPopulation.toLocaleString()}
              description={`${zone.demographics.growthRate}% annual growth`}
            />
            <MetricCard
              title="Housing Capacity"
              value={zone.infrastructure.residentialUnits.toLocaleString()}
              description="Total residential units"
            />
            <MetricCard
              title="Energy Efficiency"
              value={`${Math.round((zone.resources.find(r => r.type === "energy")?.current || 0) / (zone.resources.find(r => r.type === "energy")?.capacity || 1) * 100)}%`}
              description="Of maximum capacity"
            />
          </div>
        </TabsContent>

        <TabsContent value="demographics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Population Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{zone.demographics.ageDistribution.under18}%</div>
                    <div className="text-sm text-muted-foreground">Under 18</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{zone.demographics.ageDistribution.adults}%</div>
                    <div className="text-sm text-muted-foreground">Adults</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{zone.demographics.ageDistribution.seniors}%</div>
                    <div className="text-sm text-muted-foreground">Seniors</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="infrastructure" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <MetricCard
              title="Hospitals"
              value={zone.infrastructure.hospitals}
              description="Medical facilities"
            />
            <MetricCard
              title="Schools"
              value={zone.infrastructure.schools}
              description="Educational institutions"
            />
            <MetricCard
              title="Transportation Hubs"
              value={zone.infrastructure.transportationHubs}
              description="Major transit centers"
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Transportation Systems</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <MetricCard
                title="UOE"
                value={zone.infrastructure.transportation.uoeCount}
                description="Underground Optimal Elevators"
              />
              <MetricCard
                title="Multilevel Trains"
                value={zone.infrastructure.transportation.multilevelTrains}
                description="Active train systems"
              />
              <MetricCard
                title="Flying Vehicles"
                value={zone.infrastructure.transportation.flyingVehicles}
                description="Two-seater vehicles"
              />
              <MetricCard
                title="Accessibility"
                value={`${zone.infrastructure.transportation.accessibilityRate}%`}
                description="Transportation accessibility rate"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Resource Utilization</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {zone.resources.map((resource) => (
                <ResourceBar key={resource.type} resource={resource} />
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="environment" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="Air Quality"
              value={`${zone.environment.airQuality}%`}
              description="Atmospheric conditions"
            />
            <MetricCard
              title="Water Quality"
              value={`${zone.environment.waterQuality}%`}
              description="Water system health"
            />
            <MetricCard
              title="Seismic Stability"
              value={`${zone.environment.seismicStability}%`}
              description="Structural integrity"
            />
            <MetricCard
              title="Temperature Control"
              value={`${zone.environment.temperatureControl}%`}
              description="Climate management"
            />
          </div>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Maintenance Requests</span>
                <Button variant="outline" size="sm">
                  <Clock className="w-4 h-4 mr-2" />
                  New Request
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Created</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {zone.maintenanceRequests?.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.title}</TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={cn({
                            "bg-yellow-100 text-yellow-800 hover:bg-yellow-100": request.status === "pending",
                            "bg-blue-100 text-blue-800 hover:bg-blue-100": request.status === "in_progress",
                            "bg-green-100 text-green-800 hover:bg-green-100": request.status === "completed"
                          })}
                        >
                          {request.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline"
                          className={cn({
                            "bg-gray-100 text-gray-800 hover:bg-gray-100": request.priority === "low",
                            "bg-yellow-100 text-yellow-800 hover:bg-yellow-100": request.priority === "medium",
                            "bg-red-100 text-red-800 hover:bg-red-100": request.priority === "high"
                          })}
                        >
                          {request.priority}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
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
