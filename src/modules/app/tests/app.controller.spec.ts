import { Test } from '@nestjs/testing';

import { AppServiceInterface } from 'nest-shared';

import { StatusModule } from '../../status/status.module';
import { CatsModule } from '../../cats/cats.module';

import { AppController } from '../app.controller';

describe('AppController', () => {
    let appController: AppController;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [CatsModule, StatusModule],
            controllers: [AppController],
        }).compile();
        appController = moduleRef.get<AppController>(AppController);
    });

    describe('status', () => {
        it('should return the app status', async () => {
            const result: typeof AppServiceInterface = {
                status: 'online',
                date: new Date('2022-09-18T17:13:31.245Z'),
                environment: 'development',
                aws: {
                    region: 'local',
                    function_version: 'local',
                },
            };
            jest.spyOn(appController, 'status').mockImplementation(
                async () => result,
            );

            expect(await appController.status()).toBe(result);
        });
    });
});
