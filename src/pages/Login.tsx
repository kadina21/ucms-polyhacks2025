
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { LogIn } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Show success toast
    toast({
      title: "Login successful",
      description: "Welcome to the Underground Cities Management System",
    });
    // Redirect to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-[400px] shadow-lg animate-fade-in">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-3xl font-bold">UCMS</CardTitle>
          <p className="text-muted-foreground">
            Underground Cities Management System
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              <LogIn className="mr-2" />
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
