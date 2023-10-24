import { Module } from '@nestjs/common';
// import { DatabaseModule } from '../database/database.module';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { postsProviders } from './posts.providers';

@Module({
  imports: [PostsService],
  exports:[PostsService],
  controllers: [PostsController],
  providers: [
    PostsService,
    ...postsProviders,
  ],
})
export class CatsModule { }