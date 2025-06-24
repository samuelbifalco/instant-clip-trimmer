interface ErrorReport {
  id: string;
  timestamp: number;
  type: 'javascript' | 'promise' | 'react' | 'network' | 'video' | 'user';
  message: string;
  stack?: string;
  component?: string;
  props?: any;
  userAgent: string;
  url: string;
  sessionId: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  metadata?: Record<string, any>;
}

class ErrorReporter {
  private reports: ErrorReport[] = [];
  private maxReports = 50;
  private isEnabled = true;

  constructor() {
    this.setupGlobalErrorHandlers();
  }

  private setupGlobalErrorHandlers() {
    // Global JavaScript errors
    window.addEventListener('error', (event) => {
      this.reportError({
        type: 'javascript',
        message: event.message,
        stack: event.error?.stack,
        severity: 'high',
        metadata: {
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno
        }
      });
    });

    // Unhandled Promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      const errorMessage = event.reason?.message || 'Unhandled promise rejection';
      const errorStack = event.reason?.stack || '';
      
      // Skip reporting for AdSense-related promise rejections
      const isAdSenseError = errorStack.includes('googlesyndication.com') || 
                            errorStack.includes('googleadservices.com') ||
                            errorStack.includes('pagead') ||
                            (errorMessage.includes('Failed to fetch') && errorStack.includes('adsbygoogle'));
      
      if (!isAdSenseError) {
        this.reportError({
          type: 'promise',
          message: errorMessage,
          stack: errorStack,
          severity: 'medium',
          metadata: {
            reason: event.reason
          }
        });
      }
    });

    // Network errors
    this.interceptFetch();
  }

  private interceptFetch() {
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      try {
        const response = await originalFetch(...args);
        
        // Skip error reporting for AdSense and known external service failures
        const url = args[0]?.toString() || '';
        const isAdSenseRequest = url.includes('googlesyndication.com') || 
                                url.includes('googleadservices.com') ||
                                url.includes('pagead');
        
        if (!response.ok && !isAdSenseRequest) {
          this.reportError({
            type: 'network',
            message: `HTTP ${response.status}: ${response.statusText}`,
            severity: response.status >= 500 ? 'high' : 'medium',
            metadata: {
              url: args[0],
              status: response.status,
              statusText: response.statusText
            }
          });
        }
        
        return response;
      } catch (error) {
        // Skip error reporting for AdSense and known external service failures
        const url = args[0]?.toString() || '';
        const isAdSenseRequest = url.includes('googlesyndication.com') || 
                                url.includes('googleadservices.com') ||
                                url.includes('pagead');
        
        if (!isAdSenseRequest) {
          this.reportError({
            type: 'network',
            message: `Network error: ${error}`,
            severity: 'high',
            metadata: {
              url: args[0],
              error: error
            }
          });
        }
        throw error;
      }
    };
  }

  public reportError(error: Partial<ErrorReport>) {
    if (!this.isEnabled) return;

    const report: ErrorReport = {
      id: this.generateErrorId(),
      timestamp: Date.now(),
      type: error.type || 'user',
      message: error.message || 'Unknown error',
      stack: error.stack,
      component: error.component,
      props: error.props,
      userAgent: navigator.userAgent,
      url: window.location.href,
      sessionId: this.getSessionId(),
      severity: error.severity || 'medium',
      metadata: error.metadata
    };

    this.reports.push(report);
    
    // Keep only recent reports
    if (this.reports.length > this.maxReports) {
      this.reports = this.reports.slice(-this.maxReports);
    }

    console.error('[Error Reporter]', report);

    // Send to error tracking service in production
    this.sendToErrorService(report);

    return report.id;
  }

  public reportVideoError(message: string, metadata?: any) {
    return this.reportError({
      type: 'video',
      message,
      severity: 'high',
      metadata
    });
  }

  public reportReactError(error: Error, errorInfo: any, component?: string) {
    return this.reportError({
      type: 'react',
      message: error.message,
      stack: error.stack,
      component,
      severity: 'critical',
      metadata: {
        componentStack: errorInfo.componentStack,
        errorBoundary: true
      }
    });
  }

  private generateErrorId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
  }

  private getSessionId(): string {
    return sessionStorage.getItem('session_id') || 'unknown';
  }

  private sendToErrorService(report: ErrorReport) {
    // In production, send to error tracking service
    // Examples: Sentry, Bugsnag, LogRocket, etc.
    
    if (report.severity === 'critical') {
      // For critical errors, try to send immediately
      this.sendCriticalError(report);
    } else {
      // Batch non-critical errors
      this.batchError(report);
    }
  }

  private sendCriticalError(report: ErrorReport) {
    // Send critical errors immediately
    navigator.sendBeacon('/api/errors/critical', JSON.stringify(report));
  }

  private batchError(report: ErrorReport) {
    // Add to batch queue - would be sent periodically in production
    const batch = JSON.parse(localStorage.getItem('error_batch') || '[]');
    batch.push(report);
    
    // Keep batch size manageable
    if (batch.length > 10) {
      batch.shift();
    }
    
    localStorage.setItem('error_batch', JSON.stringify(batch));
  }

  public getRecentErrors(count = 10): ErrorReport[] {
    return this.reports.slice(-count);
  }

  public clearReports() {
    this.reports = [];
    localStorage.removeItem('error_batch');
  }

  public setEnabled(enabled: boolean) {
    this.isEnabled = enabled;
  }

  public exportErrorLog(): string {
    return JSON.stringify({
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      reports: this.reports
    }, null, 2);
  }
}

export const errorReporter = new ErrorReporter();

// Helper function for manual error reporting
export const reportError = (message: string, metadata?: any) => {
  return errorReporter.reportError({
    type: 'user',
    message,
    severity: 'medium',
    metadata
  });
};
