import { Logger as OriginLogger } from '@nestjs/common';
import { Config } from '/@/config/index';
import { resolve } from 'path';
export const Logger = {
  log(msg: string, context?: string) {
    let _temp = new Error().stack
      .split('\n')[2]
      .trim()
      .replace(resolve(Config.projectRoot, 'src'), '');
    _temp =
      '\u001b[0m' +
      '(' +
      _temp.substring(_temp.indexOf('(') + 2, _temp.indexOf(')'));
    if(typeof msg === 'object') {
      msg = JSON.stringify(msg);
    }
    OriginLogger.log(msg + _temp + ')', context);
  },
  error(msg: string, context?: string) {
    let _temp = new Error().stack
      .split('\n')[2]
      .trim()
      .replace(resolve(Config.projectRoot, 'src'), '');
    _temp =
      '\u001b[0m' +
      '(' +
      _temp.substring(_temp.indexOf('(') + 2, _temp.indexOf(')'));
    OriginLogger.error(msg + _temp + ')', context);
  }
};
