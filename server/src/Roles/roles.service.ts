import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Roles} from "./models/roles.model";
import {RoleCreationDto} from "./dto/role-creation.dto";
import {RoleDeleteDto} from "./dto/role-delete.dto";
import {UserService} from "../User/user.service";
import {AddRoleToUserDto} from "./dto/add-role-to-user.dto";

@Injectable()
export class RolesService {
    constructor(@InjectModel(Roles) private rolesRepository: typeof Roles, private userService: UserService) {
    }
    async getRoleByValue(value: string){
        try{
            const role = await this.rolesRepository.findOne({where: {value}});
            if(!role){
                throw new HttpException("does not exist", HttpStatus.BAD_REQUEST);
            }
            return role;
        }catch (e){
            return e;
        }
    }
    async getRoleById(id: number){
        try{
            const role = await this.rolesRepository.findOne({where: {id}})
            if(!role){
                throw new HttpException('does not exist', HttpStatus.BAD_REQUEST);
            }
            return role;
        }catch (e){
            return e;
        }
    }
    async createRole(roleCreationDto: RoleCreationDto){
        try{
            const candidate = await this.rolesRepository.findOne({where: {value: roleCreationDto.value}});
            if (candidate) {
                throw new HttpException("EXIST", HttpStatus.BAD_REQUEST)
            }
            const newRole = await this.rolesRepository.create(roleCreationDto);
            return newRole;
        }catch (e){
            return e;
        }
    }
    async deleteRole(roleDeleteDto: RoleDeleteDto){
        if(roleDeleteDto.value){
            return await this.rolesRepository.destroy({where:{value: roleDeleteDto.value}});
        }
        if(roleDeleteDto.id){
            return await this.rolesRepository.destroy({where:{id: roleDeleteDto.id}});
        }
        return null;
    }
    async addRoleToUser(addRoleToUserDto: AddRoleToUserDto){
        try{
            if (
                (
                    !addRoleToUserDto.userEmail
                    &&
                    !addRoleToUserDto.userId
                )) {
                throw new HttpException('Enter userEmail or userId', HttpStatus.BAD_REQUEST);
            }
            if (
                (
                    !addRoleToUserDto.roleId
                    &&
                    !addRoleToUserDto.roleValue
                )
            ) {
                throw new HttpException('Enter roleValue or roleId', HttpStatus.BAD_REQUEST)
            }
        }catch (e){
            return e
        }
        const user = (addRoleToUserDto.userId)
            ? await this.userService.findUserById(addRoleToUserDto.userId)
            : await this.userService.findUserByEmail(addRoleToUserDto.userEmail);
        const role = (addRoleToUserDto.roleId)
            ? await this.rolesRepository.findOne({where: {id: addRoleToUserDto.roleId}, include: {all: true}})
            : await this.rolesRepository.findOne({where: {value: addRoleToUserDto.roleValue}, include: {all: true}});
        await user.$set('roles', [role.id]);
        return user;
    }
}
