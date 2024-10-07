import { ICommand } from '@nestjs/cqrs';

export class CreateOrderCmd implements ICommand {
  constructor(
    public readonly restaurantId: string,
    public readonly customerId: string,
    public readonly totalAmount: number,
    public readonly foodFoods: OrderFood[],
  ) {}
}

type OrderFood = {
  foodId: string;
  quantity: number;
};
