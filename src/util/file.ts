import * as Path from 'path';
import * as FS from 'fs';

interface IFolder {
  type: 'folder';
  name: string;
  path: string;
  children: (IFolder | IFileStruct)[];
}
interface IFileStruct {
  type: 'file';
  name: string;
  size: number;
  suffix: string;
  path: string;
  full: string;
}
export function isDir(path: string) {
  const _path = Path.resolve(path);
  const fileStat = FS.statSync(_path);
  return fileStat.isDirectory();
}

export function getFileSuffix(file: string) {
  const idx = file.lastIndexOf('.');
  const suffix = idx === -1 ? null : file.substring(idx + 1);
  const name = idx === -1 ? file : file.substring(0, idx);
  return { name, suffix };
}

export function createFileTree(path: string): (IFolder | IFileStruct)[] {
  const _path = Path.resolve(path);
  if (!FS.existsSync(_path)) {
    return [];
  }
  if (!isDir(_path)) return [];
  const files = FS.readdirSync(_path);
  const result: (IFolder | IFileStruct)[] = [];
  for (const file of files) {
    const fullPath = Path.resolve(_path, file);
    if (isDir(Path.resolve(_path, file))) {
      const temp: IFolder = {
        type: 'folder',
        name: file,
        path: _path,
        children: [],
      };
      temp.children = createFileTree(fullPath);
      result.push(temp);
    } else {
      const fileInfo = getFileSuffix(file);
      const fileStat = FS.statSync(fullPath);
      const temp: IFileStruct = {
        type: 'file',
        name: fileInfo.name,
        suffix: fileInfo.suffix,
        size: Math.ceil(fileStat.size / 1024),
        full: Path.resolve(_path, fileInfo.name + '.' + fileInfo.suffix),
        path: _path,
      };
      result.push(temp);
    }
  }
  return result;
}

export function flatFileTree(tree: (IFolder | IFileStruct)[]) {
  const result: IFileStruct[] = [];
  const _travel = (arr: (IFolder | IFileStruct)[]) => {
    for (const item of arr) {
      if (item.type === 'file') {
        result.push(item);
      } else {
        _travel(item.children);
      }
    }
  };
  _travel(tree);
  return result;
}
/**
 * @description 检查文件夹是否存在，不存在直接递归创建文件夹
 * @param path 
 * @returns 
 */
export function isExistOrCreate(path: string) {
  const _path = Path.resolve(path);
  if (FS.existsSync(_path)) {
    return;
  } else {
    const dirname = Path.dirname(_path);
    if (!FS.existsSync(dirname)) {
      isExistOrCreate(dirname);
    }
    FS.mkdirSync(_path);
  }
  return '-';
}

export function deleteFileOrFolder(path: string) {
  const _path = Path.resolve(path);
  if (!FS.existsSync(_path)) return;
  if (isDir(_path)) {
    const tree = createFileTree(_path);
    for (const item of tree) {
      if (item.type === 'folder') {
        deleteFileOrFolder(Path.resolve(_path, item.name));
      } else {
        FS.unlinkSync(Path.resolve(_path, item.name + '.' + item.suffix));
      }
    }
    FS.rmdirSync(_path);
  } else {
    FS.unlinkSync(_path);
  }
}

export function collect(modulePath: string) {
  const root = Path.parse(modulePath).dir;
  const files = flatFileTree(createFileTree(root))
    .filter((item) => item.suffix.toLocaleLowerCase() === 'js')
    .filter(
      (item) =>
        Path.resolve(item.path, item.name + '.' + item.suffix) !== modulePath,
    );

  const controllers: any[] = [];
  const services: any[] = [];
  for (const file of files) {
    if (file.name.match(/\.controller$/)) {
      const _tempPath = Path.resolve(file.path, file.name + '.' + file.suffix);
      const module = require(_tempPath);
      for (const controllerName in module) {
        if (controllerName.match(/Controller$/)) {
          controllers.push(module[controllerName]);
        }
      }
    }
    if (file.name.match(/\.service$/)) {
      const _tempPath = Path.resolve(file.path, file.name + '.' + file.suffix);
      const module = require(_tempPath);
      for (const name in module) {
        if (name.match(/Service$/)) {
          services.push(module[name]);
        }
      }
    }
  }
  return {
    controllers,
    services
  }
}
