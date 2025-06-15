
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
    <div className="max-w-6xl mx-auto px-4">
      {/* Hero Section */}
      <div className="text-center mb-20 space-y-8">
        <div className="inline-flex items-center bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full px-6 py-3 mb-6">
          <Star className="h-5 w-5 text-yellow-400 mr-3" />
          <span className="text-blue-300 font-medium">Trusted by 10,000+ creators worldwide</span>
        </div>
        
        <div className="space-y-4">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tight">
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Trim Videos
            </span>
          </h1>
          <p className="text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight">
            Like a Pro
          </p>
        </div>
        
        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Professional video trimming made effortless. No signup, no watermarks, 
          completely free with lightning-fast processing.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <Badge variant="secondary" className="bg-green-500/10 text-green-400 border-green-500/20 px-4 py-2 text-sm font-medium">
            ✨ No watermarks
          </Badge>
          <Badge variant="secondary" className="bg-blue-500/10 text-blue-400 border-blue-500/20 px-4 py-2 text-sm font-medium">
            ⚡ Instant processing
          </Badge>
          <Badge variant="secondary" className="bg-purple-500/10 text-purple-400 border-purple-500/20 px-4 py-2 text-sm font-medium">
            🔒 100% private
          </Badge>
        </div>
      </div>

      {/* Upload Section */}
      <div className="grid lg:grid-cols-2 gap-8 mb-20">
        {/* File Upload */}
        <Card className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-gray-700/50 backdrop-blur-sm overflow-hidden hover:border-gray-600/50 transition-all duration-300">
          <CardContent className="p-0">
            <div className="p-8 border-b border-gray-700/50">
              <h3 className="text-2xl font-bold flex items-center text-white mb-2">
                <Upload className="mr-4 h-8 w-8 text-blue-400" />
                Upload Video File
              </h3>
              <p className="text-gray-400 text-lg">Drag & drop or click to browse</p>
            </div>
            
            <div
              {...getRootProps()}
              className={`p-12 cursor-pointer transition-all duration-300 ${
                isDragActive || isDragOver
                  ? 'bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-blue-400/50 border-2 border-dashed'
                  : 'bg-gray-800/30 border-2 border-dashed border-gray-600/50 hover:border-gray-500/50 hover:bg-gray-700/30'
              }`}
            >
              <input {...getInputProps()} />
              <div className="text-center space-y-6">
                <div className={`mx-auto w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isDragActive || isDragOver 
                    ? 'bg-gradient-to-br from-blue-500/30 to-purple-500/30 scale-110' 
                    : 'bg-gradient-to-br from-gray-700/50 to-gray-800/50'
                }`}>
                  <Upload className={`h-12 w-12 transition-colors duration-300 ${
                    isDragActive || isDragOver ? 'text-blue-400' : 'text-gray-300'
                  }`} />
                </div>
                
                {isDragActive ? (
                  <div className="space-y-2">
                    <p className="text-blue-400 font-bold text-xl">Drop your video here!</p>
                    <p className="text-blue-300 text-lg">We'll process it instantly</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-white font-bold text-xl">
                      Drag & drop your video here
                    </p>
                    <p className="text-gray-400 text-lg mb-6">
                      or click to browse files
                    </p>
                    <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 px-8 py-3 text-lg font-semibold">
                      Choose File
                    </Button>
                  </div>
                )}
                
                <div className="text-sm text-gray-500 space-y-2 pt-4">
                  <p className="font-medium">Supports: MP4, AVI, MOV, MKV, WebM, M4V, 3GP</p>
                  <p>Max file size: 500MB</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* URL Input */}
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
      </div>

      {/* Features Section */}
      <Card className="bg-gradient-to-r from-gray-800/60 to-gray-900/60 border-gray-700/50 backdrop-blur-sm mb-20">
        <CardContent className="p-12">
          <h3 className="text-4xl font-bold text-center mb-12 text-white">
            Why Choose ClipCut?
          </h3>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center space-y-6">
              <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
                <Zap className="h-10 w-10 text-green-400" />
              </div>
              <h4 className="font-bold text-white text-xl">Lightning Fast</h4>
              <p className="text-gray-300 leading-relaxed text-lg">
                Process videos instantly in your browser with zero upload time. 
                Our advanced technology ensures smooth, real-time editing.
              </p>
            </div>
            
            <div className="text-center space-y-6">
              <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
                <Scissors className="h-10 w-10 text-blue-400" />
              </div>
              <h4 className="font-bold text-white text-xl">100% Private</h4>
              <p className="text-gray-300 leading-relaxed text-lg">
                Everything happens locally on your device. Your videos never 
                leave your computer, ensuring complete privacy and security.
              </p>
            </div>
            
            <div className="text-center space-y-6">
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
                <Scissors className="h-10 w-10 text-purple-400" />
              </div>
              <h4 className="font-bold text-white text-xl">Precision Trimming</h4>
              <p className="text-gray-300 leading-relaxed text-lg">
                Frame-perfect cuts with our intuitive timeline editor. 
                Professional-grade trimming tools made simple for everyone.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="text-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="text-4xl md:text-5xl font-black text-blue-400">10K+</div>
            <div className="text-gray-300 text-lg font-medium">Videos Trimmed</div>
          </div>
          <div className="space-y-3">
            <div className="text-4xl md:text-5xl font-black text-green-400">99.9%</div>
            <div className="text-gray-300 text-lg font-medium">Uptime</div>
          </div>
          <div className="space-y-3">
            <div className="text-4xl md:text-5xl font-black text-purple-400">&lt; 5s</div>
            <div className="text-gray-300 text-lg font-medium">Avg. Process Time</div>
          </div>
          <div className="space-y-3">
            <div className="text-4xl md:text-5xl font-black text-pink-400">100%</div>
            <div className="text-gray-300 text-lg font-medium">Free Forever</div>
          </div>
        </div>
      </div>
    </div>
  );
};
