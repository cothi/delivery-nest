import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetMenuByRestaurantIdQuery } from '../get-menu-by-restaurant-id.query';
import { MenuItemService } from '../../services/menu-item.service';
import { MenuItemModel } from '../../../domain/model/menu-item.model';

@Injectable()
@QueryHandler(GetMenuByRestaurantIdQuery)
export class GetMenuByRestaurantIdHandler
  implements IQueryHandler<GetMenuByRestaurantIdQuery>
{
  constructor(private readonly menuItemService: MenuItemService) {}

  async execute(query: GetMenuByRestaurantIdQuery): Promise<MenuItemModel[]> {
    return await this.menuItemService.getMenuItemsByRestaurantId(query.id);
  }
}
