import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetMenuByCategoryIdQuery } from '../get-menu-by-category-id.query';
import { MenuItemModel } from '../../../domain/model/menu-item.model';
import { MenuItemService } from '../../services/menu-item.service';

@Injectable()
@QueryHandler(GetMenuByCategoryIdQuery)
export class GetMenuByCategoryIdHandler
  implements IQueryHandler<GetMenuByCategoryIdQuery>
{
  constructor(private readonly menuItemService: MenuItemService) {}
  async execute(query: GetMenuByCategoryIdQuery): Promise<MenuItemModel[]> {
    return await this.menuItemService.getMenuItemByCategoryId(query.id);
  }
}
