import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-cyan-500/10 to-purple-500/10 blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-br from-purple-500/10 to-pink-500/10 blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      </div>
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <div className="mx-auto max-w-lg text-center">
          <Card className="border border-white/10 bg-slate-800/80 backdrop-blur-sm">
            <CardContent className="space-y-8 p-8 sm:p-12">
              <h1 className="text-7xl font-black sm:text-8xl md:text-9xl">
                <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  404
                </span>
              </h1>
              <div className="mx-auto h-1 w-16 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500" />
              <h2 className="text-2xl font-bold text-white sm:text-3xl">Page not found</h2>
              <p className="text-slate-400">
                The page you're looking for doesn't exist or was moved.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => window.history.back()}
                  className="border-white/20 text-slate-300 hover:bg-white/10 hover:text-white"
                >
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Go back
                </Button>
                <Button asChild size="lg" className="bg-gradient-to-r from-cyan-500 to-purple-500 font-semibold text-white hover:from-cyan-600 hover:to-purple-600">
                  <Link to="/">
                    <Home className="mr-2 h-5 w-5" />
                    Home
                  </Link>
                </Button>
              </div>
              <p className="text-xs text-slate-500">
                Path: <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-slate-400">{location.pathname}</code>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
