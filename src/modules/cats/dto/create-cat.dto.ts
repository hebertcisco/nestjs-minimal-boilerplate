import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

import { Cat } from '@modules/cats/interfaces/cat.interface';

import chance from '../../../shared/mocks/chance';

export class CreateCatDto implements Cat {
    @ApiProperty({ required: true, default: chance.animal() })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ required: true, default: chance.age() })
    @IsNumber()
    @IsNotEmpty()
    age: number;

    @ApiProperty({ required: true, default: 'Abyssinian' })
    @IsString()
    @IsNotEmpty()
    breed: string;
}
