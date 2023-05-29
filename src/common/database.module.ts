import { Module, Global } from '@nestjs/common';
import { Config } from '/@/config';
import * as path from 'path';
import { createFileTree, flatFileTree } from '/@/util/file';
import { Sequelize } from 'sequelize-typescript';
import { Logger } from '/@/util/logger';
import fs from 'fs';

const originModelsPath = path.resolve(Config.originCodeRoot, 'models');
const modelFiles = flatFileTree(createFileTree(originModelsPath));
console.log(modelFiles)
const models = createFileTree(path.resolve(Config.projectRoot, 'dist/models'))
  .filter((item) => {
    return item.name.match(/\.+model$/g) && item.type === 'file';
  })
  .map((item: any) => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const modelExport = require(path.resolve(
      item.path,
      `${item.name}.${item.suffix}`,
    ));
    const modelName = Object.keys(modelExport).filter((_modelName) =>
      _modelName.match(/Model$/g),
    )[0];
    if (!modelName) {
      return null;
    }
    return modelExport[modelName];
  })
  .filter((item) => Boolean(item));
@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: 'SequelizeToken',
      useFactory: async () => {
        const sequelize = new Sequelize({
          dialect: 'mysql',
          host: Config.database.host,
          port: 3306,
          username: Config.database.username,
          password: Config.database.password,
          database: Config.database.database,
          logging: (sql) => {
            Logger.log(sql.replace('Executing (default):', '').trim(), 'MYSQL');
          },
        });
        sequelize.addModels(models);
        // await sequelize.sync({ alter: true });
        return sequelize;
      },
    }
  ],
  exports: [
    {
      provide: 'SequelizeToken',
      useExisting: 'SequelizeToken'
    }
  ]
})
export class DatabaseModule {}
