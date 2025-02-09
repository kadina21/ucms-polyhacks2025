
import { MetricCard } from "@/components/MetricCard";
import { Zone } from "@/types/zone";

interface ZoneOverviewProps {
  zone: Zone;
}

export const ZoneOverview = ({ zone }: ZoneOverviewProps) => {
  return (
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
  );
};
