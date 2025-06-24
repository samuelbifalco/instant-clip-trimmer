
import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        // Don't retry on certain error types
        if (error instanceof Error && error.message.includes('404')) {
          return false;
        }
        return failureCount < 3;
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  useEffect(() => {
    // Set up meta tags for SEO and security
    const updateMetaTags = () => {
      // Security headers via meta tags
      const metaTags = [
        { name: 'referrer', content: 'strict-origin-when-cross-origin' },
        { 'http-equiv': 'X-Content-Type-Options', content: 'nosniff' },
        { 'http-equiv': 'X-Frame-Options', content: 'DENY' },
        { 'http-equiv': 'X-XSS-Protection', content: '1; mode=block' },
        { 'http-equiv': 'Strict-Transport-Security', content: 'max-age=31536000; includeSubDomains' },
        { name: 'format-detection', content: 'telephone=no' },
        
        // PWA and mobile optimization
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'theme-color', content: '#0f172a' },
        
        // SEO optimization
        { name: 'description', content: 'Professional video trimming tool. Edit and trim your videos with precision, completely in your browser. No uploads required - your files stay private.' },
        { name: 'keywords', content: 'video editor, video trimmer, video cutting, online video editor, browser video editor, private video editing' },
        { name: 'author', content: 'ClipCut' },
        { property: 'og:title', content: 'ClipCut - Professional Video Trimming' },
        { property: 'og:description', content: 'Trim and edit videos with precision. Completely browser-based, no uploads required.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: '/og-image.jpg' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'ClipCut - Professional Video Trimming' },
        { name: 'twitter:description', content: 'Trim and edit videos with precision. Completely browser-based, no uploads required.' }
      ];

      metaTags.forEach(tag => {
        const existingTag = document.querySelector(`meta[name="${tag.name}"], meta[property="${tag.property}"], meta[http-equiv="${tag['http-equiv']}"]`);
        if (existingTag) {
          Object.keys(tag).forEach(key => {
            if (key !== 'name' && key !== 'property' && key !== 'http-equiv') {
              existingTag.setAttribute(key, tag[key as keyof typeof tag] as string);
            }
          });
        } else {
          const metaElement = document.createElement('meta');
          Object.keys(tag).forEach(key => {
            metaElement.setAttribute(key, tag[key as keyof typeof tag] as string);
          });
          document.head.appendChild(metaElement);
        }
      });
    };

    updateMetaTags();

    // Set up CSP via meta tag (backup for when server headers aren't available)
    const cspMeta = document.createElement('meta');
    cspMeta.setAttribute('http-equiv', 'Content-Security-Policy');
    cspMeta.setAttribute('content', 
      "default-src 'self'; " +
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com; " +
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
      "font-src 'self' https://fonts.gstatic.com; " +
      "img-src 'self' data: blob: https:; " +
      "media-src 'self' blob: data:; " +
      "connect-src 'self' https://www.google-analytics.com; " +
      "frame-src 'none'; " +
      "object-src 'none'; " +
      "base-uri 'self';"
    );
    document.head.appendChild(cspMeta);

    // Performance optimization: preload critical resources
    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.href = '/fonts/inter.woff2';
    preloadLink.as = 'font';
    preloadLink.type = 'font/woff2';
    preloadLink.crossOrigin = 'anonymous';
    document.head.appendChild(preloadLink);

  }, []);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
