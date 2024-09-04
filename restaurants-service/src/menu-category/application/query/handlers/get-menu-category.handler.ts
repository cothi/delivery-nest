import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { MenuCategoryModel } from '../../../domain/model/menu-category.model';
import { MenuCategoryService } from '../../services/menu-category.service';
import { GetMenuCategoryByIdQuery } from '../get-menu-category-by-id.query';
import { GetMenusByCategoryIdQuery } from '../../../../menu-item/application/queries/get-menus-by-category-id.query';

@Injectable()
@QueryHandler(GetMenuCategoryByIdQuery)
export class GetMenuCategoryHandler
  implements IQueryHandler<GetMenusByCategoryIdQuery>
{
  constructor(private readonly menuCategoryService: MenuCategoryService) {}
  async execute(query: GetMenusByCategoryIdQuery): Promise<MenuCategoryModel> {
    const model = this.menuCategoryService.getMenuCategoryById(query.id);
    return model;
  }
}
