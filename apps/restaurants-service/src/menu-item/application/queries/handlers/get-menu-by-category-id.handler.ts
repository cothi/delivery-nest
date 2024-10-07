import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { MenuItemModel } from '../../../domain/models/menu-item.model';
import { MenuItemService } from '../../services/menu-item.service';
import { GetMenusByCategoryIdQuery } from '../get-menus-by-category-id.query';

@Injectable()
@QueryHandler(GetMenusByCategoryIdQuery)
export class GetMenuByCategoryIdHandler
  implements IQueryHandler<GetMenusByCategoryIdQuery>
{
  constructor(private readonly menuItemService: MenuItemService) {}
  async execute(query: GetMenusByCategoryIdQuery): Promise<MenuItemModel[]> {
    return await this.menuItemService.getMenuItemByCategoryId(query.id);
  }
}
