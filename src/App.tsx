
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainNav } from "@/components/MainNav";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Index from "./pages/Index";
import ZoneDetail from "./pages/ZoneDetail";
import PopulationDetail from "./pages/PopulationDetail";
import MaintenanceView from "./pages/MaintenanceView";
import SimulationView from "./pages/SimulationView";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <header className="border-b">
              <div className="flex h-16 items-center px-4">
                <MainNav />
              </div>
            </header>
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Index />
                  </ProtectedRoute>
                } />
                <Route path="/zone/:id" element={
                  <ProtectedRoute>
                    <ZoneDetail />
                  </ProtectedRoute>
                } />
                <Route path="/zone/:id/population" element={
                  <ProtectedRoute>
                    <PopulationDetail />
                  </ProtectedRoute>
                } />
                <Route path="/maintenance" element={
                  <ProtectedRoute>
                    <MaintenanceView />
                  </ProtectedRoute>
                } />
                <Route path="/simulation" element={
                  <ProtectedRoute>
                    <SimulationView />
                  </ProtectedRoute>
                } />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
