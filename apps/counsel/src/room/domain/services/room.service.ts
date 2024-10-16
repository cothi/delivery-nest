import { Inject, Injectable } from '@nestjs/common';
import {
  IRoomRepository,
  PrismaRoomRepositoryArgs,
  RoomRepositorySymbol,
} from '@counsel/room/domain/interface/room-repository.interface';
import { RoomModel } from '@counsel/room/domain/model/room.model';
import { RoomStatus } from '@prisma/client';
import { ErrorCode, errorFactory } from '@libs/exception';

@Injectable()
export class RoomService {
  constructor(
    @Inject(RoomRepositorySymbol)
    private readonly roomRepository: IRoomRepository<PrismaRoomRepositoryArgs>,
  ) {}

  async createRoom(userId: string): Promise<RoomModel> {
    return await this.roomRepository.createRoom({
      data: {
        userId,
      },
    });
  }

  async deleteRoom(roomId: string): Promise<RoomModel> {
    return await this.roomRepository.deleteRoom({
      where: {
        id: roomId,
      },
    });
  }

  async getRoom(roomId: string): Promise<RoomModel> {
    return await this.roomRepository.getRoom({
      where: {
        id: roomId,
      },
    });
  }

  async getAllRooms(userId: string): Promise<RoomModel[]> {
    return await this.roomRepository.getRooms({
      where: {
        userId: userId,
      },
    });
  }

  async updateStatusRoom(
    roomId: string,
    status: RoomStatus,
  ): Promise<RoomModel> {
    return await this.roomRepository.updateRoom({
      where: {
        id: roomId,
      },
      data: {
        status,
      },
    });
  }

  async invalidateCanUpdate(userId: string, roomId: string): Promise<void> {
    const room = await this.roomRepository.getRoom({
      where: {
        id: roomId,
      },
    });
    if (room.userId !== userId) {
      throw errorFactory(ErrorCode.UNAUTHORIZED);
    }
  }
}
