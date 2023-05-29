import { IsString, IsInt, MinLength, MaxLength, Allow, validate, Contains, IsIn, IsOptional } from 'class-validator';
import { Type, Transform, Expose } from "class-transformer";
import { FormListBase } from '/@/util/form-list.base';
import { Optional } from '@nestjs/common';

/**
 * @description 获取列表参数
 */
export class DictListParam extends FormListBase{
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  type: number;
}

export class DictDeleteParam {
  @Type(() => Number)
  @IsInt()
  id: number;
}

export class DictUpdateParam {
  @Type(() => Number)
  @IsInt()
  id: number;
  @Type(() => Number)
  @IsInt()
  @Optional()
  type: number;
  @IsString()
  @MinLength(2)
  @MaxLength(10)
  @Optional()
  label: string;
  @IsInt()
  @Type(() => Number)
  @Optional()
  value: number;
}

export class DictCreateParam {
  @Type(() => Number)
  @IsInt()
  type: number;
  @IsString()
  @MinLength(2)
  @MaxLength(10)
  label: string;
  @IsInt()
  @Type(() => Number)
  value: number;
}

