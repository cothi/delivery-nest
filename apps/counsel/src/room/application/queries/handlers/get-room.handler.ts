import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetRoomQuery } from '@counsel/room/application/queries/get-room.query';
import { RoomModel } from '@counsel/room/domain/model/room.model';
import { RoomService } from '@counsel/room/domain/services/room.service';

@QueryHandler(GetRoomQuery)
export class GetRoomHandler implements IQueryHandler<GetRoomQuery, RoomModel> {
  constructor(private readonly roomService: RoomService) {}
  async execute(query: GetRoomQuery): Promise<RoomModel> {
    try {
      return await this.roomService.getRoom(query.roomId);
    } catch (e) {
      throw e;
    }
  }
}
