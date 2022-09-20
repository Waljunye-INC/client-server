import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./models/user.model";
import {Roles} from "../Roles/models/roles.model";
import {UserRoles} from "../models/user-roles.model";

@Module({
  imports: [SequelizeModule.forFeature([User, Roles, UserRoles])],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
