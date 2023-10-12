import { Injectable } from '@nestjs/common';


export type User = any;
@Injectable()
export class UsersService {
    private readonly users = [
        {
            userId: 1, username: "Misha", password: "qwerty123"
        }, {
            userId: 2, username: "PvlMrzc", password: "qwerty123"
        },
    ]

    async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username)
    }
}
