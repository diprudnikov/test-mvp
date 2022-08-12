import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserResponseDto {
    @ApiProperty()
    @Expose()
    id: string;

    @ApiProperty()
    @Expose()
    username: string;

    @ApiProperty()
    @Expose()
    role: string;

    @ApiProperty()
    @Expose()
    deposit: number;
}
