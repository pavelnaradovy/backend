import { MinLength, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @MinLength(6, { message: 'Password must bu more then 6 symbols' })
  password: string;
}
