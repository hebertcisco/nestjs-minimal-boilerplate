import {
    Module,
    NestModule,
    MiddlewareConsumer,
    RequestMethod,
} from '@nestjs/common';

import { CatsModule } from '@modules/cats/cats.module';

import { AppController } from './app.controller';
import { RolesMiddleware } from '@infra/auth/roles.middleware';
import { StatusModule } from '@modules/status/status.module';

@Module({
    imports: [CatsModule, StatusModule],
    controllers: [AppController],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(RolesMiddleware)
            .exclude(
                { path: 'status', method: RequestMethod.GET },
                { path: '/', method: RequestMethod.GET },
            )
            .forRoutes('*');
    }
}
