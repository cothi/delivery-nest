import { Mutation, Resolver, Query, Args } from '@nestjs/graphql';
import { RestaurantModel } from '../../domain/models/restaurant.model';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateRestaurantInput } from '../dto/create-restaurant.input';
import { CreateRestaurantCmd } from '../../application/commands/create-restaurant.command';
import { GetRestaurantByIdInput } from '../dto/get-restaurant-by-id.input';
import { GetRestaurantByIdQuery } from '../../application/queries/get-restaurant-by-id.query';
import { GetRestaurantsInput } from '../dto/get-restaurants.input';
import { GetRestaurantsQuery } from '../../application/queries/get-restaurants.query';

@Resolver(() => RestaurantModel)
export class RestaurantResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Mutation(() => RestaurantModel)
  async createRestaurant(
    @Args('input') input: CreateRestaurantInput,
  ): Promise<RestaurantModel> {
    const cmd = new CreateRestaurantCmd(
      input.userId,
      input.address,
      input.name,
      input.phone,
    );
    return await this.commandBus.execute(cmd);
  }

  @Query(() => RestaurantModel)
  async getRestaurantById(
    @Args('input') input: GetRestaurantByIdInput,
  ): Promise<RestaurantModel> {
    const query = new GetRestaurantByIdQuery(input.id);
    return await this.queryBus.execute(query);
  }

  @Query(() => [RestaurantModel])
  async getRestaurants(
    @Args('input')
    input: GetRestaurantsInput,
  ): Promise<RestaurantModel[]> {
    const query = new GetRestaurantsQuery(
      input.page,
      input.pageSize,
      input.take,
    );
    return await this.queryBus.execute(query);
  }
}
