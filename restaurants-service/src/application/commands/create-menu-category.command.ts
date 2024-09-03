import { ICommand } from '@nestjs/cqrs';

export class CreateMenuCategoryCmd implements ICommand {
  constructor(
    public readonly restaurantId: string,
    public readonly name: string,
  ) {}
}
