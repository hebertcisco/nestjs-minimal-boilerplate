import { Module } from '@nestjs/common';

import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { CatsServiceMock } from '@modules/cats/tests/mocks/cats.service.mock';

import { configService } from '@config/application.config';

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
