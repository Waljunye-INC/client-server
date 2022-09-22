import {forwardRef, Module} from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./models/user.model";
import {Roles} from "../Roles/models/roles.model";
import {UserRoles} from "../models/user-roles.model";
import {AuthModule} from "../auth/auth.module";
import {APP_GUARD} from "@nestjs/core";
import {AuthGuard} from "../auth/Guards/auth.guard";

@Module({
  imports: [
      SequelizeModule.forFeature([User, Roles, UserRoles]),
      forwardRef(() => AuthModule),
  ],
  providers: [
      UserService,
      {
        provide: APP_GUARD,
        useClass: AuthGuard
      }
  ],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
