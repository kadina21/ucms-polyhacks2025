
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zone } from "@/types/zone";

interface ZoneDemographicsProps {
  zone: Zone;
}

export const ZoneDemographics = ({ zone }: ZoneDemographicsProps) => {
  return (
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
  );
};
