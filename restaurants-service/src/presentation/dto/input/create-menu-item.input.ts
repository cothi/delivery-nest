import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateMenuCategoryInput {
  @Field()
  name: string;

  @Field(() => ID)
  restaurantId: string;
}
