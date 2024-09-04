import { ICommand } from '@nestjs/cqrs';

export class CreateRestaurantCmd implements ICommand {
  constructor(
    public readonly userId: string,
    public readonly address: string,
    public readonly name: string,
    public readonly phone: string,
  ) {}
}
