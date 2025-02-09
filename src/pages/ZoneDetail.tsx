
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useZoneData } from "@/hooks/useZoneData";
import { ZoneOverview } from "@/components/zone/ZoneOverview";
import { ZoneDemographics } from "@/components/zone/ZoneDemographics";
import { ZoneInfrastructure } from "@/components/zone/ZoneInfrastructure";
import { ZoneResources } from "@/components/zone/ZoneResources";
import { ZoneEnvironment } from "@/components/zone/ZoneEnvironment";

const ZoneDetail = () => {
  const { id } = useParams();
  const { zone, isLoading } = useZoneData(id);

  if (isLoading || !zone) {
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
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
          <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="environment">Environment</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <ZoneOverview zone={zone} />
        </TabsContent>

        <TabsContent value="demographics">
          <ZoneDemographics zone={zone} />
        </TabsContent>

        <TabsContent value="infrastructure">
          <ZoneInfrastructure zone={zone} />
        </TabsContent>

        <TabsContent value="resources">
          <ZoneResources zone={zone} />
        </TabsContent>

        <TabsContent value="environment">
          <ZoneEnvironment zone={zone} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ZoneDetail;
