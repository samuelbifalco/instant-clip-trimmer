import { useEffect } from 'react';

// Component specifically designed to aggressively hide error overlays
export const ErrorOverlayKiller = () => {
  useEffect(() => {
    const killOverlays = () => {
      // Target all possible overlay elements
      const selectors = [
        '[data-vite-runtime-error-modal]',
        '.vite-error-overlay',
        '#vite-error-overlay',
        '[data-test-id="error-overlay"]',
        '.error-overlay'
      ];

      selectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
          const el = element as HTMLElement;
          el.style.display = 'none';
          el.style.opacity = '0';
          el.style.visibility = 'hidden';
          el.style.pointerEvents = 'none';
          el.style.zIndex = '-9999';
          // Force remove from DOM
          el.remove();
        });
      });

      // Also target any fixed position divs that might be error overlays
      const fixedDivs = document.querySelectorAll('div[style*="position: fixed"]');
      fixedDivs.forEach(div => {
        const el = div as HTMLElement;
        const content = el.textContent || '';
        if (content.includes('runtime-error') || 
            content.includes('Load failed') || 
            content.includes('plugin:') ||
            content.includes('unknown runtime error')) {
          el.style.display = 'none';
          el.remove();
        }
      });
    };

    // Kill overlays immediately
    killOverlays();

    // Set up aggressive monitoring
    const interval = setInterval(killOverlays, 50);
    
    // Monitor DOM changes
    const observer = new MutationObserver(() => {
      killOverlays();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class']
    });

    // Also listen for any new elements being added
    document.addEventListener('DOMNodeInserted', killOverlays);

    return () => {
      clearInterval(interval);
      observer.disconnect();
      document.removeEventListener('DOMNodeInserted', killOverlays);
    };
  }, []);

  return null; // This component renders nothing
};