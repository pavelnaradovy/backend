import { Controller, Get } from "@nestjs/common";

@Controller('cats')
export class CatsController {
    @Get()
    findAll(): Array<string> {
        return ["This action returns all cats", "123","0333"];
    }
}