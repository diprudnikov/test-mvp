import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { UserRole } from '../../../shared/enums';

export class UserCreateDto {
    @ApiProperty()
    @IsNotEmpty()
    username: string;

    @ApiProperty()
    @IsNotEmpty()
    password: string;

    @ApiProperty({ enum: UserRole })
    @IsNotEmpty()
    role: UserRole;
}
