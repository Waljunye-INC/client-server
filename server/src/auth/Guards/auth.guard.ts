import {CanActivate, ExecutionContext, Inject, Injectable} from "@nestjs/common";
import {Observable} from "rxjs";
import {Reflector} from "@nestjs/core";
import {JwtService} from "@nestjs/jwt";
import {UserService} from "../../User/user.service";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(
        private reflector: Reflector,
        private JwtService: JwtService,
    ) {
    }
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles){
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const authorization = request.headers.authorization;
        if(!authorization){
            return false;
        }
        const Bearer = authorization.split(" ")[0];
        const token = authorization.split(" ")[1];
        if(!Bearer || !token){
            return false;
        }
        try{
            console.log(this.validateAccessToken(token)
                .payload)
            const access = roles.includes(this.validateAccessToken(token)
                .payload
                .roles[0]
                .value);
            if(access){
                return true;
            }
        }catch (e){
            return false;
        }

        return false;
    }
    private validateAccessToken(accessToken){
        try{
            return this.JwtService.verify(accessToken, {secret: process.env.JWT_SECRET_ACCESS});

        }catch (e){
            return null;
        }
    }
}
