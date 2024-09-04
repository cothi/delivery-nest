import { CreateMenuItemCmd } from '../../application/commands/create-menu-item.command';
import { UpdateMenuItemCmd } from '../../application/commands/update-menu-item.command';
import { MenuItemModel } from '../../domain/model/menu-item.model';
import { menu_item as MenuItem } from '@prisma/client';

export class MenuItemMapper {
  static CreateToPersistence(cmd: CreateMenuItemCmd): Omit<MenuItem, 'id'> {
    const {
      menuCategoryId,
      description,
      mainPhotoUrl,
      name,
      price,
      restaurantId,
    } = cmd;
    return {
      menuCategoryId,
      description,
      mainPhotoUrl,
      name,
      price,
      restaurantId,
    };
  }
  static UpdateToPersistence(cmd: UpdateMenuItemCmd): Partial<MenuItem> {
    const { id, updates } = cmd;
    return {
      id,
      ...updates,
    };
  }
  static toDomain(entity: MenuItem): MenuItemModel {
    const {
      id,
      name,
      restaurantId,
      menuCategoryId,
      price,
      mainPhotoUrl,
      description,
    } = entity;
    return MenuItemModel.create({
      id,
      mainPhotoUrl,
      menuCategoryId,
      restaurantId,
      name,
      price,
      description,
    });
  }
}
