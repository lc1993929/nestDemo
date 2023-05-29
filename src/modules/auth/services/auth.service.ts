import { Injectable, Global } from '@nestjs/common';
import { Logger } from '/@/util/logger';
import { JwtService } from '@nestjs/jwt';

@Global()
@Injectable()
export class AuthService {
  constructor() {
  }

  /**
   * validate user name and password
   * @param username
   * @param password
   */
  async validate(username: string, password: string) {
    Logger.log(`9000`, 'AuthService');
  }
  validateUser() {
    Logger.log(`9000`, 'AuthService');
  }
  public getToken() {
    // const accessToken = this.jwtService.sign({username: 'zengwe', password: '123456'}, {secret: 'secretKey'});
    // const refreshToken = this.jwtService.sign({username: 'zengwe', password: '123456'}, {
    //     secret: 'secretKey'
    // });
    // console.log(this.jwtService.decode('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Inplbmd3ZSIsInBhc3N3b3JkIjoiMTIzNDU2IiwiaWF0IjoxNjgyNjY1NTMxfQ.xbE_hMg1I88JmlwVHBwTzCPD58tRZw9u7bBG87o-tno'))
    // console.log(this.jwtService.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Inplbmd3ZSIsInBhc3N3b3JkIjoiMTIzNDU2IiwiaWF0IjoxNjgyNjY1NTMxfQ.xbE_hMg1I88JmlwVHBwTzCPD58tRZw9u7bBG87o-tno'))
    return {};
  }
}