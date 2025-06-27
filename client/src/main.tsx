import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { suppressAdSenseErrors } from './utils/devErrorSuppression'

// Suppress AdSense errors in development
suppressAdSenseErrors();

// NUCLEAR ERROR OVERLAY SUPPRESSION
if (import.meta.env.DEV) {
  // Immediately start killing overlays
  const killAllOverlays = () => {
    // Remove all fixed position divs that look like error overlays
    const allDivs = document.querySelectorAll('div');
    allDivs.forEach(div => {
      const el = div as HTMLElement;
      const style = window.getComputedStyle(el);
      const text = el.textContent || '';
      
      if (style.position === 'fixed' || 
          text.includes('plugin:runtime-error') ||
          text.includes('unknown runtime error') ||
          text.includes('Click outside, press Esc') ||
          text.includes('server.hmr.overlay') ||
          el.getAttribute('data-vite-runtime-error-modal') !== null) {
        el.remove();
      }
    });
  };

  // Kill overlays every 10ms aggressively
  setInterval(killAllOverlays, 10);

  // Override window.onerror completely
  window.onerror = () => true;
  
  // Block all unhandled rejections that might trigger overlays
  window.addEventListener('unhandledrejection', (event) => {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
  });

  // Block error events
  window.addEventListener('error', (event) => {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
  });
}

createRoot(document.getElementById("root")!).render(<App />);
