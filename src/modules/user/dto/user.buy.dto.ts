import { ApiProperty } from '@nestjs/swagger';

export class UserBuyDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    productId: string;

    @ApiProperty()
    amount: number;
}
