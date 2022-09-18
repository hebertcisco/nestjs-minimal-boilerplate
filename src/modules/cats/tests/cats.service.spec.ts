import { Test, TestingModule } from '@nestjs/testing';

import { CatsService } from '../services/cats.service';

import { CatsServiceMock } from './mocks/cats.service.mock';

describe('CatsService', () => {
    let catsService: CatsService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: CatsService,
                    useClass: CatsServiceMock,
                },
            ],
        }).compile();

        catsService = module.get<CatsService>(CatsService);
    });

    describe('CatsService methods', () => {
        it('should must create a cat', async () => {
            const expectedResult = {
                name: 'Pereba',
                age: 3,
                breed: 'Bombay',
            };
            const result = await catsService.create({
                ...expectedResult,
            });

            expect(result.name).toBe(expectedResult.name);
            expect(result.age).toBe(expectedResult.age);
            expect(result.breed).toBe(expectedResult.breed);
        });
        it('should must return the breed', async () => {
            const expectedResult = 'Abyssinian';
            const result = await catsService.findAll();
            expect(result[0].breed).toBe(expectedResult);
        });
    });
});
