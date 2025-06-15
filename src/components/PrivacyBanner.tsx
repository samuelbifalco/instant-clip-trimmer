
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Settings, X } from "lucide-react";
import { analytics } from "@/utils/analytics";

export const PrivacyBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('privacy_consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('privacy_consent', 'accepted');
    localStorage.setItem('analytics_consent', 'true');
    analytics.setConsent(true);
    setShowBanner(false);
    
    analytics.track({
      event: 'privacy_consent',
      category: 'privacy',
      action: 'accept_all'
    });
  };

  const handleRejectAll = () => {
    localStorage.setItem('privacy_consent', 'rejected');
    localStorage.setItem('analytics_consent', 'false');
    analytics.setConsent(false);
    setShowBanner(false);
    
    console.log('[Privacy] User rejected all cookies');
  };

  const handleCustomize = () => {
    setShowSettings(true);
  };

  const handleSaveSettings = (analyticsEnabled: boolean) => {
    localStorage.setItem('privacy_consent', 'customized');
    localStorage.setItem('analytics_consent', analyticsEnabled.toString());
    analytics.setConsent(analyticsEnabled);
    setShowSettings(false);
    setShowBanner(false);
    
    analytics.track({
      event: 'privacy_consent',
      category: 'privacy',
      action: 'customize',
      metadata: { analytics: analyticsEnabled }
    });
  };

  if (!showBanner && !showSettings) return null;

  if (showSettings) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <Card className="bg-gray-900 border-gray-700 max-w-md w-full">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Privacy Settings
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSettings(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium text-white">Essential Cookies</h4>
                <p className="text-sm text-gray-400">
                  Required for the website to function properly. Cannot be disabled.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">Always active</span>
                  <div className="w-10 h-6 bg-green-500 rounded-full"></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-white">Analytics Cookies</h4>
                <p className="text-sm text-gray-400">
                  Help us understand how you use our website to improve your experience.
                </p>
                <AnalyticsToggle onSave={handleSaveSettings} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <Card className="bg-gray-900/95 border-gray-700 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex-1 space-y-2">
              <h3 className="font-semibold text-white flex items-center">
                <Shield className="h-5 w-5 mr-2 text-blue-400" />
                We respect your privacy
              </h3>
              <p className="text-sm text-gray-300">
                We use cookies to enhance your experience, analyze site traffic, and improve our services. 
                Your video files are processed locally and never uploaded to our servers.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCustomize}
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                Customize
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRejectAll}
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                Reject All
              </Button>
              <Button
                size="sm"
                onClick={handleAcceptAll}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                Accept All
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const AnalyticsToggle = ({ onSave }: { onSave: (enabled: boolean) => void }) => {
  const [enabled, setEnabled] = useState(true);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-300">Analytics</span>
        <button
          onClick={() => setEnabled(!enabled)}
          className={`w-10 h-6 rounded-full transition-colors ${
            enabled ? 'bg-blue-500' : 'bg-gray-600'
          }`}
        >
          <div
            className={`w-4 h-4 bg-white rounded-full transition-transform ${
              enabled ? 'translate-x-5' : 'translate-x-1'
            }`}
          />
        </button>
      </div>
      
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onSave(false)}
          className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
        >
          Save Preferences
        </Button>
        <Button
          size="sm"
          onClick={() => onSave(enabled)}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
        >
          Save & Close
        </Button>
      </div>
    </div>
  );
};
