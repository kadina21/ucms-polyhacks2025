
import { AlertPriority } from "@/types/zone";
import { cn } from "@/lib/utils";

interface AlertBadgeProps {
  priority: AlertPriority;
}

export const AlertBadge = ({ priority }: AlertBadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        {
          "bg-alert-low/10 text-alert-low": priority === "low",
          "bg-alert-medium/10 text-alert-medium": priority === "medium",
          "bg-alert-high/10 text-alert-high": priority === "high",
        }
      )}
    >
      {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </span>
  );
};
