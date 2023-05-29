import { Module, SetMetadata } from '@nestjs/common';
import { MODULE_PATH } from '@nestjs/common/constants';
import { LoginController } from './controllers/login.controller';
import { collect } from '/@/util/file';
import { PassportModule } from "@nestjs/passport"
import { LocalStrategy } from './services/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { Config } from '/@/config';
import { JwtAuthGuard } from './services/JwtAuthGuard';
const modules = collect(__filename);
@SetMetadata(MODULE_PATH, 'auth')
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: Config.jwt.secret,
      signOptions: { expiresIn: '1d' }
    })
  ],
  controllers: [...modules.controllers],
  providers: [...modules.services, LocalStrategy],
  exports: [],
})
export class AuthModule {}
