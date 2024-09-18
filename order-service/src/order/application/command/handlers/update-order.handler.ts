import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateOrderStatusCmd } from '../update-order-status.command';
import { OrderService } from '../../services/order.service';
import { Order } from '../../../domain/model/order.model';

@Injectable()
@CommandHandler(UpdateOrderStatusCmd)
export class UpdateOrderStatusHandler
  implements ICommandHandler<UpdateOrderStatusCmd>
{
  constructor(private readonly orderService: OrderService) {}
  async execute(cmd: UpdateOrderStatusCmd): Promise<Order> {
    return await this.orderService.updateOrderStatus(cmd);
  }
}
