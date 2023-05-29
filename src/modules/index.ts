import { Module } from '@nestjs/common';
import { createFileTree } from '/@/util/file';
import * as path from 'path';
const modules = createFileTree(__dirname)
  .filter((item) => {
    if (item.type !== 'folder') {
      return false;
    }
    const find = item.children.find((item) => item.name === 'index.module');
    return Boolean(find);
  })
  .map((item: any) => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const modelExport = require(path.resolve(
      item.path,
      `${item.name}`,
      'index.module.js',
    ));
    const modelName = Object.keys(modelExport).filter((_modelName) =>
      _modelName.match(/Module$/g),
    )[0];
    if (!modelName) {
      return null;
    }
    return modelExport[modelName];
  })
  .filter((item) => Boolean(item));
@Module({
  imports: modules,
  controllers: [],
  providers: [],
})
export class ModulesModule {}
