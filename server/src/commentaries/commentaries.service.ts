import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Commentary} from "./models/commetary.model";
import {CommentaryCreationDto} from "./dto/commentary-creation.dto";
import {JwtService} from "@nestjs/jwt";
import {PostsService} from "../posts/posts.service";
import {CommentaryDeleteDto} from "./dto/commentary-delete.dto";

@Injectable()
export class CommentariesService {
    constructor(
        @InjectModel(Commentary) private commentariesRepository: typeof Commentary,
        private jwtService: JwtService,
        private postsService: PostsService
    ) {}
    async create(commentaryCreationDto: CommentaryCreationDto){
        try{
            const accessToken = commentaryCreationDto.accessToken.split(" ")[1];
            const accessTokenData = this.validateAccessToken(accessToken);
            if (!accessToken) {
                throw new HttpException("UNAUTHORIZED", HttpStatus.UNAUTHORIZED)
            }
            const payload = accessTokenData.payload;
            const userId = payload.id;
            const postId = commentaryCreationDto.postId;
            const postCandidate = await this.postsService.findPostById(postId);
            if(!postCandidate){
                throw new HttpException('Post does not Exist', HttpStatus.BAD_REQUEST)
            }
            const text = commentaryCreationDto.text;
            return await this.commentariesRepository.create({userId, postId, text})
        }catch (e){
            return e;
        }
    }
    async delete(id: number){
        try{
            await this.commentariesRepository.destroy({where: {id}})
            return {status: HttpStatus.OK}
        }catch (e) {
            return e;
        }
    }
    async selfDelete(commentaryDeleteDto: CommentaryDeleteDto){
        try{
            const accessToken = commentaryDeleteDto.accessToken.split(" ")[1];
            const accessTokenData = this.validateAccessToken(accessToken);
            console.log(accessToken)
            if(!accessTokenData){
                throw new HttpException('Permission denied', HttpStatus.FORBIDDEN)
            }
            const payload = accessTokenData.payload;
            const comment = await this.commentariesRepository.findOne({where: {id: commentaryDeleteDto.id}})
            if(!comment){
                throw new HttpException('Comment does not exist', HttpStatus.BAD_REQUEST)
            }
            const userId = payload.id;
            const creatorId = comment.userId;
            if(creatorId === userId){
                await this.commentariesRepository.destroy({where: {id: commentaryDeleteDto.id}})
                return {status: HttpStatus.OK}
            }
            return {status: HttpStatus.FORBIDDEN}
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
