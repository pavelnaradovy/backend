import { Body, Controller, Get, Post, } from "@nestjs/common";
import { PostService } from "./posts.service";
import { CreatePostDto } from "./create-post.dto";
import { PostInterface } from "src/interfaces/post.interface";

@Controller('posts')
export class PostsController {
    constructor(private postsService: PostService) { }

    @Post()
    async create(@Body() createPostDto: CreatePostDto) {
        this.postsService.create(createPostDto);
    }

    @Get()
    async findAll(): Promise<PostInterface[]> {
        return this.postsService.findAll();
    }
}