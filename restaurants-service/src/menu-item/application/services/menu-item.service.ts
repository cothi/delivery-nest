import { Injectable } from '@nestjs/common';
import { CreateMenuItemCmd } from '../commands/create-menu-item.command';
import { MenuItemModel } from '../../domain/models/menu-item.model';
import { MenuItemRepository } from '../../infrastructure/persistence/repository/menu-item.repository';
import { UpdateMenuItemCmd } from '../commands/update-menu-item.command';

@Injectable()
export class MenuItemService {
  constructor(private readonly menuItemRepository: MenuItemRepository) {}

  async createMenuItem(cmd: CreateMenuItemCmd): Promise<MenuItemModel> {
    return await this.menuItemRepository.createMenuItem(cmd);
  }

  async updateMenuItem(cmd: UpdateMenuItemCmd): Promise<MenuItemModel> {
    return await this.menuItemRepository.updateMenuItem(cmd);
  }

  async getMenuItemById(id: string): Promise<MenuItemModel> {
    return await this.menuItemRepository.getMenuItemById(id);
  }

  async getMenuItemByCategoryId(categoryId: string): Promise<MenuItemModel[]> {
    return await this.menuItemRepository.getMenuItemsByCategoryId(categoryId);
  }

  async getMenuItemsByRestaurantId(
    restaurantId: string,
  ): Promise<MenuItemModel[]> {
    return await this.menuItemRepository.getMenuItemsByRestaurantId(
      restaurantId,
    );
  }
}
