import { Injectable } from '@nestjs/common';
import { CreateMenuItemCmd } from '../../../application/commands/create-menu-item.command';
import { UpdateMenuItemCmd } from '../../../application/commands/update-menu-item.command';
import { MenuItemMapper } from '../../mapper/menu-item.mapper';
import { MenuItemModel } from '../../../domain/models/menu-item.model';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class MenuItemRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async createMenuItem(cmd: CreateMenuItemCmd): Promise<MenuItemModel> {
    const entity = MenuItemMapper.CreateToPersistence(cmd);
    const menuItem = await this.prismaService.menu_item.create({
      data: entity,
    });
    return MenuItemMapper.toDomain(menuItem);
  }

  async updateMenuItem(cmd: UpdateMenuItemCmd): Promise<MenuItemModel> {
    const entity = MenuItemMapper.UpdateToPersistence(cmd);
    const menuItem = await this.prismaService.menu_item.update({
      where: {
        id: entity.id,
      },
      data: entity,
    });

    return MenuItemMapper.toDomain(menuItem);
  }

  async getMenuItemById(id: string): Promise<MenuItemModel> {
    const menuItem = await this.prismaService.menu_item.findUnique({
      where: {
        id: id,
      },
    });
    return MenuItemMapper.toDomain(menuItem);
  }

  async getMenuItemsByCategoryId(
    menuCategoryId: string,
  ): Promise<MenuItemModel[]> {
    const menuItems = await this.prismaService.menu_item.findMany({
      where: {
        menuCategoryId: menuCategoryId,
      },
    });
    return menuItems.map(menuItem => MenuItemMapper.toDomain(menuItem));
  }

  async getMenuItemsByRestaurantId(
    restaurantId: string,
  ): Promise<MenuItemModel[]> {
    const menuItems = await this.prismaService.menu_item.findMany({
      where: {
        restaurantId: restaurantId,
      },
    });
    return menuItems.map(menuItem => MenuItemMapper.toDomain(menuItem));
  }
}
