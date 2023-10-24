import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { PostInterface } from 'src/interfaces/post.interface';
import { CreatePostDto } from './create-post.dto';

@Injectable()
export class PostsService {
    constructor(
        @Inject('POST_MODEL')
        private postModel: Model<PostInterface>,
    ) { }



    async create(createCatDto: CreatePostDto): Promise<PostInterface> {
        const createdPost = new this.postModel(createCatDto);
        return createdPost.save();
    }

    async findAll(): Promise<PostInterface[]> {
        return this.postModel.find().exec();
    }
}