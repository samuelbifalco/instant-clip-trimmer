
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { VideoControls } from "@/components/VideoControls";
import { ExportPanel } from "@/components/ExportPanel";
import { ArrowLeft, Download } from "lucide-react";

interface VideoEditorProps {
  videoFile: File;
  videoUrl: string;
  onReset: () => void;
}

export const VideoEditor = ({ videoFile, videoUrl, onReset }: VideoEditorProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showExportPanel, setShowExportPanel] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleLoadedMetadata = () => {
        setDuration(video.duration);
        setEndTime(video.duration);
      };

      const handleTimeUpdate = () => {
        setCurrentTime(video.currentTime);
      };

      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      video.addEventListener('timeupdate', handleTimeUpdate);

      return () => {
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
        video.removeEventListener('timeupdate', handleTimeUpdate);
      };
    }
  }, []);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleStartTimeChange = (value: number[]) => {
    const newStart = value[0];
    setStartTime(newStart);
    if (newStart >= endTime) {
      setEndTime(Math.min(newStart + 1, duration));
    }
  };

  const handleEndTimeChange = (value: number[]) => {
    const newEnd = value[0];
    setEndTime(newEnd);
    if (newEnd <= startTime) {
      setStartTime(Math.max(newEnd - 1, 0));
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={onReset}
          className="border-gray-600 text-gray-300 hover:bg-gray-700"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Upload
        </Button>
        <Button
          onClick={() => setShowExportPanel(true)}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
        >
          <Download className="mr-2 h-4 w-4" />
          Export Video
        </Button>
      </div>

      {/* Video Player */}
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="aspect-video bg-black rounded-lg mb-4 flex items-center justify-center overflow-hidden">
          <video
            ref={videoRef}
            src={videoUrl}
            className="max-w-full max-h-full"
            controls={false}
          />
        </div>
        
        <VideoControls
          videoRef={videoRef}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          currentTime={currentTime}
          duration={duration}
        />
      </div>

      {/* Timeline Editor */}
      <div className="bg-gray-800 rounded-lg p-6 space-y-6">
        <h3 className="text-xl font-semibold">Timeline Editor</h3>
        
        {/* Main Timeline */}
        <div className="space-y-4">
          <div className="relative">
            <div className="h-16 bg-gray-700 rounded relative overflow-hidden">
              {/* Video thumbnail strip would go here in full implementation */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20" />
              
              {/* Trim indicators */}
              <div 
                className="absolute top-0 bottom-0 bg-blue-500/50 border-l-2 border-blue-400"
                style={{ left: `${(startTime / duration) * 100}%` }}
              />
              <div 
                className="absolute top-0 bottom-0 bg-blue-500/50 border-r-2 border-blue-400"
                style={{ left: `${(endTime / duration) * 100}%` }}
              />
              
              {/* Current time indicator */}
              <div 
                className="absolute top-0 bottom-0 w-0.5 bg-white"
                style={{ left: `${(currentTime / duration) * 100}%` }}
              />
            </div>
          </div>

          {/* Time markers */}
          <div className="flex justify-between text-xs text-gray-400">
            <span>0:00</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Trim Controls */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="text-sm font-medium">Start Time: {formatTime(startTime)}</label>
            <Slider
              value={[startTime]}
              onValueChange={handleStartTimeChange}
              max={duration}
              step={0.1}
              className="w-full"
            />
          </div>
          <div className="space-y-3">
            <label className="text-sm font-medium">End Time: {formatTime(endTime)}</label>
            <Slider
              value={[endTime]}
              onValueChange={handleEndTimeChange}
              max={duration}
              step={0.1}
              className="w-full"
            />
          </div>
        </div>

        {/* Trim Info */}
        <div className="bg-gray-700 rounded-lg p-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-gray-400">Original Duration</p>
              <p className="font-semibold">{formatTime(duration)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Trimmed Duration</p>
              <p className="font-semibold text-blue-400">{formatTime(endTime - startTime)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Size Reduction</p>
              <p className="font-semibold text-green-400">
                {Math.round(((duration - (endTime - startTime)) / duration) * 100)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Export Panel */}
      {showExportPanel && (
        <ExportPanel
          startTime={startTime}
          endTime={endTime}
          videoFile={videoFile}
          onClose={() => setShowExportPanel(false)}
        />
      )}
    </div>
  );
};
