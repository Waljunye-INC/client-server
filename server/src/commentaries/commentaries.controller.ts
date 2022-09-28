import {Body, Controller, Delete, Param, Post, UseGuards} from '@nestjs/common';
import {CommentariesService} from "./commentaries.service";
import {CommentaryRequestDto} from "./dto/commentary-Request.dto";
import {Headers} from "@nestjs/common";
import {CommentaryDeleteDto} from "./dto/commentary-delete.dto";
import {Roles} from "../Decorators/roles.decorator";
import {AuthGuard} from "../auth/Guards/auth.guard";

@Controller('commentaries')
export class CommentariesController {
    constructor(private commentariesService: CommentariesService) {
    }
    @Post()
    async create(@Body() commentaryRequestDto: CommentaryRequestDto, @Headers('Authorization') accessToken: string){
        return await this.commentariesService.create({...commentaryRequestDto, accessToken})
    }
    @Roles('admin', 'moderator')
    @UseGuards(AuthGuard)
    @Delete('admin/:id')
    async delete(@Param('id') id: number){
        return await this.commentariesService.delete(id);
    }
    @Roles('admin', 'moderator', 'user')
    @UseGuards(AuthGuard)
    @Delete('')
    async selfDelete(@Body('id') id: number , @Headers('Authorization') accessToken: string){
        return await this.commentariesService.selfDelete({id, accessToken})
    }
}
