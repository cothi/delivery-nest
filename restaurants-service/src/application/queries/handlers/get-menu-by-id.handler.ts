import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetMenuByIdQuery } from '../get-menu-by-id.query';
import { MenuItemModel } from '../../../domain/model/menu-item.model';
import { MenuItemService } from '../../services/menu-item.service';

@Injectable()
@QueryHandler(GetMenuByIdQuery)
export class GetMenuByIdHandler implements IQueryHandler<GetMenuByIdQuery> {
  constructor(private readonly menuItemService: MenuItemService) {}

  async execute(query: GetMenuByIdQuery): Promise<MenuItemModel> {
    return await this.menuItemService.getMenuItemById(query.id);
  }
}
