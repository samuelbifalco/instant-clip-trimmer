
import { Zap, Scissors } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const FeaturesSection = () => {
  return (
    <Card className="bg-gradient-to-r from-gray-800/60 to-gray-900/60 border-gray-700/50 backdrop-blur-sm mb-20">
      <CardContent className="p-12">
        <h3 className="text-4xl font-bold text-center mb-12 text-white">
          Why Choose ClipCut?
        </h3>
        <div className="grid md:grid-cols-3 gap-12">
          <div className="text-center space-y-6">
            <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
              <Zap className="h-10 w-10 text-green-400" />
            </div>
            <h4 className="font-bold text-white text-xl">Lightning Fast</h4>
            <p className="text-gray-300 leading-relaxed text-lg">
              Process videos instantly in your browser with zero upload time. 
              Our advanced technology ensures smooth, real-time editing.
            </p>
          </div>
          
          <div className="text-center space-y-6">
            <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
              <Scissors className="h-10 w-10 text-blue-400" />
            </div>
            <h4 className="font-bold text-white text-xl">100% Private</h4>
            <p className="text-gray-300 leading-relaxed text-lg">
              Everything happens locally on your device. Your videos never 
              leave your computer, ensuring complete privacy and security.
            </p>
          </div>
          
          <div className="text-center space-y-6">
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
              <Scissors className="h-10 w-10 text-purple-400" />
            </div>
            <h4 className="font-bold text-white text-xl">Precision Trimming</h4>
            <p className="text-gray-300 leading-relaxed text-lg">
              Frame-perfect cuts with our intuitive timeline editor. 
              Professional-grade trimming tools made simple for everyone.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
