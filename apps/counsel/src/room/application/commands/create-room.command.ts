import { ICommand } from '@nestjs/cqrs';

export class CreateRoomCommand implements ICommand {
  constructor(public readonly userId: string) {}
}
