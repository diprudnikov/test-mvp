import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { UserRole } from '../../../shared/enums';

export class SignUpResponseDto {
    @ApiProperty()
    @Expose()
    username: string;

    @ApiProperty()
    @Expose()
    deposit: number;

    @ApiProperty()
    @Expose()
    role: UserRole;
}
