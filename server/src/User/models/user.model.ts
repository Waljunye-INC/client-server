import {Column, DataType, PrimaryKey, Table, Model} from "sequelize-typescript";
import {Payload} from "../../auth/auth.service";

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
    @Column({type: DataType.STRING, unique: false, allowNull: false, defaultValue: 'user'})
    roles: string;
}
