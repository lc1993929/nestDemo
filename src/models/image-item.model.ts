import { Table, Column, Model, PrimaryKey } from 'sequelize-typescript';
@Table({
  tableName: 'z_image_item',
})
export class ImageItemModel extends Model<ImageItemModel> {
  @PrimaryKey
  @Column
  id: number;
  @Column
  name: string;
  @Column
  idx: number;
  @Column
  groupId: number;
  @Column
  fileId: number;
}
