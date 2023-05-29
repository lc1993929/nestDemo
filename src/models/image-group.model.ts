import { Table, Column, Model, PrimaryKey } from 'sequelize-typescript';
@Table({
  tableName: 'z_image_group',
})
export class ImageGroupModel extends Model<ImageGroupModel> {
  @PrimaryKey
  @Column
  id: number;
  @Column
  name: string;
  @Column
  score: number;
}
