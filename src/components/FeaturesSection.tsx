
import { Zap, Scissors, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const FeaturesSection = () => {
  return (
    <Card className="bg-gradient-to-r from-gray-800/60 to-gray-900/60 border-gray-700/50 backdrop-blur-sm mb-24 overflow-hidden">
      <CardContent className="p-16">
        <div className="text-center mb-16">
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Why Choose ClipCut?
          </h3>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
          <div className="text-center space-y-8 group">
            <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 border border-green-500/30">
              <Zap className="h-12 w-12 text-green-400" />
            </div>
            <h4 className="font-bold text-white text-2xl">Lightning Fast</h4>
            <p className="text-gray-300 leading-relaxed text-lg">
              Process videos instantly in your browser with zero upload time. 
              Our advanced technology ensures smooth, real-time editing.
            </p>
            <div className="h-1 w-16 bg-gradient-to-r from-green-400 to-green-600 mx-auto rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          
          <div className="text-center space-y-8 group">
            <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 border border-blue-500/30">
              <Shield className="h-12 w-12 text-blue-400" />
            </div>
            <h4 className="font-bold text-white text-2xl">100% Private</h4>
            <p className="text-gray-300 leading-relaxed text-lg">
              Everything happens locally on your device. Your videos never 
              leave your computer, ensuring complete privacy and security.
            </p>
            <div className="h-1 w-16 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          
          <div className="text-center space-y-8 group">
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 border border-purple-500/30">
              <Scissors className="h-12 w-12 text-purple-400" />
            </div>
            <h4 className="font-bold text-white text-2xl">Precision Trimming</h4>
            <p className="text-gray-300 leading-relaxed text-lg">
              Frame-perfect cuts with our intuitive timeline editor. 
              Professional-grade trimming tools made simple for everyone.
            </p>
            <div className="h-1 w-16 bg-gradient-to-r from-purple-400 to-purple-600 mx-auto rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
