import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Post} from "./models/post.model";
import {PostCreationDto} from "./dto/post-creation.dto";
import {JwtService} from "@nestjs/jwt";
import {PostSelfDeleteDto} from "./dto/post-self-delete.dto";
import {Commentary} from "../commentaries/models/commetary.model";
@Injectable()
export class PostsService {
    constructor(
        @InjectModel(Post) private postRepository: typeof Post,
        private jwtService: JwtService
    ) {}
    async getAll(){
        const posts = await this.postRepository.findAll({include : Commentary});
        return posts.map(e => e.toJSON())
    }
    async create(postCreationDto: PostCreationDto){
        try{
            const accessToken = postCreationDto.accessToken.split(" ")[1];
            const verified = this.validateAccessToken(accessToken);
            if (!verified) {
                throw new HttpException("UNAUTHORIZED", HttpStatus.UNAUTHORIZED)
            }
            const userId = verified.payload.id;
            const text = postCreationDto.text;
            const title = postCreationDto.title;
            const candidate = await this.postRepository.findOne({where: {title}})
            if(candidate){
                throw new HttpException("Exist", HttpStatus.BAD_REQUEST)
            }
            return (await this.postRepository.create({userId: userId, title: title, text: text})).toJSON()
        }catch (e){
            return e
        }
    }
    async findPostById(id: number){
        try{
            return await this.postRepository.findOne({where: {id}, include: Commentary})
        }catch (e){
            return e
        }
    }
    async delete(id: number){
        try {
            await this.postRepository.destroy({where: {id}})
            return {status: HttpStatus.OK}
        }catch (e){
            return e
        }
    }
    async selfDelete(postSelfDeleteDto: PostSelfDeleteDto){
        try{
            const accessToken = postSelfDeleteDto.accessToken.split(" ")[1];
            const verified = this.validateAccessToken(accessToken);
            if(!verified){
                throw new HttpException("UNAUTHORIZED", HttpStatus.UNAUTHORIZED)
            }
            const userId = verified.payload.id;
            const post = await this.findPostById(postSelfDeleteDto.id);
            if(post.userId !== userId){
                throw new HttpException("Permission denied", HttpStatus.FORBIDDEN)
            }
            return await this.postRepository.destroy({where: {id: post.id}})
        }catch (e){
            return e
        }
    }
    private validateAccessToken(accessToken){
        try{
            return this.jwtService.verify(accessToken, {secret: process.env.JWT_SECRET_ACCESS});

        }catch (e){
            return null;
        }
    }
}
