
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const HeroSection = () => {
  return (
    <div className="text-center mb-20 space-y-8">
      <div className="inline-flex items-center bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full px-6 py-3 mb-6">
        <Star className="h-5 w-5 text-yellow-400 mr-3" />
        <span className="text-blue-300 font-medium">Trusted by 10,000+ creators worldwide</span>
      </div>
      
      <div className="space-y-4">
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tight">
          <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Trim Videos
          </span>
        </h1>
        <p className="text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight">
          Like a Pro
        </p>
      </div>
      
      <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
        Professional video trimming made effortless. No signup, no watermarks, 
        completely free with lightning-fast processing.
      </p>
      
      <div className="flex flex-wrap justify-center gap-4 pt-4">
        <Badge variant="secondary" className="bg-green-500/10 text-green-400 border-green-500/20 px-4 py-2 text-sm font-medium">
          ✨ No watermarks
        </Badge>
        <Badge variant="secondary" className="bg-blue-500/10 text-blue-400 border-blue-500/20 px-4 py-2 text-sm font-medium">
          ⚡ Instant processing
        </Badge>
        <Badge variant="secondary" className="bg-purple-500/10 text-purple-400 border-purple-500/20 px-4 py-2 text-sm font-medium">
          🔒 100% private
        </Badge>
      </div>
    </div>
  );
};
