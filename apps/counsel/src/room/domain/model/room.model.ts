import { Field, ObjectType } from '@nestjs/graphql';
import { Rooms, RoomStatus } from '@prisma/client';

@ObjectType()
export class RoomModel implements Rooms {
  @Field()
  id: string;

  @Field()
  userId: string;

  @Field()
  status: RoomStatus;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
