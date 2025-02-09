
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Building2, Users, PlayCircle, Settings } from "lucide-react";

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Underground Cities Management System</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A comprehensive platform for monitoring and managing underground urban infrastructure
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Zone Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Monitor and manage different underground zones with real-time data and insights
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Population Tracking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Track population distribution and demographics across different zones
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Maintenance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Schedule and track maintenance requests across all zones
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PlayCircle className="h-5 w-5" />
              Resource Simulation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Run simulations to optimize resource allocation and predict future needs
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      <div className="text-center mt-12">
        {isAuthenticated ? (
          <Link to="/dashboard">
            <Button size="lg">Go to Dashboard</Button>
          </Link>
        ) : (
          <Link to="/auth">
            <Button size="lg">Sign In</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Home;
