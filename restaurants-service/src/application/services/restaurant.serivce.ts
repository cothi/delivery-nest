import { Injectable } from '@nestjs/common';
import { RestaurantRepository } from '../../infrastructure/persistence/restaurant.repository';
import { CreateRestaurantCmd } from '../commands/create-restaurant.command';
import { RestaurantModel } from '../../domain/model/restaurant.model';
import { min } from 'rxjs';
import { GetRestaurantsQuery } from '../queries/get-restaurants.query';

@Injectable()
export class RestaurantService {
  constructor(private readonly restaurantRepository: RestaurantRepository) {}

  async createRestaurant(cmd: CreateRestaurantCmd): Promise<RestaurantModel> {
    const model = await this.restaurantRepository.createRestaurant(cmd);
    return model;
  }

  async getRestaurantById(id: string): Promise<RestaurantModel> {
    return await this.restaurantRepository.getRestaurantById(id);
  }
  async getRestaurants(query: GetRestaurantsQuery): Promise<RestaurantModel[]> {
    const { take, pageSize, page } = query;
    const size: number = take > 20 ? 20 : take;
    const skip: number = pageSize * page - 1;
    return await this.restaurantRepository.getListRestaurants(skip, size);
  }
}
