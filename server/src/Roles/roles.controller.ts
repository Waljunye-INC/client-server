import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {RolesService} from "./roles.service";
import {RoleCreationDto} from "./dto/role-creation.dto";
import {RoleDeleteDto} from "./dto/role-delete.dto";
import {AddRoleToUserDto} from "./dto/add-role-to-user.dto";

@Controller('roles')
export class RolesController {
    constructor(private rolesService: RolesService) {}

    @Get(":id")
    async getRoleById(@Param('id') id: number){
        return await this.rolesService.getRoleById(id);
    }

    @Get("")
    async getRoleByValue(@Body('value') value: string){
        return await this.rolesService.getRoleByValue(value);
    }

    @Post('create')
    async createRole(@Body() roleCreationDto: RoleCreationDto){
        return await this.rolesService.createRole(roleCreationDto);
    }
    @Post('delete')
    async deleteRole(@Body() roleDeleteDto: RoleDeleteDto){
        return await  this.rolesService.deleteRole(roleDeleteDto);
    }
    @Post('addtouser')
    async addRoleToUser(@Body()addRoleToUserDto: AddRoleToUserDto){
        return await this.rolesService.addRoleToUser(addRoleToUserDto);
    }
}
