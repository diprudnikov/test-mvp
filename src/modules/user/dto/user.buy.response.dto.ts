import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserBuyResponseDto {
    @ApiProperty()
    @Expose()
    totalSpent: number;

    @ApiProperty()
    @Expose()
    productPurchased: string;

    @ApiProperty()
    @Expose()
    change: number[];
}
