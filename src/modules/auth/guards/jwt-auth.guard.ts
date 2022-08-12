import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JWT_AUTH } from '../../../config/global.env';

@Injectable()
export class JwtAuthGuard extends AuthGuard(JWT_AUTH.PASSPORT_STRATEGY) {}
