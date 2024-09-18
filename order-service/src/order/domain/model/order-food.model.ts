import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { OrderFood as PrismaOrderFood } from '@prisma/client';

@ObjectType()
export class OrderFood implements PrismaOrderFood {
  @Field(() => ID)
  id: string;

  @Field()
  foodId: string;

  @Field(() => Int)
  quantity: number;
  private constructor(orderFood: PrismaOrderFood) {
    Object.assign(this, orderFood);
  }
  static create(orderFood: PrismaOrderFood): OrderFood {
    return new OrderFood(orderFood);
  }
}
