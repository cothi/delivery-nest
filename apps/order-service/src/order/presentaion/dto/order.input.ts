import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class OrderFoodInput {
  @Field()
  FoodId: string;

  @Field()
  quantity: number;
}


@InputType()
export class CreateOrderInput {
  @Field()
  customerId: string;

  @Field()
  restaurantId: string;

  @Field(() => [OrderFoodInput])
  orderFoods: OrderFoodInput[];
}
