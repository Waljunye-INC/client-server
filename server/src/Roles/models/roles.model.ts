import {BelongsToMany, Column, DataType, Model, PrimaryKey, Table} from "sequelize-typescript";
import {User} from "../../User/models/user.model";
import {UserRoles} from "../../models/user-roles.model";

interface RoleCreationAttrs{
    value: string;
    description?: string;
}
@Table({tableName: 'roles', createdAt: false, updatedAt: false})
export class Roles extends Model<Roles, RoleCreationAttrs>{

    @Column({type: DataType.STRING, unique:true, allowNull: false})
    value: string;

    @Column({type: DataType.STRING(1000), unique: false, allowNull: true})
    description: string

    @BelongsToMany(() => User, () => UserRoles, 'roleId')
    users: User[];

}
