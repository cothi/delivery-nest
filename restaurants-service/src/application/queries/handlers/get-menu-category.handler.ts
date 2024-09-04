import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { MenuCategoryModel } from '../../../domain/model/menu-category.model';
import { MenuCategoryService } from '../../services/menu-category.service';
import { GetMenuByCategoryIdQuery } from '../get-menu-by-category-id.query';

@Injectable()
@QueryHandler(GetMenuByCategoryIdQuery)
export class GetMenuCategoryHandler
  implements IQueryHandler<GetMenuByCategoryIdQuery>
{
  constructor(private readonly menuCategoryService: MenuCategoryService) {}
  async execute(query: GetMenuByCategoryIdQuery): Promise<MenuCategoryModel> {
    const model = this.menuCategoryService.getMenuCategoryById(query.id);
    return model;
  }
}
