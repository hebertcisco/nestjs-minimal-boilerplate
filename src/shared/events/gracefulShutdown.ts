import { Logger } from '@nestjs/common';
import type { Server } from 'node:http';

export function gracefulShutdown(server: Server, code: string) {
    const logger = new Logger(gracefulShutdown.name);
    return (event: string) => {
        logger.verbose(`${event} signal received with code ${code}`);
        logger.log('Closing http server...');
        server.close(() => {
            logger.log('Http server closed.');
            logger.log('Closed MongoDB connection...');
            process.exit(0);
        });
    };
}
