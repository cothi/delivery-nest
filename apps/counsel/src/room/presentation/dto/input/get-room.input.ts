import { Field, InputType } from '@nestjs/graphql';
@InputType()
export class GetRoomInput {
  @Field()
  roomId: string;
}
