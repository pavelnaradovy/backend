import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { PostsController } from './posts/posts.controller';

@Module({
  imports: [AuthModule, UsersModule, AuthModule],
  controllers: [AppController, CatsController, AuthController, PostsController],
  providers: [AppService, AuthService,],
})
export class AppModule { }
