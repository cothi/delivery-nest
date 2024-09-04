import { menu_item } from '@prisma/client';
import { Field, Float, ID } from '@nestjs/graphql';
import { MenuItemParams } from '../interfaces/menu-item-params.interface';

export class MenuItemModel implements menu_item {
  @Field(() => ID)
  readonly id: string;

  @Field()
  readonly mainPhotoUrl: string;

  @Field(() => ID)
  readonly menuCategoryId: string;

  @Field(() => ID)
  readonly restaurantId: string;

  @Field()
  readonly name: string;

  @Field(() => Float)
  readonly price: number;

  @Field()
  readonly description: string;

  private constructor(params: MenuItemParams) {
    Object.assign(this, params);
  }
  static create(params: MenuItemParams): MenuItemModel {
    return new MenuItemModel(params);
  }
}
