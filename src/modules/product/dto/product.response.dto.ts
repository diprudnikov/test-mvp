import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ProductResponseDto {
    @Expose()
    @ApiProperty()
    id: string;

    @Expose()
    @ApiProperty()
    productName: string;

    @Expose()
    @ApiProperty()
    amountAvailable: number;

    @Expose()
    @ApiProperty()
    cost: number;
}
