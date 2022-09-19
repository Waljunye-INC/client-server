import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {UserModule} from "../User/user.module";
import {SequelizeModule} from "@nestjs/sequelize";
import {Token} from "./models/token.model";
import {User} from "../User/models/user.model";
import {JwtModule} from "@nestjs/jwt";

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
      UserModule,
      SequelizeModule.forFeature([Token, User]),
      JwtModule.register({
        secret: process.env.JWT_SECRET || "SECRET"
      })
  ]
})
export class AuthModule {}
