import { ICommand } from '@nestjs/cqrs';
import { MenuCategoryModel } from '../../domain/model/menu-category.model';

export class CreateMenuCategoryCmd implements ICommand {
  constructor(
    public readonly restaurantId: string,
    public readonly name: string,
  ) {}
}
