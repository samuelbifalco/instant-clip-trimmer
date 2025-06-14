
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, Link, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

interface VideoUploadProps {
  onVideoSelected: (file: File, url: string) => void;
}

export const VideoUpload = ({ onVideoSelected }: VideoUploadProps) => {
  const [urlInput, setUrlInput] = useState("");

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file && file.type.startsWith('video/')) {
      const url = URL.createObjectURL(file);
      onVideoSelected(file, url);
      toast({
        title: "Video uploaded successfully!",
        description: "Ready to trim your video.",
      });
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a video file.",
        variant: "destructive",
      });
    }
  }, [onVideoSelected]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.avi', '.mov', '.mkv', '.webm']
    },
    multiple: false
  });

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      // For demo purposes, we'll show a message about URL support
      toast({
        title: "URL support coming soon!",
        description: "For now, please upload a video file directly.",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Trim Any Video in Seconds
        </h2>
        <p className="text-xl text-gray-300 mb-2">
          No signup required • No watermarks • Completely free
        </p>
        <p className="text-gray-400">
          Upload your video and start trimming instantly
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* File Upload */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center">
            <Upload className="mr-2 h-5 w-5 text-blue-400" />
            Upload Video File
          </h3>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${
              isDragActive
                ? 'border-blue-400 bg-blue-400/10'
                : 'border-gray-600 hover:border-gray-500 hover:bg-gray-800/50'
            }`}
          >
            <input {...getInputProps()} />
            <div className="space-y-4">
              <div className="bg-gray-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <Upload className="h-8 w-8 text-gray-300" />
              </div>
              {isDragActive ? (
                <p className="text-blue-400 font-medium">Drop your video here...</p>
              ) : (
                <>
                  <p className="text-gray-300 font-medium">
                    Drag & drop your video here
                  </p>
                  <p className="text-sm text-gray-400">
                    or click to browse files
                  </p>
                </>
              )}
              <p className="text-xs text-gray-500">
                Supports MP4, AVI, MOV, MKV, WebM
              </p>
            </div>
          </div>
        </div>

        {/* URL Input */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center">
            <Link className="mr-2 h-5 w-5 text-purple-400" />
            Paste Video URL
          </h3>
          <div className="border-2 border-gray-600 rounded-lg p-8 space-y-4">
            <div className="bg-gray-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
              <Play className="h-8 w-8 text-gray-300" />
            </div>
            <div className="space-y-3">
              <Input
                type="url"
                placeholder="https://youtube.com/watch?v=..."
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
              />
              <Button 
                onClick={handleUrlSubmit}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                Load Video
              </Button>
            </div>
            <p className="text-xs text-gray-500 text-center">
              YouTube, Vimeo, and direct video links
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 bg-gray-800/50 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 text-center">Why Choose ClipCut?</h3>
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="bg-green-500/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <Zap className="h-6 w-6 text-green-400" />
            </div>
            <h4 className="font-medium mb-2">Lightning Fast</h4>
            <p className="text-sm text-gray-400">Process videos instantly in your browser</p>
          </div>
          <div>
            <div className="bg-blue-500/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <Upload className="h-6 w-6 text-blue-400" />
            </div>
            <h4 className="font-medium mb-2">No Uploads</h4>
            <p className="text-sm text-gray-400">Everything happens locally on your device</p>
          </div>
          <div>
            <div className="bg-purple-500/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <Scissors className="h-6 w-6 text-purple-400" />
            </div>
            <h4 className="font-medium mb-2">Precision Trimming</h4>
            <p className="text-sm text-gray-400">Frame-perfect cuts with our timeline editor</p>
          </div>
        </div>
      </div>
    </div>
  );
};
