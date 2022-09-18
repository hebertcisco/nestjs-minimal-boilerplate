import request from 'supertest';

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/status (GET)', () => {
        return request(app.getHttpServer()).get('/status').expect(200).expect({
            name: 'nestjs-minimal-boilerplate',
            version: '0.0.1',
            creator: 'Hebert Barros <hebert@hotbrains.com.br>',
            status: 'online',
        });
    });
});
