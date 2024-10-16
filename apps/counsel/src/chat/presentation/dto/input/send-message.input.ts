import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SendMessageInput {
  @Field()
  roomId: string;

  @Field()
  message: string;
}
