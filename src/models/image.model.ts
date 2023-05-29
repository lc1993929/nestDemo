import { Table, Column, Model, PrimaryKey, DataType } from 'sequelize-typescript';
@Table({
  tableName: 'z_image',
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
    comment: '关键字',
    type: DataType.STRING
  })
  keywords: string;
}