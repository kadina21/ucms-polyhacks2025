
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, User } from "lucide-react";
import { MaintenanceTask } from "@/types/maintenance";
import { cn } from "@/lib/utils";

interface MaintenanceCardProps {
  task: MaintenanceTask;
}

export const MaintenanceCard = ({ task }: MaintenanceCardProps) => {
  const priorityColor = {
    low: "bg-blue-500",
    medium: "bg-yellow-500",
    high: "bg-red-500",
  };

  const statusColor = {
    pending: "bg-gray-500",
    in_progress: "bg-blue-500",
    completed: "bg-green-500",
    cancelled: "bg-red-500",
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{task.title}</CardTitle>
          <div className="flex gap-2">
            <Badge className={cn(priorityColor[task.priority], "capitalize")}>
              {task.priority}
            </Badge>
            <Badge className={cn(statusColor[task.status], "capitalize")}>
              {task.status}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm text-muted-foreground">{task.description}</p>
        <div className="flex flex-wrap gap-4 text-sm">
          {task.scheduledDate && (
            <div className="flex items-center gap-1">
              <CalendarDays className="w-4 h-4" />
              <span>
                {new Date(task.scheduledDate).toLocaleDateString()}
              </span>
            </div>
          )}
          {task.estimatedDuration && (
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{task.estimatedDuration}</span>
            </div>
          )}
          {task.assignedTo && (
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span>{task.assignedTo}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
