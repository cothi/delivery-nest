import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetRestaurantsQuery } from '../get-restaurants.query';
import { RestaurantService } from '../../services/restaurant.serivce';
import { MenuCategoryModel } from '../../../domain/model/menu-category.model';
import { RestaurantModel } from '../../../domain/model/restaurant.model';

@Injectable()
@QueryHandler(GetRestaurantsQuery)
export class GetRestaurantsHandler
  implements IQueryHandler<GetRestaurantsQuery>
{
  constructor(private readonly restaurantService: RestaurantService) {}

  async execute(query: GetRestaurantsQuery): Promise<RestaurantModel[]> {
    return await this.restaurantService.getRestaurants(query);
  }
}
