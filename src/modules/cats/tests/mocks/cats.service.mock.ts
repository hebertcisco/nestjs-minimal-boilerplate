import { Injectable } from '@nestjs/common';
import crypto from 'node:crypto';

import chance from '../../../../shared/mocks/chance';
import type { Cat } from '@modules/cats/interfaces/cat.interface';

@Injectable()
export class CatsServiceMock {
    private cats: Map<string, Cat> = new Map<string, Cat>();

    public constructor() {
        for (let age = 0; age < 9; age++) {
            this.cats.set(crypto.randomUUID(), {
                name: chance.name().split(' ')[0],
                age: age,
                breed: 'Abyssinian',
            });
        }
    }

    public create(cat: Cat): Promise<Cat> {
        this.cats.set(crypto.randomUUID(), cat);
        return Promise.resolve(cat);
    }

    public findAll(): Cat[] {
        const catsList: Cat[] = [];
        this.cats.forEach((cat) => catsList.push(cat));
        return catsList;
    }
}
