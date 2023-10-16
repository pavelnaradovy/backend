import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { log } from 'console';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Request() req) {
        console.log("123213123123",req)
        return this.authService.login(req.user)
    }
}


