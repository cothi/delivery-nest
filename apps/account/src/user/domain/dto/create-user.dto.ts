import { IsEmail } from 'class-validator';

export class CreateUserDto {
  nickname: string;

  @IsEmail()
  email: string;

  password: string;
  constructor(data: CreateUserDto) {
    Object.assign(this, data);
  }
}
