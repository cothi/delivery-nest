import { ICommand } from '@nestjs/cqrs';

export class getMenuCategoryQuery implements ICommand {
  constructor(public readonly id: string) {}
}
