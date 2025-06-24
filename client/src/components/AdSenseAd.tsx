import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";

interface AdSenseAdProps {
  slot: string;
  style?: { width: string; height: string };
  format?: string;
  className?: string;
}

export const AdSenseAd = ({ 
  slot, 
  style = { width: "320px", height: "250px" }, 
  format = "auto",
  className = ""
}: AdSenseAdProps) => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      // Check if AdSense script is loaded
      if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, []);

  return (
    <Card className={`bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-cyan-500/20 backdrop-blur-sm ${className}`}>
      <div className="p-4">
        <p className="text-xs text-gray-400 text-center mb-2">Advertisement</p>
        <div ref={adRef}>
          <ins
            className="adsbygoogle"
            style={{ display: "block", ...style }}
            data-ad-client="ca-pub-XXXXXXXXX" // Replace with your AdSense client ID
            data-ad-slot={slot}
            data-ad-format={format}
            data-full-width-responsive="true"
          />
        </div>
      </div>
    </Card>
  );
};

export const AdSenseModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-cyan-500/30 max-w-md w-full">
        <div className="p-6 text-center">
          <h3 className="text-xl font-bold text-white mb-4">
            Support ClipCut
          </h3>
          <p className="text-gray-300 mb-6">
            Thanks for using our free video trimmer! Please view this quick ad to support our service.
          </p>
          
          {/* Ad placeholder */}
          <div className="bg-gray-700/50 rounded-lg p-8 mb-4 border border-cyan-500/20">
            <ins
              className="adsbygoogle"
              style={{ display: "block", width: "100%", height: "250px" }}
              data-ad-client="ca-pub-XXXXXXXXX" // Replace with your AdSense client ID
              data-ad-slot="XXXXXXXXX" // Replace with your ad slot
              data-ad-format="auto"
              data-full-width-responsive="true"
            />
          </div>

          <button
            onClick={onClose}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-6 py-2 rounded-lg transition-all duration-200"
          >
            Continue to Download
          </button>
        </div>
      </Card>
    </div>
  );
};