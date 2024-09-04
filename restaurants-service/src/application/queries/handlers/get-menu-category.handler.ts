import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetRestaurantsByIdQuery } from '../get-restaurant-by-id.query';
import { MenuCategoryModel } from '../../../domain/model/menu-category.model';
import { MenuCategoryService } from '../../services/menu-category.service';

@Injectable()
@QueryHandler(GetRestaurantsByIdQuery)
export class GetMenuCategoryHandler
  implements IQueryHandler<GetRestaurantsByIdQuery>
{
  constructor(private readonly menuCategoryService: MenuCategoryService) {}
  async execute(query: GetRestaurantsByIdQuery): Promise<MenuCategoryModel> {
    const model = this.menuCategoryService.getMenuCategoryById(query.id);
    return model;
  }
}
