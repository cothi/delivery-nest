import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteRoomCommand } from '@counsel/room/application/commands/delete-room.command';
import { RoomService } from '@counsel/room/domain/services/room.service';
import { RoomModel } from '@counsel/room/domain/model/room.model';

@CommandHandler(DeleteRoomCommand)
export class DeleteRoomHandler
  implements ICommandHandler<DeleteRoomCommand, RoomModel>
{
  constructor(private readonly roomService: RoomService) {}

  async execute(command: DeleteRoomCommand): Promise<RoomModel> {
    try {
      return await this.roomService.deleteRoom(command.roomId);
    } catch (e) {
      throw e;
    }
  }
}
