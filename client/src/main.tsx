import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { suppressAdSenseErrors } from './utils/devErrorSuppression'

// Suppress AdSense errors in development
suppressAdSenseErrors();

// Additional aggressive error overlay suppression
if (import.meta.env.DEV) {
  // Override window.onerror to prevent error overlays
  window.onerror = (message, source, lineno, colno, error) => {
    if (typeof message === 'string' && (
      message.includes('Load failed') ||
      message.includes('runtime-error') ||
      message.includes('plugin:')
    )) {
      return true; // Prevent default error handling
    }
    return false;
  };
  
  // Prevent unhandled promise rejections from showing overlays
  window.addEventListener('unhandledrejection', (event) => {
    const message = event.reason?.message || '';
    if (message.includes('Load failed') || 
        message.includes('runtime-error') ||
        message.includes('plugin:')) {
      event.preventDefault();
      event.stopPropagation();
    }
  });
}

createRoot(document.getElementById("root")!).render(<App />);
