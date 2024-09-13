import {Order as PrismaOrder, OrderStatus, Prisma} from "@prisma/client";
import {CreateOrderCmd, UpdateOrderStatusCmd} from "../order.repository";
import {Order} from "../../../domain/model/order.model";




export class OrderMapper {

   static createToPersistence (cmd: CreateOrderCmd): Prisma.OrderCreateInput {
      return {
         totalAmount: cmd.totalAmount,
         status: OrderStatus.PENDING,
         customer: {
            connect: {id: cmd.customerId}
         },
         restaurant: {
            connect: {id: cmd.restaurantId}
         },
         orderFoods: {
            create: cmd.foodFoods.map(food => ({
               quantity: food.quantity,
               price: food.price,
               food: {
                  connect: {id: cmd.customerId}
               }
            }))
         }
      };
   }
   static updateToPersistence(cmd: UpdateOrderStatusCmd): Prisma.OrderUpdateInput {
      return {
         status: cmd.orderStatus,
      }
   }


   static toDomain(order: PrismaOrder) {
      return new Order(order);
   }
}