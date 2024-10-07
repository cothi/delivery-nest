import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateMenuCategoryCmd } from '../create-menu-category.command';
import { MenuCategoryService } from '../../services/menu-category.service';
import { MenuCategoryModel } from '../../../domain/model/menu-category.model';

@Injectable()
@CommandHandler(CreateMenuCategoryCmd)
export class CreateMenuCategoryHandler
  implements ICommandHandler<CreateMenuCategoryCmd>
{
  constructor(private readonly menuCategoryService: MenuCategoryService) {}

  async execute(cmd: CreateMenuCategoryCmd): Promise<MenuCategoryModel> {
    const model = await this.menuCategoryService.createMenuCategory(cmd);
    return model;
  }
}
