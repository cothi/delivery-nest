import { ICommand } from '@nestjs/cqrs';

export class JoinRoomCommand implements ICommand {
  constructor(public readonly userId: string) {}
}
