import { CommandHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetRoomsQuery } from '@counsel/room/application/queries/get-rooms.query';
import { RoomModel } from '@counsel/room/domain/model/room.model';
import { RoomService } from '@counsel/room/domain/services/room.service';

@CommandHandler(GetRoomsQuery)
export class GetRoomsHandler
  implements IQueryHandler<GetRoomsQuery, RoomModel[]>
{
  constructor(private readonly roomService: RoomService) {}

  async execute(query: GetRoomsQuery): Promise<RoomModel[]> {
    try {
      return await this.roomService.getAllRooms(query.userId);
    } catch (e) {
      throw e;
    }
  }
}
