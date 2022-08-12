import { ApiProperty } from '@nestjs/swagger';
import { IsIn } from 'class-validator';

export class UserDepositDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    @IsIn([5, 10, 20, 50, 100])
    deposit: number;
}
