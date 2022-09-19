import {UserDto} from "./User.dto";

export class GenerateTokenDto{
    accessToken: string;
    refreshToken: string;
    userDto: UserDto;
    constructor(accessToken, refreshToken, userDto) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.userDto = userDto;
    }
}
