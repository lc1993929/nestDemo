import * as path from 'path';
const ENV: 'development' | 'product' = process.env.NODE_ENV as any;
/**
 * @description 代码执行的平台
 */
const PLATFORM: "mac"|"company"|'home'|'ubuntu' = process.env.PLATFORM_ENV as any;
const SQL: 'mac'|'ubuntu' = process.env.SQL_ENV as any || 'ubuntu';
const projectRoot = path.resolve('./');
const sqlConfig: {[key in typeof SQL]: any} = {
  mac: {
    host: 'localhost',
    username: 'root',
    password: '!Zengwe8261501990',
    database: ENV === 'development' ? 'zengwe-data-dev' : 'zengwe-data',
  },
  ubuntu: {
    host: 'zengwe.com',
    username: 'root',
    password: 'erA%EP#q&jJEn84J',
    database: ENV === 'development' ? 'zengwe-data-dev' : 'zengwe-data',
  }
}

export const Config = {
  env: ENV,
  platform: PLATFORM,
  projectRoot: projectRoot,
  originCodeRoot: path.resolve(projectRoot, 'src'),
  cacheRoot: path.resolve(projectRoot, 'cache'),
  database: sqlConfig[SQL],
  storeFileRoot: ENV === 'development' ? path.resolve(projectRoot, 'store') : '',
  chrome: {
    start: false
  },
  jwt: {
    secret: 'iIw^b*noOgL3bAxE'
  }
};
