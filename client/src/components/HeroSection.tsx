
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const HeroSection = () => {
  return (
    <div className="text-center mb-24 space-y-10 cyber-grid">
      <div className="inline-flex items-center glass-morphism neon-border rounded-full px-8 py-4 mb-8 energy-pulse">
        <Star className="h-5 w-5 text-yellow-400 mr-3 animate-pulse" />
        <span className="text-cyan-300 font-semibold neon-text">Trusted by 10,000+ creators worldwide</span>
      </div>
      
      <div className="space-y-6">
        <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight leading-none">
          <span className="holographic">
            Trim Videos
          </span>
        </h1>
        <p className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black neon-text tracking-tight leading-none">
          Like a Pro
        </p>
      </div>
      
      <div className="max-w-4xl mx-auto space-y-6">
        <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 leading-relaxed font-light">
          Professional video trimming made effortless. No signup, no watermarks, 
          completely free with lightning-fast processing.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 pt-6">
          <Badge variant="secondary" className="cyber-button bg-green-500/10 text-green-400 border-green-500/20 px-6 py-3 text-base font-semibold">
            No watermarks
          </Badge>
          <Badge variant="secondary" className="cyber-button bg-blue-500/10 text-blue-400 border-blue-500/20 px-6 py-3 text-base font-semibold">
            Instant processing
          </Badge>
          <Badge variant="secondary" className="cyber-button bg-purple-500/10 text-purple-400 border-purple-500/20 px-6 py-3 text-base font-semibold">
            100% private
          </Badge>
        </div>
      </div>
    </div>
  );
};
