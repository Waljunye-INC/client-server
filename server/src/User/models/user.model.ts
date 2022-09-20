import {Column, DataType, PrimaryKey, Table, Model, BelongsToMany} from "sequelize-typescript";
import {Payload} from "../../auth/auth.service";
import {UserRoles} from "../../models/user-roles.model";
import {Roles} from "../../Roles/models/roles.model";

interface UserCreationAttrs{
    email: string;
    password: string
}
@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> implements Payload{
    @PrimaryKey
    @Column({type: DataType.INTEGER, allowNull: false, autoIncrement: true, unique: true})
    id: number;
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;
    @Column({type: DataType.STRING, unique: false, allowNull: false})
    password: string;

    @BelongsToMany(() => Roles, () => UserRoles, 'userId')
    roles: Roles[];
}
