
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
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
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
