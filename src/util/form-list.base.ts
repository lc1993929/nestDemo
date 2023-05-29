import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';
export class FormListBase {
  @Type(() => Number)
  @IsInt()
  @Min(1, { message: '页码不合法' })
  page: number = 1;
  @Type(() => Number)
  @IsInt()
  @Min(1, { message: '每页显示数量不合法' })
  pageSize: number = 20;
}