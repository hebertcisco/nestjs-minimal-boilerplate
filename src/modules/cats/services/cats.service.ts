import { Injectable } from '@nestjs/common';
import crypto from 'node:crypto';
import { CrudBase } from 'nest-shared';

import type { Cat } from '@modules/cats/interfaces/cat.interface';
import type { CreateCatDto } from '@modules/cats/dto/create-cat.dto';

@Injectable()
export class CatsService implements CrudBase {
    private cats: Map<string, Cat> = new Map<string, Cat>();

    public async create(dto: CreateCatDto): Promise<Cat> {
        this.cats.set(crypto.randomUUID(), dto);
        return Promise.resolve(dto);
    }

    public async findAll(): Promise<Cat[]> {
        const catsList: Cat[] = [];
        this.cats.forEach((cat) => catsList.push(cat));
        return Promise.resolve(catsList);
    }
}
