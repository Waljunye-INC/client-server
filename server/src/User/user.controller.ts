import {Body, Controller, Get, Param, UseGuards} from '@nestjs/common';
import {UserService} from "./user.service";
import {Roles} from "../Decorators/roles.decorator";
import {AuthGuard} from "../auth/Guards/auth.guard";
import {UserResponseDto} from "./dto/user-response.dto";


@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}
    @Roles('user', 'moderator', 'admin')
    @UseGuards(AuthGuard)
    @Get("")
    async findAll(): Promise<UserResponseDto[]>{
        const users =  await this.userService.findAll();
        return users.map(e => new UserResponseDto(e))
    }
    @Roles('user', 'moderator', 'admin')
    @UseGuards(AuthGuard)
    @Get('id/:id')
    async findUserById(@Param('id') id: number){
        const user = await this.userService.findUserById(id);
        return new UserResponseDto(user)
    }
    @Roles('admin', 'moderator')
    @UseGuards(AuthGuard)
    @Get('email')
    async findUserByEmail(@Body('email') email: string){
        const user = await this.userService.findUserByEmail(email)
        return new UserResponseDto(user);
    }
    @Roles('admin', 'moderator')
    @UseGuards(AuthGuard)
    @Get('user-roles/:id')
    async getRolesByUserId(@Param('id') id: number){
        return await this.userService.getRolesByUserId(id);
    }
}
