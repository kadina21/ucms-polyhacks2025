
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Settings, PlayCircle, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export function MainNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const routes = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      active: location.pathname === "/dashboard"
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

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      navigate("/");
    }
  };

  return (
    <div className="flex justify-between items-center w-full px-6">
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
      <Button
        variant="ghost"
        size="icon"
        onClick={handleSignOut}
        className="ml-auto"
      >
        <LogOut className="h-4 w-4" />
      </Button>
    </div>
  );
}
