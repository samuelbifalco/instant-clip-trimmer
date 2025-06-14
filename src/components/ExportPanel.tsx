
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { X, Download, Settings, Sparkles } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ExportPanelProps {
  startTime: number;
  endTime: number;
  videoFile: File;
  onClose: () => void;
}

export const ExportPanel = ({ startTime, endTime, videoFile, onClose }: ExportPanelProps) => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [quality, setQuality] = useState("high");
  const [format, setFormat] = useState("mp4");

  const handleExport = async () => {
    setIsExporting(true);
    setExportProgress(0);

    // Simulate export progress
    const progressInterval = setInterval(() => {
      setExportProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsExporting(false);
          toast({
            title: "Export Complete!",
            description: "Your trimmed video is ready for download.",
          });
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    // In a real implementation, this would use FFmpeg.wasm
    // For now, we'll simulate the process
  };

  const duration = endTime - startTime;
  const estimatedSize = Math.round((videoFile.size * (duration / 60)) / (1024 * 1024));

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg max-w-md w-full p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Export Video</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {!isExporting ? (
          <>
            {/* Export Settings */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Quality</label>
                <Select value={quality} onValueChange={setQuality}>
                  <SelectTrigger className="w-full bg-gray-700 border-gray-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High (Original)</SelectItem>
                    <SelectItem value="medium">Medium (720p)</SelectItem>
                    <SelectItem value="low">Low (480p)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Format</label>
                <Select value={format} onValueChange={setFormat}>
                  <SelectTrigger className="w-full bg-gray-700 border-gray-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mp4">MP4 (Recommended)</SelectItem>
                    <SelectItem value="webm">WebM</SelectItem>
                    <SelectItem value="avi">AVI</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Export Info */}
            <div className="bg-gray-700 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Duration:</span>
                <span>{Math.round(duration)}s</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Estimated Size:</span>
                <span>{estimatedSize}MB</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Format:</span>
                <span>{format.toUpperCase()}</span>
              </div>
            </div>

            {/* AI Enhancement Suggestion */}
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Sparkles className="h-5 w-5 text-purple-400 mt-0.5" />
                <div>
                  <h4 className="font-medium text-purple-300">AI Enhancement Available</h4>
                  <p className="text-sm text-gray-300 mt-1">
                    Let AI auto-detect the best highlight moments in your video
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 border-purple-500/50 text-purple-300 hover:bg-purple-500/10"
                  >
                    Enable AI Assist
                  </Button>
                </div>
              </div>
            </div>

            <Button 
              onClick={handleExport}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              <Download className="mr-2 h-4 w-4" />
              Start Export
            </Button>
          </>
        ) : (
          /* Export Progress */
          <div className="space-y-6 text-center">
            <div className="space-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto">
                <Settings className="h-8 w-8 text-white animate-spin" />
              </div>
              <h4 className="text-lg font-medium">Processing Your Video</h4>
              <p className="text-sm text-gray-400">This may take a few moments...</p>
            </div>

            <div className="space-y-2">
              <Progress value={exportProgress} className="w-full" />
              <p className="text-sm text-gray-400">{exportProgress}% complete</p>
            </div>

            {exportProgress === 100 && (
              <Button 
                onClick={onClose}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Video
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
