import { ICommand } from '@nestjs/cqrs';

export class CreateUserCommand implements ICommand {
  constructor(
    public readonly nickname: string,
    public readonly email: string,
    public readonly password: string,
  ) {}
}
