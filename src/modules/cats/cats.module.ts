import { Module } from '@nestjs/common';

import { CatsController } from './cats.controller';
import { CatsService } from './services/cats.service';
import { CatsServiceMock } from './tests/mocks/cats.service.mock';

import { configService } from '../../config/application.config';

@Module({
    controllers: [CatsController],
    providers: [
        {
            provide: CatsService,
            useClass: configService.isProduction()
                ? CatsService
                : CatsServiceMock,
        },
    ],
})
export class CatsModule {}
