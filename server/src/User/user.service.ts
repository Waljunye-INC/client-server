import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./models/user.model";
import {where} from "sequelize";

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private userRepo: typeof User) {}
    async findAll(){
        return this.userRepo.findAll()
    }
    async findUserById(id: number){
        return this.userRepo.findOne({where: { id : id}})
    }
    async findUserByEmail(email: string){
        return this.userRepo.findOne({where: {email: email}})
    }
}
