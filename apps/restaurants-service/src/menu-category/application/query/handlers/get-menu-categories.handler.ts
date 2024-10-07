import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetMenuCategoriesQuery } from '../get-menu-categories.query';
import { Injectable } from '@nestjs/common';
import { MenuCategoryService } from '../../services/menu-category.service';
import { MenuCategoryModel } from '../../../domain/model/menu-category.model';

@Injectable()
@QueryHandler(GetMenuCategoriesQuery)
export class GetMenuCategoriesHandler
  implements IQueryHandler<GetMenuCategoriesQuery>
{
  constructor(private readonly menuCategoryService: MenuCategoryService) {}

  async execute(query: GetMenuCategoriesQuery): Promise<MenuCategoryModel[]> {
    const models = this.menuCategoryService.getMenuCategories(query);
    return models;
  }
}
