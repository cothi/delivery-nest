import { ICommand } from '@nestjs/cqrs';
import { OrderStatus } from '@prisma/client';

export class UpdateOrderStatusCmd implements ICommand {
  constructor(
    public readonly orderId: string,
    public readonly orderStatus: OrderStatus,
  ) {}
}
