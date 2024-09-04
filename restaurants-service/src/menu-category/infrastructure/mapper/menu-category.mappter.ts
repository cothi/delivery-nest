import { CreateMenuCategoryCmd } from '../../application/commands/create-menu-category.command';
import { menu_category as MenuCategory } from '.prisma/client';
import { UpdateMenuCategoryCmd } from '../../application/commands/update-menu-catetory.command';
import { MenuCategoryModel } from '../../domain/model/menu-category.model';

export class MenuCategoryMapper {
  static toDomain(entity: MenuCategory): MenuCategoryModel {
    const { id, restaurantId, name } = entity;
    return {
      id,
      restaurantId,
      name,
    };
  }
}
export class CreateMenuCategoryMapper {
  static toPersistence(cmd: CreateMenuCategoryCmd): Omit<MenuCategory, 'id'> {
    const { restaurantId, name } = cmd;
    return {
      restaurantId,
      name,
    };
  }
}
export class UpdateMenuCategoryMapper {
  static toPersistence(
    cmd: UpdateMenuCategoryCmd,
  ): Omit<MenuCategory, 'restaurantId'> {
    const { id, name } = cmd;
    return {
      id,
      name,
    };
  }
}
