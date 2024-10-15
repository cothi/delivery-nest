import { RoomModel } from '@counsel/room/domain/model/room.model';
import { Prisma } from '@prisma/client';

export const RoomRepositorySymbol = Symbol.for('RoomRepository');

export interface RoomRepositoryArgs {
  createRoom: any; // 실제 타입으로 대체 가능
  deleteRoom: any; // 실제 타입으로 대체 가능
  updateRoom: any;
  getRoom: any;
  getRooms: any;
}
export interface PrismaRoomRepositoryArgs extends RoomRepositoryArgs {
  createRoom: Prisma.RoomsCreateArgs;
  deleteRoom: Prisma.RoomsDeleteArgs;
  updateRoom: Prisma.RoomsUpdateArgs;
  getRoom: Prisma.RoomsFindUniqueArgs;
  getRooms: Prisma.RoomsFindManyArgs;
}
export interface IRoomRepository<T extends RoomRepositoryArgs> {
  createRoom(data: T['createRoom']): Promise<RoomModel>;
  deleteRoom(data: T['deleteRoom']): Promise<RoomModel>;
  updateRoom(data: T['updateRoom']): Promise<RoomModel>;
  getRoom(data: T['getRoom']): Promise<RoomModel | null>;
  getRooms(data: T['getRooms']): Promise<RoomModel[]>;
}
