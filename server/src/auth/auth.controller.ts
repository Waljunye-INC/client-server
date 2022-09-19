import {Body, Controller, HttpStatus, Post} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {UserCreateDto} from "./dto/user-create.dto";
import {Request} from "@nestjs/common";
import {Response} from "@nestjs/common";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    @Post('register')
    async register(@Body() userCreateDto: UserCreateDto, @Response({passthrough: true}) res){
        const retValue = await this.authService.register(userCreateDto);
        res.cookie(
            'refreshToken',
            retValue.refreshToken,
            {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true}
        );
        return retValue;
    }
    @Post('login')
    async login(@Body() userCreateDto: UserCreateDto, @Response({passthrough: true}) res){
        const retValue =  await this.authService.login(userCreateDto);
        res.cookie(
            'refreshToken',
            retValue.refreshToken,
            {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true}
        );
        return retValue;
    }
    @Post('refresh')
    async refresh(@Request() req, @Response({passthrough: true}) res){
        const refreshToken = req.cookies.refreshToken;
        const retValue = await this.authService.refresh(refreshToken);
        res.cookie(
            'refreshToken',
            retValue.refreshToken,
            {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true}
        );
        return retValue;
    }
}
