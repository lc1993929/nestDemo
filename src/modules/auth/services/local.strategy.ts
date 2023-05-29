import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Logger } from '/@/util/logger';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({secretOrKey: 'secretKey'});
  }

  async validate(username: string, password: string): Promise<any> {
    Logger.log(`9000`, 'AuthService');
  }
}