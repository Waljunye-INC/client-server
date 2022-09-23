import {User} from "../models/user.model";
import {Exclude, Expose, Type} from "class-transformer";
import {ArrayMaxSize, ArrayMinSize, IsArray, IsNumber, IsString, ValidateNested} from "class-validator";
import {Roles} from "../../Roles/models/roles.model";

@Exclude()
export class UserResponseDto extends User{
    @Expose()
    @IsNumber()
    id: number;

    @Expose()
    @IsString()
    email: string;

    @IsString()
    password: string;

    @ValidateNested({each: true})
    @Expose()
    @IsArray()
    @Type(() => Roles)
    roles: Roles[];

    constructor(props : User) {
        super(props.toJSON());
        this.roles = props.toJSON().roles;
    }

}
