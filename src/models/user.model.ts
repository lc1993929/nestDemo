import { Table, Column, Model, PrimaryKey } from 'sequelize-typescript';
@Table({
  tableName: 'z_user',
})
export class UserModel extends Model<UserModel> {
  @PrimaryKey
  @Column
  id: number;
  @Column
  userName: string;
  @Column
  password: string;
}
