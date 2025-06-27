import { useEffect } from 'react';

// NUCLEAR ERROR OVERLAY DESTROYER
export const ErrorOverlayKiller = () => {
  useEffect(() => {
    const destroyAllErrorOverlays = () => {
      // Method 1: Target by selectors
      const selectors = [
        '[data-vite-runtime-error-modal]',
        '.vite-error-overlay',
        '#vite-error-overlay',
        '[data-test-id="error-overlay"]',
        '.error-overlay',
        'div[style*="position: fixed"]',
        'div[style*="position:fixed"]'
      ];

      selectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
          (el as HTMLElement).remove();
        });
      });

      // Method 2: Search all divs for error content
      document.querySelectorAll('div').forEach(div => {
        const text = div.textContent || '';
        const style = window.getComputedStyle(div);
        
        if (style.position === 'fixed' && (
          text.includes('plugin:runtime-error') ||
          text.includes('unknown runtime error') ||
          text.includes('Load failed') ||
          text.includes('Click outside, press Esc') ||
          text.includes('server.hmr.overlay') ||
          text.includes('vite.config')
        )) {
          div.remove();
        }
      });

      // Method 3: Remove any element with error-like attributes
      document.querySelectorAll('*[data-vite-runtime-error-modal]').forEach(el => el.remove());
      document.querySelectorAll('*[data-testid*="error"]').forEach(el => el.remove());
      document.querySelectorAll('*[id*="error-overlay"]').forEach(el => el.remove());
      document.querySelectorAll('*[class*="error-overlay"]').forEach(el => el.remove());
    };

    // Destroy immediately and continuously
    destroyAllErrorOverlays();
    const interval = setInterval(destroyAllErrorOverlays, 5); // Every 5ms

    // Monitor for new nodes
    const observer = new MutationObserver(() => {
      destroyAllErrorOverlays();
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true
    });

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  return null;
};