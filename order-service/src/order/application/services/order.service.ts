import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../../infrastructure/persistence/order.repository';
import { CreateOrderCmd } from '../command/create-order.command';
import { Order } from '../../domain/model/order.model';
import { OrderMapper } from '../../infrastructure/persistence/mapper/order.mapper';
import { UpdateOrderStatusCmd } from '../command/update-order-status.command';
import { GetOrderQuery } from '../query/get-order.query';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}
  async createOrder(cmd: CreateOrderCmd): Promise<Order> {
    return await this.orderRepository.createOrder(
      OrderMapper.createToPersistence(cmd),
    );
  }

  async updateOrderStatus(cmd: UpdateOrderStatusCmd): Promise<Order> {
    return await this.orderRepository.updateOrderStatus(
      cmd.orderId,
      OrderMapper.updateStatusToPersistence(cmd),
    );
  }

  async getOrderById(query: GetOrderQuery): Promise<Order> {
    return await this.orderRepository.getOrderById(query.id);
  }
}
