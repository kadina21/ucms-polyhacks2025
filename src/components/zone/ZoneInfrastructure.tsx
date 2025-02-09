
import { MetricCard } from "@/components/MetricCard";
import { Zone } from "@/types/zone";

interface ZoneInfrastructureProps {
  zone: Zone;
}

export const ZoneInfrastructure = ({ zone }: ZoneInfrastructureProps) => {
  return (
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
  );
};
