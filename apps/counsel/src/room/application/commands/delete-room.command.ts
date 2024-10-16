import { ICommand } from '@nestjs/cqrs';

export class DeleteRoomCommand implements ICommand {
  constructor(public readonly roomId: string) {}
}
