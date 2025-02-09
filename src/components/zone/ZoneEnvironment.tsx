
import { MetricCard } from "@/components/MetricCard";
import { Zone } from "@/types/zone";

interface ZoneEnvironmentProps {
  zone: Zone;
}

export const ZoneEnvironment = ({ zone }: ZoneEnvironmentProps) => {
  return (
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
  );
};
