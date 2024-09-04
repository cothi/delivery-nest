import { ICommand } from '@nestjs/cqrs';

export class CreateMenuItemCmd implements ICommand {
  constructor(
    public readonly mainPhotoUrl: string,
    public readonly menuCategoryId: string,
    public readonly restaurantId: string,
    public readonly name: string,
    public readonly price: number,
    public readonly description: string,
  ) {}
}
