/**
 * Système de logging centralisé pour SoloDesign
 */

export enum LogLevel {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug'
}

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
  userAgent?: string;
  ip?: string;
  url?: string;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';
  private logLevel = (process.env.LOG_LEVEL as LogLevel) || LogLevel.INFO;

  private shouldLog(level: LogLevel): boolean {
    const levels = [LogLevel.ERROR, LogLevel.WARN, LogLevel.INFO, LogLevel.DEBUG];
    return levels.indexOf(level) <= levels.indexOf(this.logLevel);
  }

  private formatLog(entry: LogEntry): string {
    const { timestamp, level, message, metadata } = entry;
    const metaStr = metadata ? JSON.stringify(metadata) : '';
    return `[${timestamp}] ${level.toUpperCase()}: ${message} ${metaStr}`;
  }

  private createLogEntry(
    level: LogLevel,
    message: string,
    metadata?: Record<string, unknown>,
    request?: Request
  ): LogEntry {
    return {
      level,
      message,
      timestamp: new Date().toISOString(),
      metadata,
      userAgent: request?.headers.get('user-agent') || undefined,
      ip: request?.headers.get('x-forwarded-for') || request?.headers.get('x-real-ip') || undefined,
      url: request ? new URL(request.url).pathname : undefined,
    };
  }

  error(message: string, metadata?: Record<string, unknown>, request?: Request): void {
    if (!this.shouldLog(LogLevel.ERROR)) return;
    
    const entry = this.createLogEntry(LogLevel.ERROR, message, metadata, request);
    
    if (this.isDevelopment) {
      console.error(this.formatLog(entry));
    } else {
      // En production, envoyer vers un service de logging (Sentry, LogRocket, etc.)
      this.sendToLoggingService(entry);
    }
  }

  warn(message: string, metadata?: Record<string, unknown>, request?: Request): void {
    if (!this.shouldLog(LogLevel.WARN)) return;
    
    const entry = this.createLogEntry(LogLevel.WARN, message, metadata, request);
    
    if (this.isDevelopment) {
      console.warn(this.formatLog(entry));
    } else {
      this.sendToLoggingService(entry);
    }
  }

  info(message: string, metadata?: Record<string, unknown>, request?: Request): void {
    if (!this.shouldLog(LogLevel.INFO)) return;
    
    const entry = this.createLogEntry(LogLevel.INFO, message, metadata, request);
    
    if (this.isDevelopment) {
      console.info(this.formatLog(entry));
    } else {
      this.sendToLoggingService(entry);
    }
  }

  debug(message: string, metadata?: Record<string, unknown>, request?: Request): void {
    if (!this.shouldLog(LogLevel.DEBUG)) return;
    
    const entry = this.createLogEntry(LogLevel.DEBUG, message, metadata, request);
    
    if (this.isDevelopment) {
      console.debug(this.formatLog(entry));
    }
  }

  private async sendToLoggingService(entry: LogEntry): Promise<void> {
    try {
      // Ici vous pouvez intégrer Sentry, LogRocket, ou autre service
      if (process.env.SENTRY_DSN) {
        // Exemple d'intégration Sentry
        // Sentry.addBreadcrumb({ message: entry.message, level: entry.level });
      }
      
      // Ou sauvegarder dans un fichier local
      if (process.env.LOG_TO_FILE === 'true') {
        await this.saveToFile(entry);
      }
    } catch (error) {
      console.error('Failed to send log to external service:', error);
    }
  }

  private async saveToFile(entry: LogEntry): Promise<void> {
    // Implémentation de sauvegarde en fichier (si nécessaire)
    const fs = await import('fs/promises');
    const path = await import('path');
    
    const logDir = path.join(process.cwd(), 'logs');
    const logFile = path.join(logDir, `${new Date().toISOString().split('T')[0]}.log`);
    
    try {
      await fs.mkdir(logDir, { recursive: true });
      await fs.appendFile(logFile, this.formatLog(entry) + '\n');
    } catch (error) {
      console.error('Failed to write to log file:', error);
    }
  }

  // Méthodes utilitaires pour des cas spécifiques
  apiRequest(method: string, path: string, statusCode: number, duration: number, request?: Request): void {
    this.info('API Request', {
      method,
      path,
      statusCode,
      duration,
      success: statusCode < 400
    }, request);
  }

  apiError(method: string, path: string, error: Error, request?: Request): void {
    this.error('API Error', {
      method,
      path,
      error: error.message,
      stack: error.stack
    }, request);
  }

  securityEvent(event: string, details: Record<string, unknown>, request?: Request): void {
    this.warn('Security Event', {
      event,
      ...details
    }, request);
  }

  performanceMetric(name: string, value: number, unit: string = 'ms'): void {
    this.info('Performance Metric', {
      metric: name,
      value,
      unit
    });
  }
}

// Instance singleton
export const logger = new Logger();

// Middleware pour Next.js API routes
export function logApiRequest(req: Request, startTime: number, statusCode: number) {
  const duration = Date.now() - startTime;
  logger.apiRequest(
    req.method || 'GET',
    new URL(req.url).pathname,
    statusCode,
    duration,
    req
  );
}

export default logger;
