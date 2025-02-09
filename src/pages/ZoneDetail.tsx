import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Activity } from "lucide-react";
import { Zone, Alert } from "@/types/zone";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "@/components/MetricCard";
import { ResourceBar } from "@/components/ResourceBar";
import { AlertDialog } from "@/components/AlertDialog";
import { AlertsList } from "@/components/AlertsList";
import { supabase } from "@/integrations/supabase/client";

const ZoneDetail = () => {
  const { id } = useParams();
  const [zone, setZone] = useState<Zone | undefined>();
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const fetchZoneDetails = async () => {
    if (!id) return;

    try {
      const { data: zoneData, error: zoneError } = await supabase
        .from('zone_details')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (zoneError) {
        console.error("Error fetching zone details:", zoneError);
        return;
      }

      if (!zoneData) {
        console.error("Zone not found");
        return;
      }

      const { data: resourcesData, error: resourcesError } = await supabase
        .from('zone_resources')
        .select('resources')
        .eq('zone_id', id)
        .maybeSingle();

      if (resourcesError) {
        console.error("Error fetching resources:", resourcesError);
        return;
      }

      const completeZone: Zone = {
        id: zoneData.id,
        name: zoneData.name,
        maturityScore: zoneData.maturity_score,
        demographics: {
          totalPopulation: zoneData.total_population,
          growthRate: zoneData.growth_rate,
          density: zoneData.density,
          ageDistribution: {
            under18: Math.round((zoneData.under_18_population / zoneData.total_population) * 100),
            adults: Math.round((zoneData.adults_population / zoneData.total_population) * 100),
            seniors: Math.round((zoneData.seniors_population / zoneData.total_population) * 100),
          },
        },
        environment: {
          airQuality: zoneData.air_quality,
          waterQuality: zoneData.water_quality,
          seismicStability: zoneData.seismic_stability,
          temperatureControl: zoneData.temperature_control,
        },
        infrastructure: {
          hospitals: zoneData.hospitals,
          schools: zoneData.schools,
          residentialUnits: zoneData.residential_units,
          transportationHubs: zoneData.transportation_hubs,
          powerPlants: zoneData.power_plants,
        },
        resources: resourcesData?.resources || [],
      };

      setZone(completeZone);
    } catch (error) {
      console.error("Error fetching zone data:", error);
    }
  };

  const fetchAlerts = async () => {
    if (!id) return;
    
    try {
      const { data, error } = await supabase
        .from("alerts")
        .select("*")
        .eq("zone_id", id)
        .order("timestamp", { ascending: false });

      if (error) {
        console.error("Error fetching alerts:", error);
        return;
      }

      const formattedAlerts: Alert[] = data.map(alert => ({
        id: alert.id,
        title: alert.title,
        message: alert.message,
        priority: alert.priority,
        zoneId: alert.zone_id,
        timestamp: alert.timestamp,
      }));

      setAlerts(formattedAlerts);
    } catch (error) {
      console.error("Error fetching alerts:", error);
    }
  };

  useEffect(() => {
    fetchZoneDetails();
    fetchAlerts();
  }, [id]);

  if (!zone) {
    return <div>Loading zone details...</div>;
  }

  return (
    <div className="container mx-auto p-6 space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
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
        <AlertDialog zoneId={zone.id} onAlertCreated={fetchAlerts} />
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
          <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="environment">Environment</TabsTrigger>
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

        <TabsContent value="alerts" className="space-y-6">
          <AlertsList alerts={alerts} />
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
      </Tabs>
    </div>
  );
};

export default ZoneDetail;
