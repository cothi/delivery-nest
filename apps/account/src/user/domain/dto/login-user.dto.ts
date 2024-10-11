export class LoginUserDto {
  email: string;
  password: string;

  constructor(data: LoginUserDto) {
    Object.assign(this, data);
  }
}
