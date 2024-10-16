import { Rooms } from '@prisma/client';
import { RoomModel } from '@counsel/room/domain/model/room.model';

export class RoomMapper {
  static toDomain(data: Rooms): RoomModel {
    return {
      createdAt: data.createdAt,
      id: data.id,
      status: data.status,
      userId: data.userId,
      updatedAt: data.updatedAt,
    };
  }
  static toDomains(datas: Rooms[]): RoomModel[] {
    return datas.map((room) => this.toDomain(room));
  }
}
