import { Module } from '@nestjs/common';
import { CommentariesService } from './commentaries.service';
import { CommentariesController } from './commentaries.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Commentary} from "./models/commetary.model";
import {JwtModule} from "@nestjs/jwt";
import {Post} from "../posts/models/post.model";
import {PostsModule} from "../posts/posts.module";

@Module({
  providers: [CommentariesService],
  controllers: [CommentariesController],
  imports: [
      SequelizeModule.forFeature([Commentary, Post]),
      JwtModule.register({
        secret: process.env.JWT_SECRET || "SECRET"
      }),
      PostsModule
  ]
})
export class CommentariesModule {}
