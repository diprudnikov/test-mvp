import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { UserRole } from '../../../shared/enums';

export class UserUpdateDto {
    @ApiProperty()
    @IsNotEmpty()
    id: string;

    @ApiPropertyOptional()
    username?: string;

    @ApiPropertyOptional()
    password?: string;

    @ApiPropertyOptional({ enum: UserRole })
    role?: UserRole;

    @ApiPropertyOptional()
    deposit?: number;
}
