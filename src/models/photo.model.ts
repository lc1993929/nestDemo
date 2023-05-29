import { Table, Column, Model, PrimaryKey, DataType } from 'sequelize-typescript';
@Table({
  tableName: 'z_photo',
})
export class PhotoModel extends Model<PhotoModel> {
  @PrimaryKey
  @Column
  id: number;
  @Column({
    comment: '名称',
    type: DataType.STRING
  })
  name: string;
  @Column({
    type: DataType.DATE,
    comment: '拍摄时间'
  })
  shootingDate: string;
  @Column({
    comment: '拍摄者',
    type: DataType.STRING
  })
  shootByName: string;
  @Column({
    comment: '拍摄地址',
    type: DataType.STRING
  })
  shootByAddress: string;
  @Column({
    comment: '拍摄经度',
    type: DataType.FLOAT,
  })
  lat: string;
  @Column({
    comment: '拍摄维度',
    type: DataType.FLOAT
  })
  lng: string;
  @Column({
    comment: '照片类型, 0: 未知，1:人物，2: 风景',
    type: DataType.INTEGER
  })
  type: number;
  @Column({
    comment: '描述',
    type: DataType.TEXT
  })
  describe: string;
  @Column({
    comment: '关键字',
    type: DataType.STRING
  })
  keyworkds: string;
}
