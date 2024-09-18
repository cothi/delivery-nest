import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Order } from '../../domain/model/order.model';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateOrderInput } from '../dto/order.input';
import { CreateOrderCmd } from '../../application/command/create-order.command';
import { GetOrderQuery } from '../../application/query/get-order.query';

@Resolver(() => Order)
export class OrderResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
  @Mutation(() => Order)
  async createOrder(@Args('input') input: CreateOrderInput) {
    const cmd = new CreateOrderCmd(
      input.restaurantId,
      input.customerId,
      0,
      input.orderFoods.map((food) => ({
        foodId: food.FoodId,
        quantity: food.quantity,
      })),
    );
    return await this.commandBus.execute(cmd);
  }

  @Query(() => Order)
  async getOrder(@Args('input') input: string): Promise<Order> {
    const query = new GetOrderQuery(input);
    return await this.queryBus.execute(query);
  }
}
