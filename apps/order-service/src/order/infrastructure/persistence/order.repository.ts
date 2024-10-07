import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OrderMapper } from './mapper/order.mapper';
import { Order } from '../../domain/model/order.model';
import { Prisma } from '@prisma/client';

@Injectable()
export class OrderRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async createOrder(data: Prisma.OrderCreateInput): Promise<Order> {
    const order = await this.prismaService.order.create({ data });
    return OrderMapper.toDomain(order);
  }

  async updateOrderStatus(
    id: string,
    data: Prisma.OrderUpdateInput,
  ): Promise<Order> {
    const order = await this.prismaService.order.update({
      where: { id },
      data: data,
    });
    return OrderMapper.toDomain(order);
  }

  async getOrderById(id: string): Promise<Order> {
    const order = await this.prismaService.order.findUnique({
      where: { id: id },
    });
    return OrderMapper.toDomain(order);
  }
}
