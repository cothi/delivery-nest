import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMenuCategoryCmd } from '../../application/commands/create-menu-category.command';
import { MenuCategoryModel } from '../../domain/model/menu-category.model';
import {
  CreateMenuCategoryMapper,
  MenuCategoryMapper,
  UpdateMenuCategoryMapper,
} from '../mapper/menu-category.mappter';
import { UpdateMenuCategoryCmd } from '../../application/commands/update-menu-catetory.command';

@Injectable()
export class MenuCategoryRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async createMenuCategory(
    cmd: CreateMenuCategoryCmd,
  ): Promise<MenuCategoryModel> {
    const entity = CreateMenuCategoryMapper.toPersistence(cmd);
    const menuCategoryEntity = await this.prismaService.menu_category.create({
      data: entity,
    });
    return MenuCategoryMapper.toDomain(menuCategoryEntity);
  }

  async updateMenuCategory(
    cmd: UpdateMenuCategoryCmd,
  ): Promise<MenuCategoryModel> {
    const entity = UpdateMenuCategoryMapper.toPersistence(cmd);
    const menuCategoryEntity = await this.prismaService.menu_category.update({
      data: entity,
      where: entity,
    });
    return MenuCategoryMapper.toDomain(menuCategoryEntity);
  }

  async getMenuCategoryById(id: string): Promise<MenuCategoryModel> {
    const menuCategoryEntity =
      await this.prismaService.menu_category.findUnique({
        where: {
          id: id,
        },
      });
    return MenuCategoryMapper.toDomain(menuCategoryEntity);
  }

  async getListCategories(
    skip: number,
    pageSize: number,
  ): Promise<MenuCategoryModel[]> {
    const categories = await this.prismaService.menu_category.findMany({
      skip,
      take: pageSize,
      orderBy: { name: 'desc' },
    });
    return categories.map(categoriey =>
      MenuCategoryMapper.toDomain(categoriey),
    );
  }
}
