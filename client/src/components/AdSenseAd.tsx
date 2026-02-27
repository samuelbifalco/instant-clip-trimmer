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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <Card className="w-full max-w-md border border-white/10 bg-slate-800">
        <div className="p-6 text-center">
          <h3 className="mb-2 text-xl font-bold text-white">Ready to download</h3>
          <p className="mb-6 text-slate-400">
            Your video is ready. Click below to continue.
          </p>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3 font-semibold text-white transition-colors hover:from-cyan-600 hover:to-blue-600"
          >
            Continue to Download
          </button>
        </div>
      </Card>
    </div>
  );
};