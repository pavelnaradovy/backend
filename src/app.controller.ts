import { Controller, Request, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }
  @UseGuards(AuthGuard('local'))

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
