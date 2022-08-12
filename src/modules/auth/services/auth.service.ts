import * as bcrypt from 'bcryptjs';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../user/entities/user.entity';
import { UserService } from '../../user/services/user.service';
import { SignUpDto } from '../dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<Partial<User>> {
    const user: User = await this.usersService.getByUserName(username);
    if (await bcrypt.compare(password, user?.password)) {
      const { password: _password, ...result } = user;
      return result;
    }
    throw new BadRequestException('User was not found or invalid password');
  }

  async login(user: Partial<User>) {
    const jwtPayload = { role: user.role, sub: user.id };
    return {
      access_token: this.jwtService.sign(jwtPayload),
      role: user.role,
    };
  }

  async signUp(signUpDto: SignUpDto): Promise<User> {
    const hash = await bcrypt.hash(signUpDto.password, 10);
    return this.usersService.create({
      ...signUpDto,
      password: hash
    });
  }
}
