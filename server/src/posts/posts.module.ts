import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Post} from "./models/post.model";
import {JwtModule} from "@nestjs/jwt";
import {UserModule} from "../User/user.module";
import {User} from "../User/models/user.model";

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [
      SequelizeModule.forFeature([Post, User]),
      JwtModule.register({
        secret: process.env.JWT_SECRET || "SECRET"
      }),
      UserModule
  ],
})
export class PostsModule {}
