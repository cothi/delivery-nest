import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JoinRoomCommand } from '@counsel/room/application/commands/join-room.command';
import { RoomModel } from '@counsel/room/domain/model/room.model';
import { RoomService } from '@counsel/room/domain/services/room.service';

@CommandHandler(JoinRoomCommand)
export class JoinRoomHandler
  implements ICommandHandler<JoinRoomCommand, RoomModel>
{
  constructor(private readonly roomService: RoomService) {}
  async execute(command: JoinRoomCommand): Promise<RoomModel> {
    try {
      return await this.roomService.createRoom(command.userId);
    } catch (e) {
      throw e;
    }
  }
}
