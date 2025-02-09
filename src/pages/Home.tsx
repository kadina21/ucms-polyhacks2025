
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h1 className="text-5xl font-bold tracking-tight">
            Underground Cities Dashboard
          </h1>
          <p className="text-xl text-gray-600">
            A comprehensive management system for monitoring and maintaining
            underground urban infrastructure.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/auth">
              <Button size="lg" className="gap-2">
                Get Started <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
