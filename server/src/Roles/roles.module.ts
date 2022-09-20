import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Roles} from "./models/roles.model";
import {UserModule} from "../User/user.module";
import {User} from "../User/models/user.model";
import {UserRoles} from "../models/user-roles.model";

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [SequelizeModule.forFeature([User, Roles, UserRoles]), UserModule],
  exports: [RolesService]
})
export class RolesModule {}
