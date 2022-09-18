#!/usr/bin/env node
import 'reflect-metadata';
import 'dotenv/config';

import helmet from 'helmet';
import bodyParser from 'body-parser';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

import { NestFactory } from '@nestjs/core';

import compression from 'compression';
import morgan from 'morgan';

import type { INestApplication } from '@nestjs/common';

import { AppModule } from '@modules/app/app.module';
import { StatusService } from '@modules/status/status.service';

import { configService } from '@config/application.config';
import { PORT } from '@shared/constants/global';

import { StatusEnum } from '@modules/status/status.enum';
import * as pkg from '../package.json';

async function bootstrap(): Promise<void> {
    const app: INestApplication = await NestFactory.create(AppModule);

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

        await app.listen(PORT);
        app.get(StatusService).Status = StatusEnum.online;
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
