
import { useState } from "react";
import { VideoUpload } from "@/components/VideoUpload";
import { VideoEditor } from "@/components/VideoEditor";
import { Header } from "@/components/Header";

const Index = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>("");

  const handleVideoSelected = (file: File, url: string) => {
    setVideoFile(file);
    setVideoUrl(url);
  };

  const handleReset = () => {
    setVideoFile(null);
    setVideoUrl("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 text-white relative overflow-hidden">
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-green-500/5 to-blue-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
        
        {/* Additional subtle background patterns */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400/30 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-purple-400/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-1/3 w-1.5 h-1.5 bg-pink-400/30 rounded-full animate-pulse" style={{ animationDelay: '3s' }}></div>
      </div>
      
      <Header />
      <main className="container mx-auto px-4 py-12 relative z-10">
        {!videoFile ? (
          <VideoUpload onVideoSelected={handleVideoSelected} />
        ) : (
          <VideoEditor 
            videoFile={videoFile} 
            videoUrl={videoUrl} 
            onReset={handleReset}
          />
        )}
      </main>

      {/* Subtle footer */}
      <footer className="relative z-10 border-t border-gray-800/50 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-500 text-sm">
            <p>© 2024 ClipCut. Professional video trimming made simple.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
