
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { MainNav } from "@/components/MainNav";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Index from "./pages/Index";
import ZoneDetail from "./pages/ZoneDetail";
import PopulationDetail from "./pages/PopulationDetail";
import MaintenanceView from "./pages/MaintenanceView";
import SimulationView from "./pages/SimulationView";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AuthenticatedLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen flex flex-col">
    <header className="border-b">
      <div className="flex h-16 items-center px-4">
        <MainNav />
      </div>
    </header>
    <main className="flex-1">{children}</main>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <AuthenticatedLayout>
                    <Index />
                  </AuthenticatedLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/zone/:id"
              element={
                <ProtectedRoute>
                  <AuthenticatedLayout>
                    <ZoneDetail />
                  </AuthenticatedLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/zone/:id/population"
              element={
                <ProtectedRoute>
                  <AuthenticatedLayout>
                    <PopulationDetail />
                  </AuthenticatedLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/maintenance"
              element={
                <ProtectedRoute>
                  <AuthenticatedLayout>
                    <MaintenanceView />
                  </AuthenticatedLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/simulation"
              element={
                <ProtectedRoute>
                  <AuthenticatedLayout>
                    <SimulationView />
                  </AuthenticatedLayout>
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
