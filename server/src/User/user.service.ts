import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./models/user.model";
import {where} from "sequelize";

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private userRepo: typeof User) {}
    async findAll(){
        return await this.userRepo.findAll({include: {all: true}})
    }
    async findUserById(id: number){
        return await this.userRepo.findOne({where: { id : id}, include: {all: true}})
    }
    async findUserByEmail(email: string){
        return await this.userRepo.findOne({where: {email: email}, include: {all: true}})
    }
    async getRolesByUserId(id: number){
        const user = await this.userRepo.findOne({where: {id}, include: {all: true}});
        return user.roles;
    }
}
