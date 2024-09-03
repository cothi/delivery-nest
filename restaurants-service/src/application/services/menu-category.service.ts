import { Injectable } from '@nestjs/common';
import { MenuCategoryRepository } from '../../infrastructure/persistence/menu-category.repository';
import { CreateMenuCategoryCmd } from '../commands/create-menu-category.command';
import { MenuCategoryModel } from '../../domain/model/menu-category.model';
import { UpdateMenuCategoryCmd } from '../commands/update-menu-catetory.command';

@Injectable()
export class MenuCategoryService {
  constructor(
    private readonly menuCategoryRepository: MenuCategoryRepository,
  ) {}

  async createMenuCategory(
    cmd: CreateMenuCategoryCmd,
  ): Promise<MenuCategoryModel> {
    return await this.menuCategoryRepository.createMenuCategory(cmd);
  }

  async updateMenuCategory(
    cmd: UpdateMenuCategoryCmd,
  ): Promise<MenuCategoryModel> {
    return await this.menuCategoryRepository.updateMenuCategory(cmd);
  }

  async getMenuCategoryById(id: string): Promise<MenuCategoryModel> {
    return await this.menuCategoryRepository.getMenuCategoryById(id);
  }
}
