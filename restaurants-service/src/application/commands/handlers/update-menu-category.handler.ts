import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateMenuCategoryCmd } from '../update-menu-catetory.command';
import { MenuCategoryService } from '../../services/menu-category.service';
import { MenuCategoryModel } from '../../../domain/model/menu-category.model';

@Injectable()
@CommandHandler(UpdateMenuCategoryCmd)
export class UpdateMenuCategoryHandler
  implements ICommandHandler<UpdateMenuCategoryCmd>
{
  constructor(private readonly menuCategoryService: MenuCategoryService) {}

  async execute(cmd: UpdateMenuCategoryCmd): Promise<MenuCategoryModel> {
    const model = await this.menuCategoryService.updateMenuCategory(cmd);
    return model;
  }
}
