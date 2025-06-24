
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw, Home, Download } from 'lucide-react';
import { errorReporter } from '@/utils/errorReporting';
import { analytics } from '@/utils/analytics';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
  errorId?: string;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error Boundary caught an error:', error, errorInfo);
    
    // Report to error tracking system
    const errorId = errorReporter.reportReactError(error, errorInfo, 'ErrorBoundary');
    
    // Track error in analytics
    analytics.track({
      event: 'react_error',
      category: 'error',
      action: 'error_boundary_triggered',
      metadata: {
        errorId,
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack
      }
    });

    this.setState({ error, errorInfo, errorId });
  }

  private handleDownloadErrorLog = () => {
    try {
      const errorLog = errorReporter.exportErrorLog();
      const blob = new Blob([errorLog], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `clipcut-error-log-${Date.now()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      analytics.track({
        event: 'error_log_downloaded',
        category: 'support',
        action: 'download_error_log'
      });
    } catch (error) {
      console.error('Failed to download error log:', error);
    }
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 text-white flex items-center justify-center p-4">
          <Card className="bg-red-900/20 border-red-700/50 max-w-2xl w-full">
            <CardContent className="p-8 text-center space-y-6">
              <AlertTriangle className="h-16 w-16 text-red-400 mx-auto" />
              
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-white">Something went wrong</h2>
                <p className="text-red-200 text-lg">
                  We encountered an unexpected error. This has been automatically reported and we'll look into it.
                </p>
                
                {this.state.errorId && (
                  <div className="bg-gray-800/50 p-3 rounded-lg">
                    <p className="text-sm text-gray-300">
                      Error ID: <code className="bg-gray-700 px-2 py-1 rounded text-green-400">{this.state.errorId}</code>
                    </p>
                  </div>
                )}
                
                {process.env.NODE_ENV === 'development' && this.state.error && (
                  <details className="text-left bg-gray-800/50 p-4 rounded-lg">
                    <summary className="cursor-pointer text-red-300 font-semibold mb-2">
                      Error Details (Development Mode)
                    </summary>
                    <pre className="text-sm text-gray-300 overflow-auto whitespace-pre-wrap">
                      {this.state.error.toString()}
                      {this.state.errorInfo?.componentStack}
                    </pre>
                  </details>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => window.location.reload()}
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Reload Page
                </Button>
                <Button
                  onClick={() => window.location.href = '/'}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Go Home
                </Button>
                <Button
                  onClick={this.handleDownloadErrorLog}
                  variant="outline"
                  className="border-yellow-600 text-yellow-300 hover:bg-yellow-700/20"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Error Log
                </Button>
              </div>

              <div className="text-xs text-gray-500 space-y-1">
                <p>If this error persists, please contact support with the Error ID above.</p>
                <p>You can also download the error log to help us debug the issue.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
