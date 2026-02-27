import { useState } from "react";
import { Link2, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

export const UrlInputCard = () => {
  const [urlInput, setUrlInput] = useState("");

  const handleUrlSubmit = () => {
    if (!urlInput.trim()) return;
    toast({
      title: "URL support coming soon",
      description: "YouTube, Vimeo, and direct video links will be supported in a future update. Use file upload for now.",
    });
  };

  return (
    <Card className="overflow-hidden border border-white/10 bg-slate-800/50 backdrop-blur-sm transition-all hover:border-purple-500/30">
      <CardContent className="p-0">
        <div className="border-b border-white/10 p-6 sm:p-8">
          <h3 className="mb-1 flex items-center gap-3 text-xl font-bold text-white sm:text-2xl">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/20">
              <Link2 className="h-5 w-5 text-purple-400 sm:h-6 sm:w-6" />
            </span>
            Paste Video URL
          </h3>
          <p className="text-slate-400">YouTube, Vimeo, or direct video link</p>
        </div>
        <div className="space-y-6 p-8 sm:p-12">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-purple-500/10 sm:h-24 sm:w-24">
            <Play className="h-10 w-10 text-purple-400 sm:h-12 sm:w-12" />
          </div>
          <div className="space-y-4">
            <Input
              type="url"
              placeholder="https://youtube.com/watch?v=..."
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              className="h-12 border-white/10 bg-white/5 text-white placeholder:text-slate-500 focus-visible:ring-cyan-500 sm:h-14 sm:text-base"
            />
            <Button
              size="lg"
              onClick={handleUrlSubmit}
              className="h-12 w-full bg-gradient-to-r from-purple-500 to-pink-500 font-semibold text-white hover:from-purple-600 hover:to-pink-600 sm:h-14"
            >
              Load from URL (coming soon)
            </Button>
          </div>
          <div className="text-center">
            <Badge variant="outline" className="border-amber-500/40 bg-amber-500/10 px-3 py-1.5 text-amber-400">
              Coming soon
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
