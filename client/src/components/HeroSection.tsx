import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const HeroSection = () => {
  return (
    <div className="mb-20 text-center space-y-8 sm:mb-28 sm:space-y-12">
      <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/5 px-5 py-2.5 text-sm font-medium text-cyan-300 shadow-lg shadow-cyan-500/10">
        <Sparkles className="h-4 w-4" />
        <span>No signup · No watermarks · Runs in your browser</span>
      </div>

      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Trim Videos
          </span>
        </h1>
        <p className="text-3xl font-bold tracking-tight text-slate-300 sm:text-4xl md:text-5xl lg:text-6xl">
          Like a Pro
        </p>
      </div>

      <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-400 sm:text-xl md:text-2xl">
        Professional trimming in your browser. Fast, private, and free—your files never leave your device.
      </p>

      <div className="flex flex-wrap justify-center gap-3 pt-2">
        <Badge className="border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-400">
          No watermarks
        </Badge>
        <Badge className="border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
          Instant processing
        </Badge>
        <Badge className="border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm font-medium text-purple-400">
          100% private
        </Badge>
      </div>
    </div>
  );
};
