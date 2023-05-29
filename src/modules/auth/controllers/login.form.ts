import { IsString, IsInt, MinLength, MaxLength, Allow, validate, Contains, IsIn, IsOptional } from 'class-validator';
import { Transform } from "class-transformer";
import { trim } from '/@/util/tools';

export class LoginForm {
  username: string;
  password: string;
}

export class CheckLoginForm {
  token: string;
}

export class RegisterForm {
  @MinLength(6, {message: '用户名长度大于6个字符'})
  @MaxLength(18, {message: '用户名长度小于6个字符'})
  @Transform(({ value }) => trim(value))
  username: string;
  @MinLength(6, {message: '用户名长度大于6个字符'})
  @MaxLength(18, {message: '用户名长度小于6个字符'})
  @Transform(({ value }) => trim(value))
  password: string;
}
export class GetUserInfoByTokenForm {
  @Transform(({ value }) => trim(value))
  token: string;
}