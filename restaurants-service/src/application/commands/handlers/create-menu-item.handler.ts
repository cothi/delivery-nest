import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateMenuItemCmd } from '../create-menu-item.command';
import { MenuCategoryService } from '../../services/menu-category.service';
import { MenuCategoryModel } from '../../../domain/model/menu-category.model';
import { MenuItemService } from '../../services/menu-item.service';

@Injectable()
@CommandHandler(CreateMenuItemCmd)
export class CreateMenuItemHandler implements ICommandHandler {
  constructor(private readonly menuItemService: MenuItemService) {}

  async execute(cmd: CreateMenuItemCmd): Promise<MenuCategoryModel> {
    const model = this.menuItemService.createMenuItem(cmd);
    return model;
  }
}
