import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateRoomCommand } from '@counsel/room/application/commands/create-room.command';
import { RoomModel } from '@counsel/room/domain/model/room.model';
import { RoomService } from '@counsel/room/domain/services/room.service';

@CommandHandler(CreateRoomCommand)
export class CreateRoomHandler
  implements ICommandHandler<CreateRoomCommand, RoomModel>
{
  constructor(private readonly roomService: RoomService) {}
  async execute(command: CreateRoomCommand): Promise<RoomModel> {
    try {
      return await this.roomService.createRoom(command.userId);
    } catch (e) {
      throw e;
    }
  }
}
