import { Table, Column, Model, PrimaryKey, DataType } from 'sequelize-typescript';
@Table({
  tableName: 'z_file',
})
export class FileModel extends Model<FileModel> {
  @PrimaryKey
  @Column
  id: number;
  @Column({
    type: DataType.UUID
  })
  uuid: string;
  @Column({
    type: DataType.STRING,
    comment: '文件上传原始名称'
  })
  name: string;
  @Column({
    type: DataType.STRING,
    comment: '文件后缀名，消歇'
  })
  suffix: string;
  @Column({
    type: DataType.FLOAT,
    comment: '文件大小，size单位MB'
  })
  size: number;
  @Column({
    type: DataType.STRING,
    comment: '文件MD5'
  })
  md5: string;
  @Column({
    type: DataType.STRING,
    comment: '文件路径'
  })
  path: string;
}
