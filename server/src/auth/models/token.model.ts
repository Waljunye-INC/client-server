import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "../../User/models/user.model";

interface TokenCreationInterface{
    userId: number;
    refreshToken: string;
}
@Table({tableName: "tokens"})
export class Token extends Model<Token, TokenCreationInterface>{

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false, unique: true})
    userId: number;

    @Column({type: DataType.STRING(1000), allowNull: false, unique: true})
    refreshToken: string;
}
