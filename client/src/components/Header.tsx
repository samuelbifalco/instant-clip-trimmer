import { Scissors, Zap, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-900/80 backdrop-blur-xl shadow-lg">
      <div className="container mx-auto px-4 py-4 sm:py-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-3 group">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 shadow-lg shadow-cyan-500/20 transition-transform group-hover:scale-105">
              <Scissors className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">ClipCut</h1>
              <p className="text-xs font-medium text-cyan-400/90 sm:text-sm">Professional Video Trimmer</p>
            </div>
          </a>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <Badge variant="secondary" className="border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-sm font-medium text-emerald-400">
              <Zap className="mr-1.5 h-3.5 w-3.5" />
              100% Free
            </Badge>
            <Badge variant="secondary" className="hidden border-blue-500/30 bg-blue-500/10 px-3 py-1.5 text-sm font-medium text-blue-400 sm:inline-flex">
              <Shield className="mr-1.5 h-3.5 w-3.5" />
              Private & Secure
            </Badge>
          </div>
        </div>
      </div>
    </header>
  );
};
