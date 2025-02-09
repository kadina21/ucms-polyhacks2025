
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainNav } from "@/components/MainNav";
import Index from "./pages/Index";
import Login from "./pages/Login";
import ZoneDetail from "./pages/ZoneDetail";
import PopulationDetail from "./pages/PopulationDetail";
import MaintenanceView from "./pages/MaintenanceView";
import SimulationView from "./pages/SimulationView";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="*"
            element={
              <div className="min-h-screen flex flex-col">
                <header className="border-b">
                  <div className="flex h-16 items-center px-4">
                    <MainNav />
                  </div>
                </header>
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/zone/:id" element={<ZoneDetail />} />
                    <Route path="/zone/:id/population" element={<PopulationDetail />} />
                    <Route path="/maintenance" element={<MaintenanceView />} />
                    <Route path="/simulation" element={<SimulationView />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
