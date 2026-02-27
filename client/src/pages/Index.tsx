
import { useState, useEffect } from "react";
import { VideoUpload } from "@/components/VideoUpload";
import { VideoEditor } from "@/components/VideoEditor";
import { Header } from "@/components/Header";
import { FeedbackWidget } from "@/components/FeedbackWidget";
import { Footer } from "@/components/Footer";
import { analytics } from "@/utils/analytics";
import { initializeHealthMonitoring } from "@/utils/healthCheck";
import { errorReporter } from "@/utils/errorReporting";

const Index = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>("");

  useEffect(() => {
    // Initialize production monitoring
    initializeHealthMonitoring();
    
    // Track page visit
    analytics.trackUserFlow('page_visit', {
      page: 'index',
      timestamp: Date.now()
    });

    // Set up session ID
    if (!sessionStorage.getItem('session_id')) {
      sessionStorage.setItem('session_id', analytics.getSessionInfo().sessionId);
    }

    // Performance monitoring
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      analytics.track({
        event: 'page_session',
        category: 'engagement',
        action: 'time_on_page',
        value: Math.round(endTime - startTime)
      });
    };
  }, []);

  const handleVideoSelected = (file: File, url: string) => {
    try {
      setVideoFile(file);
      setVideoUrl(url);
      
      analytics.trackVideoEvent('video_uploaded', {
        fileSize: file.size,
        fileName: file.name,
        fileType: file.type,
        timestamp: Date.now()
      });
      
      analytics.trackUserFlow('video_selection_complete');
    } catch (error) {
      errorReporter.reportVideoError('Failed to process selected video', {
        fileName: file.name,
        fileSize: file.size,
        error: error
      });
    }
  };

  const handleReset = () => {
    try {
      // Clean up video URL to prevent memory leaks
      if (videoUrl.startsWith('blob:')) {
        URL.revokeObjectURL(videoUrl);
      }
      
      setVideoFile(null);
      setVideoUrl("");
      
      analytics.trackUserFlow('video_reset');
    } catch (error) {
      errorReporter.reportError({
        type: 'user',
        message: 'Failed to reset video',
        severity: 'low',
        metadata: { error }
      });
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-cyan-500/10 to-purple-500/10 blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-br from-purple-500/10 to-pink-500/10 blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      </div>
      <Header />
      <main className="container relative z-10 mx-auto px-4 py-8 sm:py-12">
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

      <Footer />
      <FeedbackWidget />
    </div>
  );
};

export default Index;
