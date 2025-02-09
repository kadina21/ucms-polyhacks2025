
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Settings, PlayCircle, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export function MainNav() {
  const location = useLocation();
  const { logout } = useAuth();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: "Signed out",
      description: "You have been successfully signed out.",
    });
  };

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

  return (
    <div className="flex items-center justify-between w-full px-6">
      <nav className="flex items-center space-x-4 lg:space-x-6">
        {routes.map((route) => (
          <Link
            key={route.href}
            to={route.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary flex items-center space-x-2",
              route.active 
                ? "text-primary" 
                : "text-muted-foreground"
            )}
          >
            <route.icon className="h-4 w-4" />
            <span>{route.label}</span>
          </Link>
        ))}
      </nav>
      <Button variant="ghost" size="icon" onClick={handleLogout}>
        <LogOut className="h-4 w-4" />
      </Button>
    </div>
  );
}
