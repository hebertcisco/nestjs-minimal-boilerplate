import { Controller, Post, Body, Get, HttpCode } from '@nestjs/common';
import { ApiHeader } from '@nestjs/swagger';

import { CatsService } from './services/cats.service';
import { CreateCatDto } from './dto/create-cat.dto';

@ApiHeader({
    name: 'x-api-key',
    description: 'API-Key for access',
})
@Controller('cats')
export class CatsController {
    constructor(private readonly catsService: CatsService) {}

    @Get()
    @HttpCode(200)
    public findAll() {
        return this.catsService.findAll();
    }

    @Post('create')
    @HttpCode(201)
    public async create(@Body() dto: CreateCatDto) {
        return this.catsService.create(dto);
    }
}
