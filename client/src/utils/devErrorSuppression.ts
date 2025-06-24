// Development-only error suppression for AdSense
export function suppressAdSenseErrors() {
  if (!import.meta.env.DEV) return;

  // Override unhandled rejection handling to prevent AdSense errors from appearing
  window.addEventListener('unhandledrejection', (event) => {
    const error = event.reason;
    const stack = error?.stack || '';
    const message = error?.message || '';
    
    const isAdSenseError = stack.includes('googlesyndication.com') ||
                          stack.includes('pagead') ||
                          stack.includes('show_ads_impl') ||
                          (message.includes('Failed to fetch') && stack.includes('adsbygoogle'));
    
    if (isAdSenseError) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
    }
  }, true);

  // Monkey patch console methods to filter AdSense errors
  const originalError = console.error;
  const originalWarn = console.warn;
  
  console.error = (...args: any[]) => {
    const message = args.map(arg => {
      if (typeof arg === 'object' && arg !== null) {
        return JSON.stringify(arg);
      }
      return String(arg);
    }).join(' ');
    
    if (message.includes('googlesyndication') ||
        message.includes('pagead') ||
        message.includes('show_ads_impl') ||
        message.includes('Error Tracking') ||
        (message.includes('Failed to fetch') && message.includes('adsbygoogle'))) {
      return;
    }
    
    originalError.apply(console, args);
  };
  
  console.warn = (...args: any[]) => {
    const message = args.map(arg => String(arg)).join(' ');
    
    if (message.includes('googlesyndication') ||
        message.includes('pagead') ||
        message.includes('show_ads_impl')) {
      return;
    }
    
    originalWarn.apply(console, args);
  };
}