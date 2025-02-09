
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Underground Cities</h1>
          <Link to="/auth">
            <Button>Sign In</Button>
          </Link>
        </div>
      </header>
      <main className="flex-1">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-4xl font-bold tracking-tight">
              Welcome to Underground Cities Management
            </h2>
            <p className="text-xl text-muted-foreground">
              A comprehensive platform for monitoring and managing underground urban developments.
              Track resources, maintain infrastructure, and ensure the safety of underground communities.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/auth">
                <Button size="lg">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;
