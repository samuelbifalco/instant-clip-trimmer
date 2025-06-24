
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
      const currentTime = video.currentTime;
      setCurrentTime(currentTime);
      
      // Enforce trim bounds - pause and reset if beyond end time
      if (currentTime >= trimEnd) {
        video.pause();
        video.currentTime = trimStart;
        setIsPlaying(false);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      video.currentTime = trimStart;
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
      const seekTime = value[0];
      // Enforce trim bounds when seeking
      if (seekTime < trimStart) {
        video.currentTime = trimStart;
        setCurrentTime(trimStart);
      } else if (seekTime > trimEnd) {
        video.currentTime = trimEnd;
        setCurrentTime(trimEnd);
      } else {
        video.currentTime = seekTime;
        setCurrentTime(seekTime);
      }
    } catch (err) {
      console.error('Seek error:', err);
    }
  }, [error, trimStart, trimEnd]);

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
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between bg-gradient-to-r from-slate-900/50 to-gray-900/50 rounded-2xl p-6 border border-cyan-500/20 backdrop-blur-sm">
        <Button
          variant="ghost"
          onClick={handleReset}
          className="text-white hover:text-cyan-400 hover:bg-cyan-500/10 border border-cyan-500/30 px-6 py-3 rounded-xl transition-all duration-300"
          aria-label="Go back to upload"
        >
          <ArrowLeft className="h-5 w-5 mr-3" />
          Back to Upload
        </Button>
        
        <div className="flex items-center space-x-6">
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 px-6 py-3 rounded-xl border border-blue-500/30">
            <span className="text-blue-300 font-medium">Original: {formatTime(duration)}</span>
          </div>
          <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 px-6 py-3 rounded-xl border border-green-500/30">
            <span className="text-green-300 font-medium">Trimmed: {formatTime(getTrimmedDuration())}</span>
          </div>
        </div>
      </div>

      {/* Video Player - Stunning Design */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl"></div>
        <Card className="relative bg-gradient-to-br from-slate-900/90 to-gray-900/90 border-2 border-cyan-500/30 rounded-3xl overflow-hidden backdrop-blur-sm">
          <CardContent className="p-0">
            <div className="relative bg-black rounded-3xl overflow-hidden">
              {isLoading && (
                <div className="absolute inset-0 bg-black/90 flex items-center justify-center z-10 rounded-3xl">
                  <div className="text-center space-y-6">
                    <div className="relative">
                      <Loader2 className="h-16 w-16 text-cyan-400 animate-spin mx-auto" />
                      <div className="absolute inset-0 h-16 w-16 rounded-full border-2 border-cyan-500/30 mx-auto animate-pulse"></div>
                    </div>
                    <p className="text-white text-xl font-medium">Loading your video...</p>
                  </div>
                </div>
              )}

              {buffering && !isLoading && (
                <div className="absolute top-6 left-6 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm text-cyan-300 px-4 py-2 rounded-full text-sm z-10 border border-cyan-500/30">
                  <Loader2 className="h-4 w-4 inline mr-2 animate-spin" />
                  Buffering...
                </div>
              )}

              <video
                ref={videoRef}
                src={videoUrl}
                className="w-full max-h-[70vh] object-contain rounded-3xl"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                preload="metadata"
                aria-label="Video player"
              />
              
              {/* Video Overlay Controls */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 hover:opacity-100 transition-all duration-300 flex items-center justify-center rounded-3xl">
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={togglePlayPause}
                  className="bg-gradient-to-r from-cyan-500/30 to-blue-500/30 backdrop-blur-sm text-white hover:from-cyan-500/50 hover:to-blue-500/50 w-20 h-20 rounded-full border border-cyan-500/50 transition-all duration-300 hover:scale-110"
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                  disabled={isLoading || !!error}
                >
                  {isPlaying ? <Pause className="h-10 w-10" /> : <Play className="h-10 w-10" />}
                </Button>
              </div>
              
              {/* Fullscreen button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleFullscreen}
                className="absolute top-6 right-6 bg-gradient-to-r from-gray-900/50 to-slate-900/50 backdrop-blur-sm text-white hover:text-cyan-400 border border-gray-600/50 hover:border-cyan-500/50 transition-all duration-300"
                aria-label="Toggle fullscreen"
              >
                <Maximize className="h-5 w-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Timeline and Controls - Beautiful Design */}
      <Card className="bg-gradient-to-br from-slate-900/80 to-gray-900/80 border-2 border-gray-700/50 backdrop-blur-sm rounded-2xl">
        <CardContent className="p-8 space-y-8">
          {/* Main Timeline */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-white">Playhead</span>
              <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 px-4 py-2 rounded-xl border border-cyan-500/30">
                <span className="text-cyan-300 font-mono text-lg">{formatTime(currentTime)}</span>
              </div>
            </div>
            <div className="relative">
              <Slider
                value={[currentTime]}
                onValueChange={handleSeek}
                max={duration}
                step={0.1}
                className="w-full h-3"
                aria-label="Video timeline"
                disabled={isLoading || !!error}
              />
            </div>
          </div>

          {/* Trim Controls */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-emerald-400">Start Time</span>
                <div className="bg-gradient-to-r from-emerald-500/20 to-green-500/20 px-4 py-2 rounded-xl border border-emerald-500/30">
                  <span className="text-emerald-300 font-mono text-lg">{formatTime(trimStart)}</span>
                </div>
              </div>
              <div className="relative">
                <Slider
                  value={[trimStart]}
                  onValueChange={handleTrimStartChange}
                  max={trimEnd - 0.1}
                  step={0.1}
                  className="w-full h-3"
                  aria-label="Trim start time"
                  disabled={isLoading || !!error}
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-rose-400">End Time</span>
                <div className="bg-gradient-to-r from-rose-500/20 to-red-500/20 px-4 py-2 rounded-xl border border-rose-500/30">
                  <span className="text-rose-300 font-mono text-lg">{formatTime(trimEnd)}</span>
                </div>
              </div>
              <div className="relative">
                <Slider
                  value={[trimEnd]}
                  onValueChange={handleTrimEndChange}
                  min={trimStart + 0.1}
                  max={duration}
                  step={0.1}
                  className="w-full h-3"
                  aria-label="Trim end time"
                  disabled={isLoading || !!error}
                />
              </div>
            </div>
          </div>

          {/* Playback Controls - Beautiful Layout */}
          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="lg"
                onClick={skipBackward}
                className="text-white hover:text-cyan-400 hover:bg-cyan-500/10 border border-gray-600/50 hover:border-cyan-500/50 rounded-xl px-4 py-3 transition-all duration-300"
                aria-label="Skip backward 10 seconds"
                disabled={isLoading || !!error}
              >
                <SkipBack className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="lg"
                onClick={togglePlayPause}
                className="text-white hover:text-cyan-400 hover:bg-cyan-500/10 border border-gray-600/50 hover:border-cyan-500/50 rounded-xl px-6 py-3 transition-all duration-300"
                aria-label={isPlaying ? "Pause" : "Play"}
                disabled={isLoading || !!error}
              >
                {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
              </Button>
              <Button
                variant="ghost"
                size="lg"
                onClick={skipForward}
                className="text-white hover:text-cyan-400 hover:bg-cyan-500/10 border border-gray-600/50 hover:border-cyan-500/50 rounded-xl px-4 py-3 transition-all duration-300"
                aria-label="Skip forward 10 seconds"
                disabled={isLoading || !!error}
              >
                <SkipForward className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="lg"
                onClick={toggleMute}
                className="text-white hover:text-cyan-400 hover:bg-cyan-500/10 border border-gray-600/50 hover:border-cyan-500/50 rounded-xl px-4 py-3 transition-all duration-300"
                aria-label={isMuted ? "Unmute" : "Mute"}
                disabled={isLoading || !!error}
              >
                {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </Button>
              <div className="w-32">
                <Slider
                  value={[volume]}
                  onValueChange={handleVolumeChange}
                  max={100}
                  step={1}
                  className="w-full h-2"
                  aria-label="Volume control"
                  disabled={isLoading || !!error || isMuted}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons - Stunning Design */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-6 pt-4">
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
          className="border-2 border-gray-600/50 text-white hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-cyan-500/10 rounded-xl px-8 py-4 text-lg font-medium transition-all duration-300"
          disabled={isLoading || !!error}
        >
          <RotateCcw className="h-5 w-5 mr-3" />
          Reset Trim
        </Button>
        
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-blue-500/20 rounded-2xl blur-lg"></div>
          <Button
            onClick={handleExport}
            className="relative bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-bold px-12 py-4 text-lg rounded-2xl shadow-2xl border border-emerald-500/50 transition-all duration-300 hover:scale-105"
            disabled={isLoading || !!error || getTrimmedDuration() < 0.1}
          >
            <Download className="h-6 w-6 mr-3" />
            Export Trimmed Video
          </Button>
        </div>
      </div>

      {/* Keyboard Shortcuts - Beautiful Info */}
      <Card className="bg-gradient-to-r from-slate-900/50 to-gray-900/50 border border-gray-700/50 backdrop-blur-sm rounded-2xl">
        <CardContent className="p-6">
          <p className="text-center text-gray-300 text-lg">
            Keyboard shortcuts: 
            <kbd className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 px-3 py-2 rounded-lg text-cyan-300 mx-2 border border-cyan-500/30">Space</kbd> Play/Pause
            <kbd className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 px-3 py-2 rounded-lg text-cyan-300 mx-2 border border-cyan-500/30">←/→</kbd> Skip
            <kbd className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 px-3 py-2 rounded-lg text-cyan-300 mx-2 border border-cyan-500/30">M</kbd> Mute
            <kbd className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 px-3 py-2 rounded-lg text-cyan-300 mx-2 border border-cyan-500/30">F</kbd> Fullscreen
          </p>
        </CardContent>
      </Card>

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
