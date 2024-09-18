import { Order as PrismaOrder, OrderStatus, Prisma } from '@prisma/client';
import { UpdateOrderStatusCmd } from '../../../application/command/update-order-status.command';
import { CreateOrderCmd } from '../../../application/command/create-order.command';
import { Order } from '../../../domain/model/order.model';

export class OrderMapper {
  static createToPersistence(cmd: CreateOrderCmd): Prisma.OrderCreateInput {
    return {
      totalAmount: cmd.totalAmount,
      status: OrderStatus.PENDING,
      customer: {
        connect: { id: cmd.customerId },
      },
      restaurant: {
        connect: { id: cmd.restaurantId },
      },
      orderFoods: {
        create: cmd.foodFoods.map((food) => ({
          quantity: food.quantity,
          price: food.price,
          food: {
            connect: { id: cmd.customerId },
          },
        })),
      },
    };
  }
  static updateStatusToPersistence(
    cmd: UpdateOrderStatusCmd,
  ): Prisma.OrderUpdateInput {
    return {
      status: cmd.orderStatus,
    };
  }

  static toDomain(order: PrismaOrder): Order {
    return Order.create(order);
  }
}
