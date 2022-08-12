import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ProductCreateDto {
    @ApiProperty()
    @IsNotEmpty()
    productName: string;

    @ApiProperty()
    @IsNotEmpty()
    amountAvailable: number;

    @ApiProperty()
    @IsNotEmpty()
    cost: number;


    @ApiProperty()
    @IsNotEmpty()
    sellerId: string;
}
