
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, Link, Play, Zap, Scissors, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

interface VideoUploadProps {
  onVideoSelected: (file: File, url: string) => void;
}

export const VideoUpload = ({ onVideoSelected }: VideoUploadProps) => {
  const [urlInput, setUrlInput] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file && file.type.startsWith('video/')) {
      const url = URL.createObjectURL(file);
      onVideoSelected(file, url);
      toast({
        title: "🎉 Video uploaded successfully!",
        description: "Ready to trim your video with precision.",
      });
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a video file (MP4, AVI, MOV, MKV, WebM).",
        variant: "destructive",
      });
    }
  }, [onVideoSelected]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDragEnter: () => setIsDragOver(true),
    onDragLeave: () => setIsDragOver(false),
    accept: {
      'video/*': ['.mp4', '.avi', '.mov', '.mkv', '.webm', '.m4v', '.3gp']
    },
    multiple: false,
    maxSize: 500 * 1024 * 1024 // 500MB limit
  });

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      toast({
        title: "URL support coming soon! 🚀",
        description: "We're working on adding support for YouTube, Vimeo and other video platforms.",
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-16 space-y-6">
        <div className="inline-flex items-center bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full px-4 py-2 mb-4">
          <Star className="h-4 w-4 text-yellow-400 mr-2" />
          <span className="text-sm text-blue-300 font-medium">Trusted by 10,000+ creators</span>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Trim Any Video
          </span>
          <br />
          <span className="text-white">in Seconds</span>
        </h1>
        
        <p className="text-xl text-gray-300 mb-4 max-w-2xl mx-auto leading-relaxed">
          Professional video trimming made simple. No signup required, no watermarks, 
          completely free with lightning-fast processing.
        </p>
        
        <div className="flex flex-wrap justify-center gap-3">
          <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-500/30">
            ✨ No watermarks
          </Badge>
          <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
            🚀 Instant processing
          </Badge>
          <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
            🔒 100% private
          </Badge>
        </div>
      </div>

      {/* Upload Section */}
      <div className="grid lg:grid-cols-2 gap-8 mb-16">
        {/* File Upload */}
        <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 overflow-hidden">
          <CardContent className="p-0">
            <div className="p-6 border-b border-gray-700">
              <h3 className="text-xl font-semibold flex items-center text-white">
                <Upload className="mr-3 h-6 w-6 text-blue-400" />
                Upload Video File
              </h3>
              <p className="text-gray-400 mt-1">Drag & drop or click to browse</p>
            </div>
            
            <div
              {...getRootProps()}
              className={`p-8 cursor-pointer transition-all duration-300 ${
                isDragActive || isDragOver
                  ? 'bg-blue-500/10 border-blue-400 border-2 border-dashed'
                  : 'bg-gray-800/50 border-2 border-dashed border-gray-600 hover:border-gray-500 hover:bg-gray-700/50'
              }`}
            >
              <input {...getInputProps()} />
              <div className="text-center space-y-4">
                <div className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isDragActive || isDragOver 
                    ? 'bg-blue-500/20 scale-110' 
                    : 'bg-gray-700'
                }`}>
                  <Upload className={`h-10 w-10 transition-colors duration-300 ${
                    isDragActive || isDragOver ? 'text-blue-400' : 'text-gray-300'
                  }`} />
                </div>
                
                {isDragActive ? (
                  <div>
                    <p className="text-blue-400 font-semibold text-lg">Drop your video here!</p>
                    <p className="text-blue-300">We'll process it instantly</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-white font-semibold text-lg">
                      Drag & drop your video here
                    </p>
                    <p className="text-gray-400 mb-4">
                      or click to browse files
                    </p>
                    <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                      Choose File
                    </Button>
                  </div>
                )}
                
                <div className="text-xs text-gray-500 space-y-1">
                  <p>Supports: MP4, AVI, MOV, MKV, WebM, M4V, 3GP</p>
                  <p>Max file size: 500MB</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* URL Input */}
        <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 overflow-hidden">
          <CardContent className="p-0">
            <div className="p-6 border-b border-gray-700">
              <h3 className="text-xl font-semibold flex items-center text-white">
                <Link className="mr-3 h-6 w-6 text-purple-400" />
                Paste Video URL
              </h3>
              <p className="text-gray-400 mt-1">YouTube, Vimeo, and direct links</p>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="bg-purple-500/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
                <Play className="h-10 w-10 text-purple-400" />
              </div>
              
              <div className="space-y-4">
                <Input
                  type="url"
                  placeholder="https://youtube.com/watch?v=..."
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 h-12"
                />
                <Button 
                  onClick={handleUrlSubmit}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 h-12"
                  disabled
                >
                  Coming Soon - Load from URL
                </Button>
              </div>
              
              <div className="text-center">
                <Badge variant="outline" className="border-yellow-500/30 text-yellow-400">
                  🚧 Feature in development
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Features Section */}
      <Card className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 border-gray-700">
        <CardContent className="p-8">
          <h3 className="text-2xl font-bold text-center mb-8 text-white">
            Why Choose ClipCut?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <Zap className="h-8 w-8 text-green-400" />
              </div>
              <h4 className="font-semibold text-white text-lg">Lightning Fast</h4>
              <p className="text-gray-400 leading-relaxed">
                Process videos instantly in your browser with zero upload time. 
                Our advanced technology ensures smooth, real-time editing.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <Scissors className="h-8 w-8 text-blue-400" />
              </div>
              <h4 className="font-semibold text-white text-lg">100% Private</h4>
              <p className="text-gray-400 leading-relaxed">
                Everything happens locally on your device. Your videos never 
                leave your computer, ensuring complete privacy and security.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <Scissors className="h-8 w-8 text-purple-400" />
              </div>
              <h4 className="font-semibold text-white text-lg">Precision Trimming</h4>
              <p className="text-gray-400 leading-relaxed">
                Frame-perfect cuts with our intuitive timeline editor. 
                Professional-grade trimming tools made simple for everyone.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="mt-16 text-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="text-3xl font-bold text-blue-400">10K+</div>
            <div className="text-gray-400">Videos Trimmed</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-400">99.9%</div>
            <div className="text-gray-400">Uptime</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-400">&lt; 5s</div>
            <div className="text-gray-400">Avg. Process Time</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-pink-400">100%</div>
            <div className="text-gray-400">Free Forever</div>
          </div>
        </div>
      </div>
    </div>
  );
};
