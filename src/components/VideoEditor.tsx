
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Scissors, 
  Download, 
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize,
  ArrowLeft
} from "lucide-react";
import { VideoControls } from "./VideoControls";
import { ExportPanel } from "./ExportPanel";
import { toast } from "@/hooks/use-toast";

interface VideoEditorProps {
  videoFile: File;
  videoUrl: string;
  onReset: () => void;
}

export const VideoEditor = ({ videoFile, videoUrl, onReset }: VideoEditorProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [trimStart, setTrimStart] = useState(0);
  const [trimEnd, setTrimEnd] = useState(0);
  const [volume, setVolume] = useState(100);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showExportPanel, setShowExportPanel] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleLoadedMetadata = () => {
        setDuration(video.duration);
        setTrimEnd(video.duration);
      };

      const handleTimeUpdate = () => {
        setCurrentTime(video.currentTime);
      };

      const handleEnded = () => {
        setIsPlaying(false);
        if (video.currentTime >= trimEnd) {
          video.currentTime = trimStart;
        }
      };

      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      video.addEventListener('timeupdate', handleTimeUpdate);
      video.addEventListener('ended', handleEnded);

      return () => {
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
        video.removeEventListener('timeupdate', handleTimeUpdate);
        video.removeEventListener('ended', handleEnded);
      };
    }
  }, [trimStart, trimEnd]);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (value: number[]) => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const handleTrimStartChange = (value: number[]) => {
    const newStart = value[0];
    setTrimStart(newStart);
    if (currentTime < newStart) {
      const video = videoRef.current;
      if (video) {
        video.currentTime = newStart;
      }
    }
  };

  const handleTrimEndChange = (value: number[]) => {
    const newEnd = value[0];
    setTrimEnd(newEnd);
    if (currentTime > newEnd) {
      const video = videoRef.current;
      if (video) {
        video.currentTime = newEnd;
      }
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const video = videoRef.current;
    const newVolume = value[0];
    setVolume(newVolume);
    if (video) {
      video.volume = newVolume / 100;
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const skipBackward = () => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = Math.max(trimStart, video.currentTime - 10);
    }
  };

  const skipForward = () => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = Math.min(trimEnd, video.currentTime + 10);
    }
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (video) {
      if (!isFullscreen) {
        video.requestFullscreen();
        setIsFullscreen(true);
      } else {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getTrimmedDuration = () => {
    return trimEnd - trimStart;
  };

  const handleExport = () => {
    setShowExportPanel(true);
    toast({
      title: "Preparing export...",
      description: "Setting up your trimmed video for download.",
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={onReset}
          className="text-gray-300 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Upload
        </Button>
        
        <div className="flex items-center space-x-4">
          <Badge variant="secondary" className="bg-blue-500/20 text-blue-300">
            Original: {formatTime(duration)}
          </Badge>
          <Badge variant="secondary" className="bg-green-500/20 text-green-300">
            Trimmed: {formatTime(getTrimmedDuration())}
          </Badge>
        </div>
      </div>

      {/* Video Player */}
      <Card className="bg-gray-800 border-gray-700 overflow-hidden">
        <CardContent className="p-0">
          <div className="relative bg-black rounded-lg overflow-hidden">
            <video
              ref={videoRef}
              src={videoUrl}
              className="w-full max-h-[60vh] object-contain"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
            
            {/* Video Overlay Controls */}
            <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button
                variant="ghost"
                size="lg"
                onClick={togglePlayPause}
                className="bg-black/50 text-white hover:bg-black/70 w-16 h-16 rounded-full"
              >
                {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
              </Button>
            </div>
            
            {/* Fullscreen button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleFullscreen}
              className="absolute top-4 right-4 bg-black/50 text-white hover:bg-black/70"
            >
              <Maximize className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Timeline and Controls */}
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-6 space-y-6">
          {/* Main Timeline */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-300">Playhead</span>
              <span className="text-sm text-gray-400">{formatTime(currentTime)}</span>
            </div>
            <Slider
              value={[currentTime]}
              onValueChange={handleSeek}
              max={duration}
              step={0.1}
              className="w-full"
            />
          </div>

          {/* Trim Controls */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-green-400">Start Time</span>
                <span className="text-sm text-gray-400">{formatTime(trimStart)}</span>
              </div>
              <Slider
                value={[trimStart]}
                onValueChange={handleTrimStartChange}
                max={trimEnd - 0.1}
                step={0.1}
                className="w-full"
              />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-red-400">End Time</span>
                <span className="text-sm text-gray-400">{formatTime(trimEnd)}</span>
              </div>
              <Slider
                value={[trimEnd]}
                onValueChange={handleTrimEndChange}
                min={trimStart + 0.1}
                max={duration}
                step={0.1}
                className="w-full"
              />
            </div>
          </div>

          {/* Playback Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={skipBackward}
                className="text-gray-300 hover:text-white"
              >
                <SkipBack className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={togglePlayPause}
                className="text-gray-300 hover:text-white"
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={skipForward}
                className="text-gray-300 hover:text-white"
              >
                <SkipForward className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMute}
                className="text-gray-300 hover:text-white"
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
              <Slider
                value={[volume]}
                onValueChange={handleVolumeChange}
                max={100}
                step={1}
                className="w-20"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          onClick={() => {
            setTrimStart(0);
            setTrimEnd(duration);
            toast({
              title: "Reset successful!",
              description: "Trim points have been reset to full video length.",
            });
          }}
          variant="outline"
          className="border-gray-600 text-gray-300 hover:bg-gray-700"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset Trim
        </Button>
        
        <Button
          onClick={handleExport}
          className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold px-8"
        >
          <Download className="h-4 w-4 mr-2" />
          Export Trimmed Video
        </Button>
      </div>

      {/* Export Panel */}
      {showExportPanel && (
        <ExportPanel 
          videoFile={videoFile}
          trimStart={trimStart}
          trimEnd={trimEnd}
          onClose={() => setShowExportPanel(false)}
        />
      )}
    </div>
  );
};
