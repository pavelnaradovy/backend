import { Controller, Get, Post, } from "@nestjs/common";

@Controller('cats')
export class CatsController {
    @Post()
    create(): string {
        return 'This action adds a new cat';
    }


    @Get()
    findAll() {
        return [{ id: 1, name: "Lusy", age: 2 }, { id: 1, name: "Linde", age: 9 }]
    }
    
    @Get(":id")
    findById() {
        return [{ id: 1, name: "Lusy", age: 2 }]
    }
}