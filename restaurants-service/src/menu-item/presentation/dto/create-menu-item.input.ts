import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateMenuItemInput {
  @Field()
  mainPhotoUrl: string;

  @Field()
  menuCategoryId: string;

  @Field()
  restaurantId: string;

  @Field()
  name: string;

  @Field()
  price: number;

  @Field()
  description: string;
}
