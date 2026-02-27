import { Zap, Scissors, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const FeaturesSection = () => {
  return (
    <Card className="mb-20 overflow-hidden border border-white/10 bg-slate-800/50 backdrop-blur-sm sm:mb-28">
      <CardContent className="p-8 sm:p-12 lg:p-16">
        <div className="mb-12 text-center sm:mb-16">
          <h2 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Why Choose ClipCut?
          </h2>
          <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500" />
        </div>
        <div className="grid gap-10 md:grid-cols-3 md:gap-8 lg:gap-12">
          <div className="group text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10 transition-transform duration-300 group-hover:scale-105">
              <Zap className="h-10 w-10 text-emerald-400" />
            </div>
            <h3 className="mt-6 text-xl font-bold text-white">Lightning Fast</h3>
            <p className="mt-3 text-slate-400 leading-relaxed">
              Process videos in your browser with no upload wait. Smooth, real-time editing.
            </p>
          </div>
          <div className="group text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border border-blue-500/30 bg-blue-500/10 transition-transform duration-300 group-hover:scale-105">
              <Shield className="h-10 w-10 text-blue-400" />
            </div>
            <h3 className="mt-6 text-xl font-bold text-white">100% Private</h3>
            <p className="mt-3 text-slate-400 leading-relaxed">
              Everything runs locally. Your videos never leave your device.
            </p>
          </div>
          <div className="group text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border border-purple-500/30 bg-purple-500/10 transition-transform duration-300 group-hover:scale-105">
              <Scissors className="h-10 w-10 text-purple-400" />
            </div>
            <h3 className="mt-6 text-xl font-bold text-white">Precision Trimming</h3>
            <p className="mt-3 text-slate-400 leading-relaxed">
              Intuitive timeline with start/end sliders. Pro-grade trimming made simple.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
