import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { UserRole } from '../../../shared/enums';

export class LoginResponseDto {
    @ApiProperty()
    @Expose()
    access_token: string;

    @ApiProperty()
    @Expose()
    role: UserRole;
}
