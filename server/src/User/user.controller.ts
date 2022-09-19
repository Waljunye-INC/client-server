import {Body, Controller, Get, Param} from '@nestjs/common';
import {UserService} from "./user.service";

@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}
    @Get("")
    async findAll(){
        return await this.userService.findAll()
    }
    @Get(':id')
    async findUserById(@Param('id') id: number){
        return await this.userService.findUserById(id);
    }
    @Get('')
    async findUserByEmail(@Body('email') email: string){
        return await this.userService.findUserByEmail(email)
    }
}
