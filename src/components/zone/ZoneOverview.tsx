
import { MetricCard } from "@/components/MetricCard";
import { Zone } from "@/types/zone";

interface ZoneOverviewProps {
  zone: Zone;
}

export const ZoneOverview = ({ zone }: ZoneOverviewProps) => {
  // Find energy resource safely
  const energyResource = zone.resources.find(r => r.type === "energy");
  const energyEfficiency = energyResource 
    ? Math.round((energyResource.current / energyResource.capacity) * 100)
    : 0;

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        title="Maturity Score"
        value={`${zone.maturityScore || 0}%`}
        description="Overall zone performance"
      />
      <MetricCard
        title="Population"
        value={(zone.demographics.totalPopulation || 0).toLocaleString()}
        description={`${zone.demographics.growthRate || 0}% annual growth`}
      />
      <MetricCard
        title="Housing Capacity"
        value={(zone.infrastructure.residentialUnits || 0).toLocaleString()}
        description="Total residential units"
      />
      <MetricCard
        title="Energy Efficiency"
        value={`${energyEfficiency}%`}
        description="Of maximum capacity"
      />
    </div>
  );
};

