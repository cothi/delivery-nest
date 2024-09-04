import { ICommand } from '@nestjs/cqrs';

export class UpdateMenuItemCmd implements ICommand {
  constructor(
    public readonly id: string,
    public readonly updates: {
      mainPhotoUrl?: string;
      menuCategoryId?: string;
      restaurantId?: string;
      name?: string;
      price?: number;
      description?: string;
    },
  ) {}
}
