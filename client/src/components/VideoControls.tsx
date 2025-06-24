
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";

interface VideoControlsProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  currentTime: number;
  duration: number;
}

export const VideoControls = ({
  videoRef,
  isPlaying,
  setIsPlaying,
  currentTime,
  duration
}: VideoControlsProps) => {
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
    }
  };

  const skipBackward = () => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = Math.max(0, video.currentTime - 10);
    }
  };

  const skipForward = () => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = Math.min(duration, video.currentTime + 10);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-3">
      {/* Progress bar */}
      <Slider
        value={[currentTime]}
        onValueChange={handleSeek}
        max={duration}
        step={0.1}
        className="w-full"
      />
      
      {/* Controls */}
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
        
        <div className="text-sm text-gray-400">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
        
        <div className="flex items-center space-x-2">
          <Volume2 className="h-4 w-4 text-gray-400" />
          <Slider
            defaultValue={[100]}
            max={100}
            step={1}
            className="w-20"
          />
        </div>
      </div>
    </div>
  );
};
