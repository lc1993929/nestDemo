import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { DictListParam, DictCreateParam } from '../forms';
import { FormValidatePipe } from '/@/util/form-validate.pipe';
import { DictionaryService } from '../services/disctionary.service';
import { Code } from '/@/config/var';
import { CatchError } from '/@/util/catch-error';
@Controller('dictionary')
export class DictionaryController {
  constructor(protected dictSrv: DictionaryService) {

  }
  @Get('list')
  @CatchError('DictionaryController')
  public async list(@Query(new FormValidatePipe()) param: DictListParam) {
    const result = await this.dictSrv.getList(param);
    return {code: Code.ok, data: result};
  }
  @Post('create')
  @CatchError('DictionaryController')
  public async create(@Body(new FormValidatePipe()) form: DictCreateParam) {
    try {
      
    } catch (error) {
      
    }
  }
  @Post('update')
  @CatchError('DictionaryController')
  update() {

  }
  @Delete()
  @CatchError('DictionaryController')
  delete() {
    
  }
}
