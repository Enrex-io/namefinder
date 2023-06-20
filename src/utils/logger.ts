import { CONSOLE_LOGS_ENABLED, IS_PRODUCTION } from '@/config/config';
import { LoggingLevels } from '../types/logger';
import axios from './axios';

class Logger {
    private async log(
        level: LoggingLevels,
        message: string,
        error?: any,
        data?: any
    ) {
        if (CONSOLE_LOGS_ENABLED) {
            if (
                level === LoggingLevels.error ||
                level === LoggingLevels.critical
            ) {
                console.group(level.toLocaleUpperCase());
                console.error(message, error);
                console.groupEnd();
            }
            if (level === LoggingLevels.warning) {
                console.group(level.toUpperCase());
                console.log(message);
                console.warn(data);
                console.groupEnd();
            }
            if (level === LoggingLevels.info) {
                console.group(level.toUpperCase());
                console.info(message, data);
                console.groupEnd();
            }
            if (level === LoggingLevels.debug) {
                console.group(level.toLocaleUpperCase());
                console.log(message);
                console.dir(data);
                console.groupEnd();
            }
        }

        const dbLogsDisabled = IS_PRODUCTION && level == LoggingLevels.debug;
        if (dbLogsDisabled) return;

        try {
            await axios.post(`/api/logging/log`, {
                level,
                message,
                error: error
                    ? {
                          name: error.name,
                          message: error.message,
                          stack: error.stack,
                      }
                    : undefined,
                data,
            });
        } catch (e) {
            if (CONSOLE_LOGS_ENABLED) {
                console.error('Error sending log data to server', e);
            }
        }
    }

    critical(message: string, error: unknown) {
        this.log(LoggingLevels.critical, message, error);
    }

    error(message: string, error: unknown) {
        this.log(LoggingLevels.error, message, error);
    }

    warn(message: string, data: unknown) {
        this.log(LoggingLevels.warning, message, null, data);
    }

    info(message: string, data: unknown) {
        this.log(LoggingLevels.info, message, null, data);
    }

    debug(message: string, data: unknown) {
        this.log(LoggingLevels.debug, message, null, data);
    }
}

const logger = new Logger();
export default logger;
