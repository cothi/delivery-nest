import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SubscribeRoomInput {
  @Field()
  roomId: string;
}
