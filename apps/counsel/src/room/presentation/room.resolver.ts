import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { JoinRoomInput } from '@counsel/room/presentation/dto/input/join-room.input';
import { LeaveRoomInput } from '@counsel/room/presentation/dto/input/leave-room.input';

@Resolver('Room')
export class RoomResolver {
  @Mutation('joinRoom')
  async joinRoom(@Args('input') input: JoinRoomInput) {}

  @Mutation('leaveRoom')
  async leaveRoom(@Args('input') input: LeaveRoomInput) {}

  @Mutation('createRoom')
  async createRoom() {}

  @Mutation('getAllRooms')
  async getAllRooms() {}
}
