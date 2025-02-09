
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "@/components/MetricCard";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Zone } from "@/types/zone";
import { mockZones } from "@/data/mockData";

const PopulationDetail = () => {
  const { id } = useParams();
  const [zone, setZone] = useState<Zone | undefined>();

  // Mock data for the growth chart - this will be replaced with real data later
  const mockGrowthData = [
    { month: "Jan", population: 1000000 },
    { month: "Feb", population: 1020000 },
    { month: "Mar", population: 1050000 },
    { month: "Apr", population: 1090000 },
    { month: "May", population: 1140000 },
    { month: "Jun", population: 1200000 },
  ];

  useEffect(() => {
    const foundZone = mockZones.find((z) => z.id === id);
    setZone(foundZone);
  }, [id]);

  if (!zone) {
    return <div>Zone not found</div>;
  }

  return (
    <div className="container mx-auto p-6 space-y-8 animate-fade-in">
      <div className="flex items-center space-x-4">
        <Link to="/dashboard">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight flex items-center space-x-2">
          <span>{zone.name} Population Statistics</span>
          <Users className="w-6 h-6 text-muted-foreground" />
        </h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <MetricCard
          title="Total Population"
          value={zone.demographics.totalPopulation.toLocaleString()}
          description="Current residents"
        />
        <MetricCard
          title="Growth Rate"
          value={`${zone.demographics.growthRate}%`}
          description="Annual increase"
        />
        <MetricCard
          title="Population Density"
          value={`${zone.demographics.density.toFixed(2)}`}
          description="People per square km"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Age Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">
                {zone.demographics.ageDistribution.under18}%
              </div>
              <div className="text-sm text-muted-foreground">Under 18</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                {zone.demographics.ageDistribution.adults}%
              </div>
              <div className="text-sm text-muted-foreground">Adults</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                {zone.demographics.ageDistribution.seniors}%
              </div>
              <div className="text-sm text-muted-foreground">Seniors</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Population Growth Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="population"
                  stroke="#8884d8"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PopulationDetail;
