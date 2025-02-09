
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Settings, PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function MainNav() {
  const location = useLocation();

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
    <div className="flex justify-between items-center w-full px-6">
      <div className="flex items-center">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-primary">UCMS</span>
        </Link>
      </div>
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
    </div>
  );
}
