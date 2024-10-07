import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetMenusByRestaurantIdQuery } from '../get-menus-by-restaurant-id.query';
import { MenuItemService } from '../../services/menu-item.service';
import { MenuItemModel } from '../../../domain/models/menu-item.model';

@Injectable()
@QueryHandler(GetMenusByRestaurantIdQuery)
export class GetMenuByRestaurantIdHandler
  implements IQueryHandler<GetMenusByRestaurantIdQuery>
{
  constructor(private readonly menuItemService: MenuItemService) {}

  async execute(query: GetMenusByRestaurantIdQuery): Promise<MenuItemModel[]> {
    return await this.menuItemService.getMenuItemsByRestaurantId(query.id);
  }
}
