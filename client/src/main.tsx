import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Suppress AdSense console errors in development
if (process.env.NODE_ENV === 'development') {
  const originalError = console.error;
  console.error = (...args) => {
    const message = args.join(' ');
    if (message.includes('googlesyndication') || 
        message.includes('pagead') || 
        message.includes('show_ads_impl') ||
        message.includes('Failed to fetch') && message.includes('adsbygoogle')) {
      return;
    }
    originalError.apply(console, args);
  };
}

createRoot(document.getElementById("root")!).render(<App />);
