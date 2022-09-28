import {BelongsTo, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table} from "sequelize-typescript";
import {User} from "../../User/models/user.model";
import {Commentary} from "../../commentaries/models/commetary.model";
import {Type} from "class-transformer";

export interface PostCreationAttrs{
    userId: number;
    title: string;
    text: string;
}

@Table({tableName: 'posts'})
export class Post extends Model<Post, PostCreationAttrs>{

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, unique:false, allowNull: false})
    userId: number;

    @Column({type: DataType.STRING, allowNull: false, unique: true})
    title: string;

    @Column({type: DataType.TEXT, allowNull: false, unique: false})
    text: string;

    @HasMany(() => Commentary, 'postId')
    commentaries: Commentary[]
}
