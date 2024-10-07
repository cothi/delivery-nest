import { ICommand } from '@nestjs/cqrs';

export class LoginUserQuery implements ICommand {
  constructor(
    public readonly email: string,
    public readonly password: string,
  ) {}
}
