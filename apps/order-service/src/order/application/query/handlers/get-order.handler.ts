import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOrderQuery } from '../get-order.query';
import { OrderService } from '../../services/order.service';
import { Order } from '../../../domain/model/order.model';

@Injectable()
@QueryHandler(GetOrderQuery)
export class GetOrderHandler implements IQueryHandler<GetOrderQuery> {
  constructor(private readonly orderService: OrderService) {}
  async execute(query: GetOrderQuery): Promise<Order> {
    return await this.orderService.getOrderById(query);
  }
}
