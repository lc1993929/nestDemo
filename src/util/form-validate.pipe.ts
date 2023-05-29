import { ArgumentMetadata, Injectable, PipeTransform, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { Code } from '/@/config/var';
import * as _ from 'lodash';
const logger = new Logger("ValidationPipe");
@Injectable()
export class FormValidatePipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata;
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value, { excludeExtraneousValues: false });
    const errors = await validate(object);
    if (errors.length > 0) {
      // 遍历全部的错误信息,返回给前端
      const errorMessage = errors.map(item => {
        return {
          currentValue: item.value,
          [item.property]: _.values(item.constraints)[0],
        };
      });
      // logger.debug(value);
      throw new HttpException({ data: errorMessage, code: Code.formError }, HttpStatus.OK);
    }
    return object;
  }

  private toValidate(metatype: any): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}