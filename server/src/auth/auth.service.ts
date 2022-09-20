import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {UserCreateDto} from "./dto/user-create.dto";
import {UserService} from "../User/user.service";
import {InjectModel} from "@nestjs/sequelize";
import {User} from "../User/models/user.model";
import {Token} from "./models/token.model";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import {UserDto} from "./dto/User.dto";
import {GenerateTokenDto} from "./dto/generate-token.dto";
import {RolesService} from "../Roles/roles.service";

export interface Payload{
    id: number;
    email: string;
}
export class TokenGeneration extends GenerateTokenDto{
    accessToken: string;
    refreshToken: string;
    userDto: UserDto;
}
@Injectable()
export class AuthService {
    constructor(
        @InjectModel(Token) private tokenRepository: typeof Token,
        @InjectModel(User) private userRepository: typeof User,
        private rolesService: RolesService,
        private userService: UserService,
        private JWTService: JwtService) {}
    async register(userCreateDto: UserCreateDto){
        try{
            const userEmail = userCreateDto.email;
            const candidate = await this.userService.findUserByEmail(userCreateDto.email);
            if(candidate){
                throw new HttpException(
                    'Exist',
                    HttpStatus.BAD_REQUEST
                );
            }
            const hashedUserPassword = await bcrypt.hash(userCreateDto.password, 8);
            const user = await this.userRepository.create({
                ...userCreateDto,
                password: hashedUserPassword,
            })
            const userRole = await this.rolesService.getRoleByValue('user');
            await user.$set('roles', [userRole.id]);
            return await this.generateToken(user);
        }catch (e){
            return e;
        }
    }
    private async generateToken(payload: Payload) : Promise<TokenGeneration>{
        const accessToken = this.JWTService.sign(
            {payload},
            {
                secret: process.env.JWT_SECRET_ACCESS,
                expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRE
            }
        )
        const refreshToken = this.JWTService.sign(
            {payload},
            {
                secret: process.env.JWT_SECRET_REFRESH,
                expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRE
            }
        )
        await this.saveToken(new UserDto(payload), refreshToken)
        return new GenerateTokenDto(accessToken, refreshToken, new UserDto(payload));
    }
    private async saveToken(userDto: UserDto, refreshToken){
        const id = (await this.userService.findUserById(userDto.id)).id;
        const tokenCandidate = await this.tokenRepository.findOne({where: {userId: id}})
        if(tokenCandidate){
            tokenCandidate.refreshToken = refreshToken;
            return await tokenCandidate.save();
        }
        return await this.tokenRepository.create({userId: id, refreshToken})
    }
    async login(userCreateDto: UserCreateDto){
        try{
            const user = await this.userService.findUserByEmail(userCreateDto.email);
            console.log(user.email)
            console.log(userCreateDto.password)
            console.log(user.password)
            const isPasswordEquals = await bcrypt.compare(userCreateDto.password, user.password);
            if (!isPasswordEquals) {
                throw new HttpException("invalid password", HttpStatus.FORBIDDEN)
            }
            return await this.generateToken(user);
        }catch (e){
            return e
        }
    }
    async refresh(refreshToken){
        try{
            if(!refreshToken){
                throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
            }
            const isTokenValidated = this.validateRefreshToken(refreshToken);
            const userId = (await this.tokenRepository.findOne({where: {refreshToken}})).userId;
            if(!isTokenValidated || !userId){
                throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
            }
            const user = await this.userService.findUserById(userId);
            return await this.generateToken(user);
        }catch (e){
            return e
        }
    }
    private async validateRefreshToken(refreshToken){
        try{
            return await this.JWTService.verify(refreshToken, {secret: process.env.JWT_SECRET_REFRESH})
        }catch (e){
            console.log(e);
            return null;
        }
    }
}
