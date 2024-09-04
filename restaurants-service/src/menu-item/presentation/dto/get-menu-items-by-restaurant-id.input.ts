import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GetMenuItemsByRestaurantIdInput {
  @Field()
  restaurantId: string;
}
