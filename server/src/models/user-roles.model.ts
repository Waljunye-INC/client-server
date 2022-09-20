import {Column, DataType, ForeignKey, Model, PrimaryKey, Table} from "sequelize-typescript";
import {User} from "../User/models/user.model";
import {Roles} from "../Roles/models/roles.model";

@Table({tableName: 'user_roles', updatedAt: false, createdAt: false})
export class UserRoles extends Model<UserRoles>{

    @Column({type: DataType.INTEGER, primaryKey: true, unique: true, allowNull: false, autoIncrement: true})
    id: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, unique: false})
    userId: number;

    @ForeignKey(() => Roles)
    @Column({type: DataType.INTEGER, unique: false})
    roleId: number;
}
