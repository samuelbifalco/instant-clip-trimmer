
import { Scissors, Zap, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const Header = () => {
  return (
    <header className="cyber-card bg-black/80 border-b border-cyan-500/30 backdrop-blur-sm sticky top-0 z-50 cyber-grid">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-cyan-500 to-purple-600 p-3 rounded-xl shadow-lg neon-border energy-pulse">
              <Scissors className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black holographic">ClipCut</h1>
              <p className="text-sm text-cyan-400 font-medium neon-text">Professional Video Trimmer</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="cyber-button bg-green-500/10 text-green-400 border-green-500/20 px-4 py-2 text-sm font-medium">
              <Zap className="h-4 w-4 mr-2" />
              100% Free
            </Badge>
            <Badge variant="secondary" className="cyber-button bg-blue-500/10 text-blue-400 border-blue-500/20 px-4 py-2 text-sm font-medium hidden sm:flex">
              <Shield className="h-4 w-4 mr-2" />
              Private & Secure
            </Badge>
          </div>
        </div>
      </div>
    </header>
  );
};
