import { Injectable, Inject } from '@nestjs/common';
import { DictionaryModel } from '/@/models/dictionary.model';
import { Op, WhereOptions, FindOptions } from 'sequelize';
import { Sequelize, ModelCtor } from 'sequelize-typescript';
import { Unexpect } from '/@/util/unexpect';

const DICTIONARY_MODEL = 'DictionaryModel';
@Injectable()
export class DictionaryService {
  protected dictModelCtl: ModelCtor<DictionaryModel>;
  constructor(
    @Inject('SequelizeToken') protected sql: Sequelize
  ) {
    this.dictModelCtl = this.sql.model(DICTIONARY_MODEL) as any;
  }
  /**
   * @description 获取字典列表
   * @param param 
   */
  public async getList(param: IGetListFilter) {
    const findOption: FindOptions<DictionaryModel> = {where: {
      isDelete: 1,
    }};
    if(param.pageSize) {
      findOption.limit = param.pageSize;
    }
    if(param.page) {
      findOption.offset = (param.page - 1) * param.pageSize;
    }
    if(param.type) {
      findOption.where['type'] = {
        [Op.eq]: param.type
      }
    }
    const list = await this.dictModelCtl.findAll(findOption) as DictionaryModel[];
    const total = await this.dictModelCtl.count();
    return {
      list,
      total
    }
  }
  
  public async update(id: number, data: Partial<DictionaryModel>) {
    const isExist = await this.dictModelCtl.findOne({where: {id: id, isDelete: 1}});
    if(!isExist) {
      throw new Unexpect('not_found', {model: DICTIONARY_MODEL, operate: 'update', param: {id: id}});
    }
    const findOption = {
      where: {
        id: id,
        isDelete: 1
      }
    }
    await this.dictModelCtl.update(data, findOption);
    const value = await this.dictModelCtl.findOne(findOption);
    return value;
  }
  public async delete(id: number) {
    const isExist = await this.dictModelCtl.findOne({where: {id: id, isDelete: 1}});
    if(!isExist) {
      throw new Unexpect('not_found', {model: DICTIONARY_MODEL, operate: 'update', param: {id: id}});
    }
    const [ count ] =  await this.dictModelCtl.update({isDelete: 2}, {where: {id: id, isDelete: 1}});
    if(count > 0) {
      return true;
    }
    return false;
  }
  public async create(param: ICreateParam) {
    const find = await this.dictModelCtl.findOne({
      where: {
        type: param.type,
        value: param.type,
        isDelete: 1
      }
    });
    if(find) {
      throw new Unexpect('exist', {operate: 'create',model: DICTIONARY_MODEL, param: param});
    }
    const result = await this.dictModelCtl.create(Object.assign(param, {isDelete: 1}));
    return result;
  }
}
export interface IGetListFilter {
  type: number;
  pageSize: number;
  page: number;
}
export interface ICreateParam {
  type: number;
  label: string;
  value: number;
  status: number;
}