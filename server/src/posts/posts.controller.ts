import {Body, Controller, Delete, Get, Param, Post, UseGuards} from '@nestjs/common';
import {PostsService} from "./posts.service";
import {PostRequestDto} from "./dto/post-request.dto";
import {Headers} from "@nestjs/common";
import {Roles} from "../Decorators/roles.decorator";
import {AuthGuard} from "../auth/Guards/auth.guard";

@Controller('posts')
export class PostsController {
    constructor(private postsService: PostsService) {}

    @Get()
    async getAll(){
        return await this.postsService.getAll();
    }
    @Roles('admin', 'moderator', 'user')
    @UseGuards(AuthGuard)
    @Post()
    async create(@Headers('Authorization') authToken, @Body()postRequestDto: PostRequestDto){
        return await this.postsService.create(
            {
                accessToken: authToken,
                text: postRequestDto.text,
                title: postRequestDto.title
            })
    }
    @Roles('admin', 'moderator')
    @UseGuards(AuthGuard)
    @Delete('admin/delete')
    async delete(@Body('id') id: number){
        return await this.postsService.delete(id);
    }

    @Roles('admin', 'moderator', 'user')
    @UseGuards(AuthGuard)
    @Delete('delete')
    async selfDelete(@Headers('Authorization') authToken, @Body('id') id: number){
        return await this.postsService.selfDelete(
            {
            accessToken: authToken,
            id: id
        })
    }
}
