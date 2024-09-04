import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { MenuItemModel } from '../../../domain/models/menu-item.model';
import { UpdateMenuItemCmd } from '../update-menu-item.command';
import { MenuItemService } from '../../services/menu-item.service';
import { MenuCategoryModel } from '../../../../menu-category/domain/model/menu-category.model';

@Injectable()
@CommandHandler(UpdateMenuItemCmd)
export class UpdateMenuItemHandler
  implements ICommandHandler<UpdateMenuItemCmd>
{
  constructor(private readonly menuItemService: MenuItemService) {}
  async execute(cmd: UpdateMenuItemCmd): Promise<MenuItemModel> {
    const model = await this.menuItemService.updateMenuItem(cmd);
    return model;
  }
}
