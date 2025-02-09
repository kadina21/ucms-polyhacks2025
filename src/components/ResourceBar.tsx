
import { Progress } from "@/components/ui/progress";
import { Resource } from "@/types/zone";
import { cn } from "@/lib/utils";

interface ResourceBarProps {
  resource: Resource;
}

export const ResourceBar = ({ resource }: ResourceBarProps) => {
  const percentage = (resource.current / resource.capacity) * 100;

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="font-medium">
          {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
        </span>
        <span className="text-muted-foreground">
          {resource.current} / {resource.capacity} {resource.unit}
        </span>
      </div>
      <Progress
        value={percentage}
        className={cn("h-2", {
          "bg-primary": true
        })}
        indicatorClassName={cn({
          "bg-alert-high": percentage < 25,
          "bg-alert-medium": percentage >= 25 && percentage < 50,
          "bg-alert-low": percentage >= 50,
        })}
      />
    </div>
  );
};
