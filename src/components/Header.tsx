
import { Scissors, Zap } from "lucide-react";

export const Header = () => {
  return (
    <header className="bg-gray-800 border-b border-gray-700">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
              <Scissors className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">ClipCut</h1>
              <p className="text-sm text-gray-400">One-Click Video Trimmer</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 bg-green-500/10 px-3 py-1 rounded-full">
            <Zap className="h-4 w-4 text-green-400" />
            <span className="text-sm text-green-400 font-medium">100% Free</span>
          </div>
        </div>
      </div>
    </header>
  );
};
