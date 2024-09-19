import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class TossConfirmInput {
  @Field()
  paymentKey: string;

  @Field()
  orderId: string;

  @Field()
  amount: number;
}

