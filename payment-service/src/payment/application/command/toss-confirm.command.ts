import { ICommand } from '@nestjs/cqrs';

export class TossConfirmCommand implements ICommand {
  constructor(
    public readonly orderId: string,
    public readonly paymentKey: string,
    public readonly amount: number,
  ) {}
}
