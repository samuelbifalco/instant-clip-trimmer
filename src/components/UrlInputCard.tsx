
import { useState } from "react";
import { Link, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

export const UrlInputCard = () => {
  const [urlInput, setUrlInput] = useState("");

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      toast({
        title: "URL support coming soon! 🚀",
        description: "We're working on adding support for YouTube, Vimeo and other video platforms.",
      });
    }
  };

  return (
    <Card className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-gray-700/50 backdrop-blur-sm overflow-hidden hover:border-gray-600/50 transition-all duration-300">
      <CardContent className="p-0">
        <div className="p-8 border-b border-gray-700/50">
          <h3 className="text-2xl font-bold flex items-center text-white mb-2">
            <Link className="mr-4 h-8 w-8 text-purple-400" />
            Paste Video URL
          </h3>
          <p className="text-gray-400 text-lg">YouTube, Vimeo, and direct links</p>
        </div>
        
        <div className="p-12 space-y-8">
          <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto">
            <Play className="h-12 w-12 text-purple-400" />
          </div>
          
          <div className="space-y-6">
            <Input
              type="url"
              placeholder="https://youtube.com/watch?v=..."
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              className="bg-gray-700/50 border-gray-600/50 text-white placeholder-gray-400 h-14 text-lg"
            />
            <Button 
              onClick={handleUrlSubmit}
              size="lg"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 h-14 text-lg font-semibold"
              disabled
            >
              Coming Soon - Load from URL
            </Button>
          </div>
          
          <div className="text-center">
            <Badge variant="outline" className="border-yellow-500/30 text-yellow-400 px-4 py-2">
              🚧 Feature in development
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
