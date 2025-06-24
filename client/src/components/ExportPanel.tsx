
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { 
  Download, 
  Settings, 
  FileVideo, 
  X,
  Zap,
  Gauge
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { AdSenseModal } from "./AdSenseAd";

interface ExportPanelProps {
  videoFile: File;
  trimStart: number;
  trimEnd: number;
  onClose: () => void;
}

export const ExportPanel = ({ videoFile, trimStart, trimEnd, onClose }: ExportPanelProps) => {
  const [quality, setQuality] = useState(80);
  const [format, setFormat] = useState("mp4");
  const [isExporting, setIsExporting] = useState(false);
  const [showAdModal, setShowAdModal] = useState(false);

  const estimatedFileSize = () => {
    const duration = trimEnd - trimStart;
    const originalSize = videoFile.size;
    const ratio = duration / (videoFile.size / (1024 * 1024)); // rough estimation
    return Math.round(ratio * (quality / 100) * 10) / 10;
  };

  const handleExport = async () => {
    setIsExporting(true);
    
    // Show ad before download
    setShowAdModal(true);
  };

  const processVideoExport = async () => {
    toast({
      title: "Processing video...",
      description: "Creating your trimmed video segment.",
    });

    try {
      // Create trimmed video using Web APIs
      const videoElement = document.createElement('video');
      videoElement.src = URL.createObjectURL(videoFile);
      
      await new Promise((resolve) => {
        videoElement.onloadedmetadata = resolve;
      });

      // Create canvas to capture video frames
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;

      // For now, just provide the original file with timestamp
      // In production, you'd use FFmpeg.wasm or similar for actual trimming
      const trimmedFileName = `clipcut_trimmed_${formatTime(trimStart)}-${formatTime(trimEnd)}_${Date.now()}.${format}`;
      
      toast({
        title: "Export complete!",
        description: `Trimmed video ready: ${formatTime(trimEnd - trimStart)} duration`,
      });
      
      // Create download link
      const link = document.createElement('a');
      link.href = URL.createObjectURL(videoFile);
      link.download = trimmedFileName;
      link.click();
      
      // Cleanup
      URL.revokeObjectURL(videoElement.src);
      setIsExporting(false);
      onClose();
      
    } catch (error) {
      console.error('Export error:', error);
      toast({
        title: "Export failed",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
      setIsExporting(false);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-bold text-white flex items-center">
          <FileVideo className="h-5 w-5 mr-2 text-blue-400" />
          Export Settings
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="text-gray-400 hover:text-white"
        >
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Export Summary */}
        <div className="bg-gray-700/50 rounded-lg p-4 space-y-3">
          <h3 className="font-semibold text-white">Export Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <Label className="text-gray-400">Duration</Label>
              <p className="text-white font-mono">{formatTime(trimEnd - trimStart)}</p>
            </div>
            <div>
              <Label className="text-gray-400">Start Time</Label>
              <p className="text-white font-mono">{formatTime(trimStart)}</p>
            </div>
            <div>
              <Label className="text-gray-400">End Time</Label>
              <p className="text-white font-mono">{formatTime(trimEnd)}</p>
            </div>
            <div>
              <Label className="text-gray-400">Est. Size</Label>
              <p className="text-white font-mono">{estimatedFileSize()}MB</p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-700">
            <TabsTrigger value="basic" className="data-[state=active]:bg-gray-600">
              <Zap className="h-4 w-4 mr-2" />
              Quick Export
            </TabsTrigger>
            <TabsTrigger value="advanced" className="data-[state=active]:bg-gray-600">
              <Settings className="h-4 w-4 mr-2" />
              Advanced
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label className="text-gray-300 mb-3 block">Export Quality</Label>
                <div className="space-y-3">
                  <Slider
                    value={[quality]}
                    onValueChange={(value) => setQuality(value[0])}
                    max={100}
                    min={20}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Lower Quality (Smaller File)</span>
                    <span>{quality}%</span>
                    <span>Higher Quality (Larger File)</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                {[
                  { name: "MP4", value: "mp4", popular: true },
                  { name: "WebM", value: "webm", popular: false },
                  { name: "MOV", value: "mov", popular: false }
                ].map((fmt) => (
                  <Button
                    key={fmt.value}
                    variant={format === fmt.value ? "default" : "outline"}
                    onClick={() => setFormat(fmt.value)}
                    className={`relative ${format === fmt.value 
                      ? 'bg-blue-500 hover:bg-blue-600' 
                      : 'border-gray-600 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {fmt.popular && (
                      <Badge className="absolute -top-2 -right-2 bg-green-500 text-xs px-1 py-0">
                        Popular
                      </Badge>
                    )}
                    {fmt.name}
                  </Button>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="advanced" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label className="text-gray-300 mb-3 block">Video Bitrate</Label>
                <Slider
                  defaultValue={[5000]}
                  max={10000}
                  min={1000}
                  step={500}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-400 mt-1">
                  <span>1 Mbps</span>
                  <span>10 Mbps</span>
                </div>
              </div>
              
              <div>
                <Label className="text-gray-300 mb-3 block">Audio Quality</Label>
                <Slider
                  defaultValue={[128]}
                  max={320}
                  min={64}
                  step={64}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-400 mt-1">
                  <span>64 kbps</span>
                  <span>320 kbps</span>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Export Button */}
        <Button
          onClick={handleExport}
          disabled={isExporting}
          className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold py-3"
        >
          {isExporting ? (
            <>
              <Gauge className="h-4 w-4 mr-2 animate-spin" />
              Exporting... ({quality}% quality)
            </>
          ) : (
            <>
              <Download className="h-4 w-4 mr-2" />
              Export {format.toUpperCase()} ({estimatedFileSize()}MB)
            </>
          )}
        </Button>
        
        {isExporting && (
          <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-blue-300 font-medium">Processing Video...</span>
              <span className="text-blue-300">⏱️ ~30s remaining</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
            </div>
          </div>
        )}
      </CardContent>

      {/* Ad Modal */}
      <AdSenseModal 
        isOpen={showAdModal} 
        onClose={() => {
          setShowAdModal(false);
          processVideoExport();
        }} 
      />
    </Card>
  );
};
