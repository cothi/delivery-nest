import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { LeaveRoomInput } from '@counsel/room/presentation/dto/input/leave-room.input';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RoomModel } from '@counsel/room/domain/model/room.model';
import { CreateRoomCommand } from '@counsel/room/application/commands/create-room.command';
import { JwtAuthGuard, JwtPayload } from '@libs/jwt';
import { UseGuards } from '@nestjs/common';
import { TokenInfo } from '@libs/decorators';
import { DeleteRoomCommand } from '@counsel/room/application/commands/delete-room.command';
import { GetRoomsQuery } from '@counsel/room/application/queries/get-rooms.query';
import { GetRoomInput } from '@counsel/room/presentation/dto/input/get-room.input';

@Resolver('Room')
export class RoomResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Mutation('createRoom')
  @UseGuards(JwtAuthGuard)
  async createRoom(@TokenInfo() payload: JwtPayload): Promise<RoomModel> {
    const command = new CreateRoomCommand(payload.userId);
    return await this.commandBus.execute(command);
  }

  @Mutation('leaveRoom')
  @UseGuards(JwtAuthGuard)
  async leaveRoom(@Args('input') input: LeaveRoomInput): Promise<RoomModel> {
    const command = new DeleteRoomCommand(input.roomId);
    return await this.commandBus.execute(command);
  }

  @Mutation('getRoom')
  async getRoom(@Args('input') input: GetRoomInput): Promise<RoomModel> {
    const query = new GetRoomsQuery(input.roomId);
    return await this.queryBus.execute(query);
  }
  @Mutation('getAllRooms')
  @UseGuards(JwtAuthGuard)
  async getAllRooms(@TokenInfo() payload: JwtPayload) {
    const query = new GetRoomsQuery(payload.userId);
    return await this.queryBus.execute(query);
  }
}
