import {Body, Controller, Get, Param, UseGuards} from '@nestjs/common';
import {UserService} from "./user.service";
import {Roles} from "../Decorators/roles.decorator";
import {AuthGuard} from "../auth/Guards/auth.guard";


@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}
    @Roles('admin', 'moderator')
    @UseGuards(AuthGuard)
    @Get("")
    async findAll(){
        return await this.userService.findAll()
    }
    @Roles('admin', 'moderator')
    @UseGuards(AuthGuard)
    @Get(':id')
    async findUserById(@Param('id') id: number){
        return await this.userService.findUserById(id);
    }
    @Roles('admin', 'moderator')
    @UseGuards(AuthGuard)
    @Get('')
    async findUserByEmail(@Body('email') email: string){
        return await this.userService.findUserByEmail(email)
    }
    @Roles('admin', 'moderator')
    @UseGuards(AuthGuard)
    @Get('user-roles/:id')
    async getRolesByUserId(@Param('id') id: number){
        return await this.userService.getRolesByUserId(id);
    }
}
