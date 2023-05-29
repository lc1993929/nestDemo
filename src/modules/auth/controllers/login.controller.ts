import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from '../services/JwtAuthGuard';
import { FormValidatePipe } from '/@/pipes/form-validate.pipe';
@Controller('')
export class LoginController {
  constructor(protected authSrv: AuthService, protected jwtSrv: JwtService) {

  }
  @Get()
  getHello(): string {
    return 'hello';
  }
  @Post('login')
  public login() {
    const token = this.jwtSrv.sign({username: 'zengwe', password: '123456'});
    return token;
  }
  @UseGuards(new JwtAuthGuard())
  @UseGuards(AuthGuard('jwt'))
  @Get('user/info')
  public async userInfo() {
    return 'user info!';
  }
}
