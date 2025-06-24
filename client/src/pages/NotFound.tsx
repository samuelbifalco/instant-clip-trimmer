
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-2xl mx-auto text-center">
          <Card className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-gray-700/50 backdrop-blur-sm">
            <CardContent className="p-12 space-y-8">
              {/* Large 404 */}
              <div className="space-y-4">
                <h1 className="text-8xl md:text-9xl font-black bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  404
                </h1>
                <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
              </div>

              {/* Error message */}
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  Page Not Found
                </h2>
                <p className="text-xl text-gray-300 leading-relaxed max-w-lg mx-auto">
                  Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button
                  onClick={() => window.history.back()}
                  variant="outline"
                  size="lg"
                  className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Go Back
                </Button>
                <Button
                  onClick={() => window.location.href = '/'}
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold"
                >
                  <Home className="h-5 w-5 mr-2" />
                  Return Home
                </Button>
              </div>

              {/* Error details */}
              <div className="pt-8 border-t border-gray-700/50">
                <p className="text-sm text-gray-500">
                  Error code: 404 • Requested path: <code className="bg-gray-700/50 px-2 py-1 rounded text-gray-300">{location.pathname}</code>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
