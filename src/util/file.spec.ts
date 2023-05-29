import {
  createFileTree,
  // getFileSuffix,
  // isExistOrCreate,
  // deleteFileOrFolder,
  flatFileTree,
} from './file';
import { resolve } from 'path';
describe('file.ts', () => {
  it('dd', () => {
    const result = createFileTree(resolve('./', 'src'));
    // console.log(JSON.stringify(result, undefined, '\t'));
    // isExistOrCreate(resolve('/cache/zengwe/name/dddd'));
    // deleteFileOrFolder(resolve('/cache/zengwe'));
    // console.log(getFileSuffix('zengwe.com'));
    flatFileTree(result);
  });
});
