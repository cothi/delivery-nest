import { Injectable } from '@nestjs/common';
import { PrismaService } from '@libs/database';
import {
  IRoomRepository,
  PrismaRoomRepositoryArgs,
} from '@counsel/room/domain/interface/room-repository.interface';
import { Prisma } from '@prisma/client';
import { RoomModel } from '@counsel/room/domain/model/room.model';
import { RoomMapper } from '@counsel/room/domain/mapper/room.mapper';

@Injectable()
export class RoomRepository
  implements IRoomRepository<PrismaRoomRepositoryArgs>
{
  constructor(private readonly prisma: PrismaService) {}

  async createRoom(data: Prisma.RoomsCreateArgs): Promise<RoomModel> {
    const room = await this.prisma.rooms.create(data);
    return RoomMapper.toDomain(room);
  }
  async deleteRoom(data: Prisma.RoomsDeleteArgs): Promise<RoomModel> {
    const room = await this.prisma.rooms.delete(data);
    return RoomMapper.toDomain(room);
  }
  async updateRoom(data: Prisma.RoomsUpdateArgs): Promise<RoomModel> {
    const room = await this.prisma.rooms.update(data);
    return RoomMapper.toDomain(room);
  }
  async getRoom(data: Prisma.RoomsFindUniqueArgs): Promise<RoomModel | null> {
    const room = await this.prisma.rooms.findUnique(data);
    if (!room) {
      return null;
    }
    return RoomMapper.toDomain(room);
  }
  async getRooms(data: Prisma.RoomsFindManyArgs): Promise<RoomModel[]> {
    const room = await this.prisma.rooms.findMany(data);
    return RoomMapper.toDomains(room);
  }
}
