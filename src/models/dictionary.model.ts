import { Table, Column, Model, PrimaryKey, DataType, Default } from 'sequelize-typescript';
@Table({
  tableName: 'z_dictionary',
})
export class DictionaryModel extends Model<DictionaryModel> {
  @PrimaryKey
  @Column
  id: number;
  @Column({
    comment: '字典类型',
    type: DataType.INTEGER
  })
  type: number;
  @Column({
    comment: '字典标签名',
    type: DataType.STRING
  })
  label: string;
  @Column({
    comment: '标签对应value',
    type: DataType.INTEGER
  })
  value: number;
  @Column({
    comment: '标签状态',
    type: DataType.INTEGER
  })
  status: number;
  @Default(1)
  @Column({
    comment: '是否删除, 1: 正常2，删除',
    type: DataType.INTEGER,
  })
  isDelete: number;
}
