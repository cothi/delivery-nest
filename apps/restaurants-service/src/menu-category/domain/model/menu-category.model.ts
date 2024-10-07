import { menu_category } from '@prisma/client';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { MenuItemParams } from '../../../menu-item/domain/interfaces/menu-item-params.interface';
import { MenuCategoryParams } from '../interface/menu-category-params.interface';

@ObjectType()
export class MenuCategoryModel implements menu_category {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  restaurantId: string;

  @Field()
  name: string;
  private constructor(params: MenuCategoryParams) {
    Object.assign(this, params);
  }

  static create(params: MenuItemParams): MenuCategoryModel {
    return new MenuCategoryModel(params);
  }
}
