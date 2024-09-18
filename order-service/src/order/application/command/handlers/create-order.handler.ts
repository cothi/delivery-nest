import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateOrderCmd } from '../create-order.command';
import { OrderService } from '../../services/order.service';
import { Order } from '../../../domain/model/order.model';

@Injectable()
@CommandHandler(CreateOrderCmd)
export class CreateOrderHandler implements ICommandHandler<CreateOrderCmd> {
  constructor(private readonly orderService: OrderService) {}
  async execute(cmd: CreateOrderCmd): Promise<Order> {
    return await this.orderService.createOrder(cmd);
  }
}
