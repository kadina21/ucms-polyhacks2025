
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResourceBar } from "@/components/ResourceBar";
import { Zone } from "@/types/zone";

interface ZoneResourcesProps {
  zone: Zone;
}

export const ZoneResources = ({ zone }: ZoneResourcesProps) => {
  return (
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
  );
};
