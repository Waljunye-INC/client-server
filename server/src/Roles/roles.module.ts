import {forwardRef, Module} from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Roles} from "./models/roles.model";
import {UserModule} from "../User/user.module";
import {User} from "../User/models/user.model";
import {UserRoles} from "../models/user-roles.model";
import {AuthModule} from "../auth/auth.module";
import {JwtModule} from "@nestjs/jwt";

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [
      SequelizeModule.forFeature([User, Roles, UserRoles]),
      UserModule,
      forwardRef(() => AuthModule),
  ],
  exports: [RolesService]
})
export class RolesModule {}
