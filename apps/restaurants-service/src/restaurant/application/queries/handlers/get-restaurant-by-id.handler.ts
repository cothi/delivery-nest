import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetRestaurantByIdQuery } from '../get-restaurant-by-id.query';
import { RestaurantService } from '../../services/restaurant.serivce';
import { RestaurantModel } from '../../../domain/models/restaurant.model';

@Injectable()
@QueryHandler(GetRestaurantByIdQuery)
export class GetRestaurantByIdHandler
  implements IQueryHandler<GetRestaurantByIdQuery>
{
  constructor(private readonly restaurantService: RestaurantService) {}
  async execute(query: GetRestaurantByIdQuery): Promise<RestaurantModel> {
    return await this.restaurantService.getRestaurantById(query.id);
  }
}
