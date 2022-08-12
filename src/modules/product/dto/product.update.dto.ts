import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ProductUpdateDto {
    @ApiProperty()
    id: string;

    @ApiPropertyOptional()
    productName?: string;

    @ApiPropertyOptional()
    amountAvailable?: number;

    @ApiPropertyOptional()
    cost?: number;
}
