import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Post} from "../../posts/models/post.model";
import {User} from "../../User/models/user.model";

interface CommentaryCreationAttrs{
    postId: number;
    userId: number;
    text: string;
}
@Table({tableName: 'commentaries'})
export class Commentary extends Model<Commentary, CommentaryCreationAttrs>{

    @ForeignKey(() => Post)
    @Column({type: DataType.INTEGER, unique: false, allowNull: false})
    postId: number;
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, unique: false, allowNull: false})
    userId: number

    @Column({type : DataType.TEXT,unique: false, allowNull: false})
    text: string;

}
