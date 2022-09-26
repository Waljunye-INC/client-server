import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import {PostsService} from "./posts.service";
import {PostRequestDto} from "./dto/post-request.dto";
import {Headers} from "@nestjs/common";
import {Roles} from "../Decorators/roles.decorator";
import {AuthGuard} from "../auth/Guards/auth.guard";

@Controller('posts')
export class PostsController {
    constructor(private postsService: PostsService) {}

    @Roles('admin', 'moderator', 'user')
    @UseGuards(AuthGuard)
    @Post()
    async create(@Headers('Authorization') authToken, @Body()postRequestDto: PostRequestDto){
        return this.postsService.create(
            {
                accessToken: authToken,
                text: postRequestDto.text,
                title: postRequestDto.title
            })
    }
}
