
import { useEffect, useState } from "react";
import { Zone } from "@/types/zone";
import { mockZones } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const MaintenanceView = () => {
  const [zones, setZones] = useState<Zone[]>(mockZones);

  const allMaintenanceRequests = zones.flatMap((zone) =>
    (zone.maintenanceRequests || []).map((request) => ({
      ...request,
      zoneName: zone.name,
      zoneId: zone.id,
    }))
  );

  return (
    <div className="container mx-auto p-6 space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Maintenance Requests</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Maintenance Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Zone</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allMaintenanceRequests.map((request, index) => (
                <TableRow key={index}>
                  <TableCell>{request.zoneName}</TableCell>
                  <TableCell>{request.description}</TableCell>
                  <TableCell>
                    <Badge
                      variant={request.status === "pending" ? "secondary" : "success"}
                    >
                      {request.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        request.priority === "high"
                          ? "destructive"
                          : request.priority === "medium"
                          ? "warning"
                          : "default"
                      }
                    >
                      {request.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(request.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default MaintenanceView;
