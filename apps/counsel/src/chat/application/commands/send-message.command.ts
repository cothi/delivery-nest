import { ICommand } from '@nestjs/cqrs';

export class SendMessageCommand implements ICommand {
  constructor(
    public readonly roomId: string,
    public readonly message: string,
  ) {}
}
