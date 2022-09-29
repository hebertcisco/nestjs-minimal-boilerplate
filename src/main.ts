#!/usr/bin/env node
import 'reflect-metadata';
import 'dotenv/config';

import helmet from 'helmet';
import bodyParser from 'body-parser';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';

import { NestFactory } from '@nestjs/core';

import compression from 'compression';
import morgan from 'morgan';

import type { INestApplication } from '@nestjs/common';
import type { Server } from 'node:http';

import { AppModule } from '@modules/app/app.module';
import { StatusService } from '@modules/status/status.service';

import { configService } from '@config/application.config';
import { PORT } from '@shared/constants/global';

import { StatusEnum } from '@modules/status/status.enum';
import * as pkg from '../package.json';
import { gracefulShutdown } from '@shared/events/gracefulShutdown';
import { ShutdownEnum } from '@shared/enums/ShutdownEnum';

async function bootstrap(): Promise<void> {
    const app: INestApplication = await NestFactory.create(AppModule);
    const logger: Logger = new Logger(bootstrap.name);

    try {
        app.useGlobalPipes(
            new ValidationPipe({
                transform: true,
            }),
        );
        app.enableCors();
        app.use(helmet());
        app.use(compression());
        app.use(bodyParser.json({ limit: '15mb' }));
        app.use(bodyParser.urlencoded({ limit: '15mb', extended: true }));
        app.use(
            morgan(
                ':date[iso] HTTP/:http-version :method :url :status :response-time ms',
            ),
        );
        if (!configService.isProduction()) {
            const config = new DocumentBuilder()
                .setTitle(pkg.name)
                .setDescription(pkg.description)
                .setVersion(pkg.version)
                .setTitle(pkg.name)
                .build();
            const document = SwaggerModule.createDocument(app, config);
            SwaggerModule.setup('docs', app, document);
        }

        const server: Server = await app.listen(PORT);

        app.get(StatusService).Status = StatusEnum.online;
        process.on('SIGINT', gracefulShutdown(server, 'SIGINT'));
        process.on('SIGTERM', gracefulShutdown(server, 'SIGTERM'));
        process.on('exit', (code) => {
            logger.verbose(`Exit signal received. Code: ${code}`);
        });
        process.on(ShutdownEnum.uncaughtException, (error, origin) => {
            logger.verbose(`\n${origin} signal received.\n${error}`);
            app.get(StatusService).Status = StatusEnum.offline;
        });
        process.on(ShutdownEnum.unhandledRejection, (error, origin) => {
            if (error) logger.error(JSON.stringify(error));
            logger.error(`\n${origin} signal received.\n${error}`);
            logger.error(
                `\n${ShutdownEnum.unhandledRejection} signal received.\n${error}`,
            );
            app.get(StatusService).Status = StatusEnum.offline;
        });
    } catch (error) {
        app.get(StatusService).Status = StatusEnum.offline;
    }
}

((): void => {
    bootstrap()
        .then(() => {
            process.stdout.write(`Listening on port ${PORT}...\n`);
        })
        .catch((err) => {
            process.stderr.write(`Error: ${err.message}\n`);
            process.exit(1);
        });
})();
