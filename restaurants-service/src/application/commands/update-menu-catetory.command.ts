import { ICommand } from '@nestjs/cqrs';

export class UpdateMenuCategoryCmd implements ICommand {
  constructor(
    public readonly id: string,
    public readonly name: string,
  ) {}
}
