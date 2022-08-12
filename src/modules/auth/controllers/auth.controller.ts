import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { LoginDto } from '../dto/login.dto';
import { LoginResponseDto } from '../dto/login.response.dto';
import { SignUpDto } from '../dto/signup.dto';
import { SignUpResponseDto } from '../dto/signup.response.dto';
import { AuthService } from '../services/auth.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOkResponse({ type: LoginResponseDto })
  @ApiBody({ type: [LoginDto] })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<LoginResponseDto> {
    const result = await this.authService.login(req.user);
    return plainToClass(LoginResponseDto, result, { excludeExtraneousValues: true });
  }

  @ApiOkResponse({ type: SignUpResponseDto })
  @Post('signup')
  async signUp(@Body() body: SignUpDto): Promise<SignUpResponseDto> {
    const result = await this.authService.signUp(body);
    return plainToClass(SignUpResponseDto, result, { excludeExtraneousValues: true });
  }
}
