import { PassportStrategy } from '@nestjs/passport';
// import { Strategy } from 'passport-local';
import {
  Injectable,
  Global,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Logger } from '/@/util/logger';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Config } from '/@/config';
@Injectable()
@Global()
export class LocalStrategyService extends PassportStrategy(Strategy) {
  constructor(readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: Config.jwt.secret,
    });
    this.authService = authService;
  }


  async validate(payload: any) {
    Logger.log(payload, 'LocalStrategyService');
    return { userId: payload.sub, username: payload.username };
  }
}
