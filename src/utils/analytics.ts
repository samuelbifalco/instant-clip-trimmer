
interface AnalyticsEvent {
  event: string;
  category: string;
  action: string;
  label?: string;
  value?: number;
  metadata?: Record<string, any>;
}

interface UserSession {
  sessionId: string;
  userId?: string;
  startTime: number;
  userAgent: string;
  viewport: { width: number; height: number };
  language: string;
  timezone: string;
}

// Type declaration for gtag function
declare global {
  function gtag(...args: any[]): void;
}

class Analytics {
  private session: UserSession;
  private events: AnalyticsEvent[] = [];
  private isEnabled: boolean;

  constructor() {
    this.isEnabled = this.checkConsent();
    this.session = this.initializeSession();
    
    if (this.isEnabled) {
      this.setupPerformanceMonitoring();
      this.setupErrorTracking();
    }
  }

  private checkConsent(): boolean {
    // Check if user has consented to analytics
    return localStorage.getItem('analytics_consent') === 'true';
  }

  private initializeSession(): UserSession {
    return {
      sessionId: this.generateSessionId(),
      startTime: Date.now(),
      userAgent: navigator.userAgent,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      },
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };
  }

  private generateSessionId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private setupPerformanceMonitoring() {
    // Monitor page load performance
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      this.track({
        event: 'page_load_performance',
        category: 'performance',
        action: 'load',
        metadata: {
          loadTime: navigation.loadEventEnd - navigation.loadEventStart,
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
          firstPaint: this.getFirstPaint(),
          sessionId: this.session.sessionId
        }
      });
    });

    // Monitor Core Web Vitals
    this.observeWebVitals();
  }

  private getFirstPaint(): number | null {
    const paintEntries = performance.getEntriesByType('paint');
    const firstPaint = paintEntries.find(entry => entry.name === 'first-paint');
    return firstPaint ? firstPaint.startTime : null;
  }

  private observeWebVitals() {
    // Largest Contentful Paint
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      this.track({
        event: 'web_vital',
        category: 'performance',
        action: 'lcp',
        value: lastEntry.startTime,
        metadata: { sessionId: this.session.sessionId }
      });
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // First Input Delay
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        this.track({
          event: 'web_vital',
          category: 'performance',
          action: 'fid',
          value: (entry as any).processingStart - entry.startTime,
          metadata: { sessionId: this.session.sessionId }
        });
      }
    }).observe({ entryTypes: ['first-input'] });
  }

  private setupErrorTracking() {
    window.addEventListener('error', (event) => {
      this.trackError({
        type: 'javascript_error',
        message: event.message,
        filename: event.filename,
        line: event.lineno,
        column: event.colno,
        stack: event.error?.stack,
        sessionId: this.session.sessionId
      });
    });

    window.addEventListener('unhandledrejection', (event) => {
      this.trackError({
        type: 'promise_rejection',
        message: event.reason?.message || 'Unhandled promise rejection',
        stack: event.reason?.stack,
        sessionId: this.session.sessionId
      });
    });
  }

  public track(event: AnalyticsEvent) {
    if (!this.isEnabled) return;

    const enrichedEvent = {
      ...event,
      timestamp: Date.now(),
      sessionId: this.session.sessionId,
      url: window.location.href,
      referrer: document.referrer
    };

    this.events.push(enrichedEvent);
    console.log('[Analytics]', enrichedEvent);

    // In production, send to analytics service
    this.sendToAnalyticsService(enrichedEvent);
  }

  public trackError(error: any) {
    if (!this.isEnabled) return;

    console.error('[Error Tracking]', error);
    
    this.track({
      event: 'error',
      category: 'error',
      action: error.type || 'unknown',
      metadata: error
    });
  }

  public trackVideoEvent(action: string, metadata?: Record<string, any>) {
    this.track({
      event: 'video_action',
      category: 'video',
      action,
      metadata
    });
  }

  public trackUserFlow(step: string, metadata?: Record<string, any>) {
    this.track({
      event: 'user_flow',
      category: 'engagement',
      action: step,
      metadata
    });
  }

  private sendToAnalyticsService(event: any) {
    // In production, send to your analytics service
    // Example: Google Analytics, Mixpanel, etc.
    if (typeof window !== 'undefined' && 'gtag' in window && typeof (window as any).gtag === 'function') {
      try {
        (window as any).gtag('event', event.action, {
          event_category: event.category,
          event_label: event.label,
          value: event.value,
          custom_map: event.metadata
        });
      } catch (error) {
        console.warn('[Analytics] Failed to send to gtag:', error);
      }
    }
  }

  public setConsent(hasConsent: boolean) {
    this.isEnabled = hasConsent;
    localStorage.setItem('analytics_consent', hasConsent.toString());
    
    if (hasConsent) {
      this.setupPerformanceMonitoring();
      this.setupErrorTracking();
    }
  }

  public getSessionInfo() {
    return this.session;
  }
}

export const analytics = new Analytics();
