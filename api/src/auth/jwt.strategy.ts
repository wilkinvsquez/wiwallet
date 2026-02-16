import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from '../interfaces/auth';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'SECRET_KEY_CAMBIAR_LUEGO'
    });
  }

  /**
   * Validate method to validate JWT token
   * @param payload JWT token payload
   * @returns JWT token payload
   */
  validate(payload: JwtPayload) {
    return { userId: payload.sub, email: payload.email };
  }
}
