import { Logger } from './logger';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Code } from '/@/config/var';
type ErrorType = 'type' | 'not_found' | 'unkown' | 'exist';

export class Unexpect extends Error {
  constructor(protected type: ErrorType,protected info: any =  '',protected exit = false) {
    super();
    info = (() => {
      try {
        return JSON.stringify(info);
      } catch (error) {
        return info;
      }
    })(); 
    Logger.error(`${type} ${info}`, 'ERROR');
    if(exit) {
      throw new HttpException({code: Code.unkown, data: null}, HttpStatus.OK);
    }
  }
}