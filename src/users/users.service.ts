import { Injectable } from '@nestjs/common';


export type User = any;
@Injectable()
export class UsersService {
    private readonly users = [
        {
            userId: 1, email: "Misha", password: "qwerty123"
        }, {
            userId: 2, email: "PvlMrzc", password: "qwerty123"
        },
    ]

    async findOne(email: string): Promise<User | undefined> {
        return this.users.find(user => user.email === email)
    }
}
