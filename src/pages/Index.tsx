
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
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-green-500/5 to-blue-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
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
    </div>
  );
};

export default Index;
