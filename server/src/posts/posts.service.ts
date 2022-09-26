import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Post} from "./models/post.model";
import {PostCreationDto} from "./dto/post-creation.dto";
import {JwtService} from "@nestjs/jwt";
@Injectable()
export class PostsService {
    constructor(
        @InjectModel(Post) private postRepository: typeof Post,
        private jwtService: JwtService
    ) {}

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
            return await this.postRepository.create({userId: userId, title: title, text: text})
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
