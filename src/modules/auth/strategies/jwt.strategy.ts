import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWT_AUTH } from '../../../config/global.env';
import { JwtPayload } from '../types/interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_AUTH.JWT_SECRET_KEY,
    });
  }

  async validate({ username, role }: JwtPayload) {
    return { username, role };
  }
}
