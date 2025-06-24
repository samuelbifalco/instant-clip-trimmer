
import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Download, 
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize,
  ArrowLeft,
  AlertCircle,
  Loader2
} from "lucide-react";
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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [buffering, setBuffering] = useState(false);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;
      
      switch (e.code) {
        case 'Space':
          e.preventDefault();
          togglePlayPause();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          skipBackward();
          break;
        case 'ArrowRight':
          e.preventDefault();
          skipForward();
          break;
        case 'KeyM':
          e.preventDefault();
          toggleMute();
          break;
        case 'KeyF':
          e.preventDefault();
          toggleFullscreen();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      console.log('Video metadata loaded', { duration: video.duration });
      setDuration(video.duration);
      setTrimEnd(video.duration);
      setIsLoading(false);
      setError(null);
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

    const handleError = (e: Event) => {
      console.error('Video error:', e);
      setError('Failed to load video. Please try a different file.');
      setIsLoading(false);
    };

    const handleWaiting = () => {
      setBuffering(true);
    };

    const handleCanPlay = () => {
      setBuffering(false);
    };

    const handleLoadStart = () => {
      setIsLoading(true);
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('error', handleError);
    video.addEventListener('waiting', handleWaiting);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('loadstart', handleLoadStart);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('error', handleError);
      video.removeEventListener('waiting', handleWaiting);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('loadstart', handleLoadStart);
    };
  }, [trimStart, trimEnd, videoUrl]);

  const togglePlayPause = useCallback(() => {
    const video = videoRef.current;
    if (!video || error) return;

    try {
      if (isPlaying) {
        video.pause();
      } else {
        video.play().catch(err => {
          console.error('Play failed:', err);
          toast({
            title: "Playback Error",
            description: "Unable to play video. Please try again.",
            variant: "destructive",
          });
        });
      }
      setIsPlaying(!isPlaying);
    } catch (err) {
      console.error('Toggle play/pause error:', err);
    }
  }, [isPlaying, error]);

  const handleSeek = useCallback((value: number[]) => {
    const video = videoRef.current;
    if (!video || error) return;

    try {
      video.currentTime = value[0];
      setCurrentTime(value[0]);
    } catch (err) {
      console.error('Seek error:', err);
    }
  }, [error]);

  const handleTrimStartChange = useCallback((value: number[]) => {
    const newStart = value[0];
    setTrimStart(newStart);
    
    if (currentTime < newStart) {
      const video = videoRef.current;
      if (video) {
        video.currentTime = newStart;
      }
    }
  }, [currentTime]);

  const handleTrimEndChange = useCallback((value: number[]) => {
    const newEnd = value[0];
    setTrimEnd(newEnd);
    
    if (currentTime > newEnd) {
      const video = videoRef.current;
      if (video) {
        video.currentTime = newEnd;
      }
    }
  }, [currentTime]);

  const handleVolumeChange = useCallback((value: number[]) => {
    const video = videoRef.current;
    const newVolume = value[0];
    setVolume(newVolume);
    
    if (video) {
      video.volume = newVolume / 100;
    }
  }, []);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !isMuted;
    setIsMuted(!isMuted);
  }, [isMuted]);

  const skipBackward = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = Math.max(trimStart, video.currentTime - 10);
  }, [trimStart]);

  const skipForward = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = Math.min(trimEnd, video.currentTime + 10);
  }, [trimEnd]);

  const toggleFullscreen = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    try {
      if (!isFullscreen) {
        if (video.requestFullscreen) {
          video.requestFullscreen();
          setIsFullscreen(true);
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
          setIsFullscreen(false);
        }
      }
    } catch (err) {
      console.error('Fullscreen error:', err);
    }
  }, [isFullscreen]);

  const formatTime = (time: number) => {
    if (!isFinite(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getTrimmedDuration = () => {
    return Math.max(0, trimEnd - trimStart);
  };

  const handleExport = () => {
    if (getTrimmedDuration() < 0.1) {
      toast({
        title: "Invalid trim selection",
        description: "Please select a valid time range to trim.",
        variant: "destructive",
      });
      return;
    }

    setShowExportPanel(true);
    toast({
      title: "Preparing export...",
      description: "Setting up your trimmed video for download.",
    });
  };

  const handleReset = () => {
    try {
      // Clean up video URL to prevent memory leaks
      if (videoUrl.startsWith('blob:')) {
        URL.revokeObjectURL(videoUrl);
      }
      onReset();
    } catch (err) {
      console.error('Reset error:', err);
      onReset(); // Still call reset even if cleanup fails
    }
  };

  if (error) {
    return (
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={handleReset}
            className="text-gray-300 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Upload
          </Button>
        </div>

        <Card className="bg-red-900/20 border-red-700/50">
          <CardContent className="p-12 text-center space-y-4">
            <AlertCircle className="h-16 w-16 text-red-400 mx-auto" />
            <h3 className="text-2xl font-bold text-white">Video Loading Error</h3>
            <p className="text-red-200">{error}</p>
            <Button onClick={handleReset} variant="outline" className="mt-4">
              Try Another Video
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={handleReset}
          className="text-gray-300 hover:text-white"
          aria-label="Go back to upload"
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

      {/* Keyboard shortcuts hint */}
      <Card className="bg-gray-800/50 border-gray-700/50">
        <CardContent className="p-4">
          <p className="text-sm text-gray-400 text-center">
            Keyboard shortcuts: <kbd className="bg-gray-700 px-2 py-1 rounded text-xs">Space</kbd> Play/Pause • 
            <kbd className="bg-gray-700 px-2 py-1 rounded text-xs ml-2">←/→</kbd> Skip • 
            <kbd className="bg-gray-700 px-2 py-1 rounded text-xs ml-2">M</kbd> Mute • 
            <kbd className="bg-gray-700 px-2 py-1 rounded text-xs ml-2">F</kbd> Fullscreen
          </p>
        </CardContent>
      </Card>

      {/* Video Player */}
      <Card className="bg-gray-800 border-gray-700 overflow-hidden">
        <CardContent className="p-0">
          <div className="relative bg-black rounded-lg overflow-hidden">
            {isLoading && (
              <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-10">
                <div className="text-center space-y-4">
                  <Loader2 className="h-12 w-12 text-blue-400 animate-spin mx-auto" />
                  <p className="text-white text-lg">Loading video...</p>
                </div>
              </div>
            )}

            {buffering && !isLoading && (
              <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm z-10">
                <Loader2 className="h-4 w-4 inline mr-2 animate-spin" />
                Buffering...
              </div>
            )}

            <video
              ref={videoRef}
              src={videoUrl}
              className="w-full max-h-[60vh] object-contain"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              preload="metadata"
              aria-label="Video player"
            />
            
            {/* Video Overlay Controls */}
            <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button
                variant="ghost"
                size="lg"
                onClick={togglePlayPause}
                className="bg-black/50 text-white hover:bg-black/70 w-16 h-16 rounded-full"
                aria-label={isPlaying ? "Pause video" : "Play video"}
                disabled={isLoading || !!error}
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
              aria-label="Toggle fullscreen"
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
              aria-label="Video timeline"
              disabled={isLoading || !!error}
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
                aria-label="Trim start time"
                disabled={isLoading || !!error}
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
                aria-label="Trim end time"
                disabled={isLoading || !!error}
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
                aria-label="Skip backward 10 seconds"
                disabled={isLoading || !!error}
              >
                <SkipBack className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={togglePlayPause}
                className="text-gray-300 hover:text-white"
                aria-label={isPlaying ? "Pause" : "Play"}
                disabled={isLoading || !!error}
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={skipForward}
                className="text-gray-300 hover:text-white"
                aria-label="Skip forward 10 seconds"
                disabled={isLoading || !!error}
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
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
              <Slider
                value={[volume]}
                onValueChange={handleVolumeChange}
                max={100}
                step={1}
                className="w-20"
                aria-label="Volume control"
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
          disabled={isLoading || !!error}
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset Trim
        </Button>
        
        <Button
          onClick={handleExport}
          className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold px-8"
          disabled={isLoading || !!error || getTrimmedDuration() < 0.1}
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
