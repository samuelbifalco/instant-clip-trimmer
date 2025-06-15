
interface HealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: number;
  checks: {
    browser: HealthCheck;
    performance: HealthCheck;
    storage: HealthCheck;
    memory: HealthCheck;
    features: HealthCheck;
  };
  recommendations: string[];
}

interface HealthCheck {
  status: 'pass' | 'warn' | 'fail';
  message: string;
  value?: number;
  threshold?: number;
}

class HealthMonitor {
  private checks: HealthStatus['checks'] = {
    browser: { status: 'pass', message: 'Browser compatibility good' },
    performance: { status: 'pass', message: 'Performance within normal range' },
    storage: { status: 'pass', message: 'Storage available' },
    memory: { status: 'pass', message: 'Memory usage normal' },
    features: { status: 'pass', message: 'All features supported' }
  };

  public async performHealthCheck(): Promise<HealthStatus> {
    const timestamp = Date.now();
    
    // Reset checks
    this.checks = {
      browser: await this.checkBrowserSupport(),
      performance: await this.checkPerformance(),
      storage: await this.checkStorage(),
      memory: await this.checkMemory(),
      features: await this.checkFeatureSupport()
    };

    const status = this.determineOverallStatus();
    const recommendations = this.generateRecommendations();

    const healthStatus: HealthStatus = {
      status,
      timestamp,
      checks: this.checks,
      recommendations
    };

    console.log('[Health Check]', healthStatus);
    return healthStatus;
  }

  private async checkBrowserSupport(): Promise<HealthCheck> {
    const userAgent = navigator.userAgent;
    const isChrome = /Chrome/.test(userAgent);
    const isFirefox = /Firefox/.test(userAgent);
    const isSafari = /Safari/.test(userAgent) && !/Chrome/.test(userAgent);
    const isEdge = /Edge/.test(userAgent);

    if (isChrome || isFirefox || isEdge) {
      return { status: 'pass', message: 'Browser fully supported' };
    } else if (isSafari) {
      return { status: 'warn', message: 'Safari supported with limitations' };
    } else {
      return { status: 'fail', message: 'Browser may not be fully supported' };
    }
  }

  private async checkPerformance(): Promise<HealthCheck> {
    if ('performance' in window && 'memory' in (performance as any)) {
      const memory = (performance as any).memory;
      const memoryUsage = memory.usedJSHeapSize / memory.jsHeapSizeLimit;
      
      if (memoryUsage < 0.7) {
        return { 
          status: 'pass', 
          message: 'Performance good',
          value: Math.round(memoryUsage * 100),
          threshold: 70
        };
      } else if (memoryUsage < 0.9) {
        return { 
          status: 'warn', 
          message: 'Performance degraded',
          value: Math.round(memoryUsage * 100),
          threshold: 70
        };
      } else {
        return { 
          status: 'fail', 
          message: 'Performance poor',
          value: Math.round(memoryUsage * 100),
          threshold: 70
        };
      }
    }

    return { status: 'warn', message: 'Performance monitoring not available' };
  }

  private async checkStorage(): Promise<HealthCheck> {
    try {
      if ('storage' in navigator && 'estimate' in navigator.storage) {
        const estimate = await navigator.storage.estimate();
        const usagePercent = ((estimate.usage || 0) / (estimate.quota || 1)) * 100;
        
        if (usagePercent < 80) {
          return { 
            status: 'pass', 
            message: 'Storage available',
            value: Math.round(usagePercent),
            threshold: 80
          };
        } else if (usagePercent < 95) {
          return { 
            status: 'warn', 
            message: 'Storage running low',
            value: Math.round(usagePercent),
            threshold: 80
          };
        } else {
          return { 
            status: 'fail', 
            message: 'Storage critically low',
            value: Math.round(usagePercent),
            threshold: 80
          };
        }
      }
      
      // Fallback: test localStorage
      localStorage.setItem('healthcheck', 'test');
      localStorage.removeItem('healthcheck');
      return { status: 'pass', message: 'Storage available' };
    } catch (error) {
      return { status: 'fail', message: 'Storage not available' };
    }
  }

  private async checkMemory(): Promise<HealthCheck> {
    if ('deviceMemory' in navigator) {
      const deviceMemory = (navigator as any).deviceMemory;
      
      if (deviceMemory >= 4) {
        return { 
          status: 'pass', 
          message: 'Sufficient memory',
          value: deviceMemory,
          threshold: 4
        };
      } else if (deviceMemory >= 2) {
        return { 
          status: 'warn', 
          message: 'Limited memory',
          value: deviceMemory,
          threshold: 4
        };
      } else {
        return { 
          status: 'fail', 
          message: 'Insufficient memory',
          value: deviceMemory,
          threshold: 4
        };
      }
    }

    return { status: 'warn', message: 'Memory info not available' };
  }

  private async checkFeatureSupport(): Promise<HealthCheck> {
    const features = {
      fileApi: 'File' in window,
      url: 'URL' in window && 'createObjectURL' in URL,
      video: document.createElement('video').canPlayType,
      canvas: 'CanvasRenderingContext2D' in window,
      webgl: this.checkWebGLSupport(),
      audioContext: 'AudioContext' in window || 'webkitAudioContext' in window
    };

    const supportedFeatures = Object.values(features).filter(Boolean).length;
    const totalFeatures = Object.keys(features).length;
    const supportPercent = (supportedFeatures / totalFeatures) * 100;

    if (supportPercent >= 90) {
      return { status: 'pass', message: 'All features supported' };
    } else if (supportPercent >= 70) {
      return { status: 'warn', message: 'Most features supported' };
    } else {
      return { status: 'fail', message: 'Limited feature support' };
    }
  }

  private checkWebGLSupport(): boolean {
    try {
      const canvas = document.createElement('canvas');
      return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
    } catch {
      return false;
    }
  }

  private determineOverallStatus(): HealthStatus['status'] {
    const checkStatuses = Object.values(this.checks).map(check => check.status);
    
    if (checkStatuses.some(status => status === 'fail')) {
      return 'unhealthy';
    } else if (checkStatuses.some(status => status === 'warn')) {
      return 'degraded';
    } else {
      return 'healthy';
    }
  }

  private generateRecommendations(): string[] {
    const recommendations: string[] = [];

    if (this.checks.browser.status === 'fail') {
      recommendations.push('Update to a modern browser (Chrome, Firefox, or Edge) for the best experience');
    }

    if (this.checks.performance.status !== 'pass') {
      recommendations.push('Close other browser tabs to improve performance');
      recommendations.push('Restart your browser if performance issues persist');
    }

    if (this.checks.storage.status !== 'pass') {
      recommendations.push('Clear browser data or free up disk space');
    }

    if (this.checks.memory.status === 'fail') {
      recommendations.push('Close other applications to free up memory');
      recommendations.push('Consider using a device with more RAM for large video files');
    }

    if (this.checks.features.status !== 'pass') {
      recommendations.push('Some features may not work properly. Update your browser for full compatibility');
    }

    if (recommendations.length === 0) {
      recommendations.push('Your system is optimally configured for video editing');
    }

    return recommendations;
  }
}

export const healthMonitor = new HealthMonitor();

// Auto-run health check on page load
export const initializeHealthMonitoring = () => {
  healthMonitor.performHealthCheck().then(status => {
    if (status.status === 'unhealthy') {
      console.warn('[Health Check] System health is poor:', status.recommendations);
    }
  });
};
