
import { Alert } from "@/types/zone";
import { AlertBadge } from "@/components/AlertBadge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";

interface AlertsListProps {
  alerts: Alert[];
}

export function AlertsList({ alerts }: AlertsListProps) {
  const sortedAlerts = [...alerts].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <div className="space-y-4">
      {sortedAlerts.map((alert) => (
        <Card key={alert.id}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{alert.title}</CardTitle>
              <AlertBadge priority={alert.priority} />
            </div>
            <CardDescription>
              {formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{alert.message}</p>
          </CardContent>
        </Card>
      ))}
      {alerts.length === 0 && (
        <p className="text-center text-muted-foreground">No alerts found</p>
      )}
    </div>
  );
}
