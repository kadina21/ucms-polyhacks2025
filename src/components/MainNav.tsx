
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Settings, PlayCircle, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export function MainNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const routes = [
    {
      href: "/",
      label: "Dashboard",
      icon: LayoutDashboard,
      active: location.pathname === "/"
    },
    {
      href: "/maintenance",
      label: "Maintenance",
      icon: Settings,
      active: location.pathname === "/maintenance"
    },
    {
      href: "/simulation",
      label: "Simulation",
      icon: PlayCircle,
      active: location.pathname === "/simulation"
    }
  ];

  const handleSignOut = () => {
    toast({
      title: "Signed out",
      description: "You have been successfully signed out.",
    });
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center w-full px-6 py-4 glass-morphism">
      <div className="flex items-center">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 via-primary to-purple-500 bg-clip-text text-transparent">UCMS</span>
        </Link>
      </div>
      <div className="flex items-center space-x-6">
        <nav className="flex items-center space-x-4 lg:space-x-6">
          {routes.map((route) => (
            <Link
              key={route.href}
              to={route.href}
              className={cn(
                "text-sm font-medium transition-all duration-200 hover:text-primary flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-white/5",
                route.active 
                  ? "text-primary bg-white/10" 
                  : "text-muted-foreground"
              )}
            >
              <route.icon className="h-4 w-4" />
              <span>{route.label}</span>
            </Link>
          ))}
        </nav>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleSignOut}
          className="hover:bg-primary/10"
        >
          <LogOut className="h-5 w-5 text-primary" />
        </Button>
      </div>
    </div>
  );
}
