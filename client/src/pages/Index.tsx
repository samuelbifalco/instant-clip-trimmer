
import { useState, useEffect } from "react";
import { VideoUpload } from "@/components/VideoUpload";
import { VideoEditor } from "@/components/VideoEditor";
import { Header } from "@/components/Header";
import { PrivacyBanner } from "@/components/PrivacyBanner";
import { FeedbackWidget } from "@/components/FeedbackWidget";
import { Footer } from "@/components/Footer";
import { AdSenseAd } from "@/components/AdSenseAd";
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
            <p className="mt-2">
              <a href="#privacy" className="hover:text-gray-300 transition-colors">Privacy Policy</a> • 
              <a href="#terms" className="hover:text-gray-300 transition-colors ml-2">Terms of Service</a> • 
              <a href="#support" className="hover:text-gray-300 transition-colors ml-2">Support</a>
            </p>
          </div>
        </div>
      </footer>

      {/* Production-ready components */}
      <PrivacyBanner />
      <FeedbackWidget />
    </div>
  );
};

export default Index;
