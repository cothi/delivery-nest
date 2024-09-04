import { Injectable } from '@nestjs/common';
import { RestaurantService } from '../../services/restaurant.serivce';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateRestaurantCmd } from '../create-restaurant.command';
import { MenuCategoryModel } from '../../../domain/model/menu-category.model';
import { RestaurantModel } from '../../../domain/model/restaurant.model';

@Injectable()
@CommandHandler(CreateRestaurantCmd)
export class CreateRestaurantHandler
  implements ICommandHandler<CreateRestaurantCmd>
{
  constructor(private readonly restaurantService: RestaurantService) {}

  async execute(cmd: CreateRestaurantCmd): Promise<RestaurantModel> {
    const model = await this.restaurantService.createRestaurant(cmd);

    return model;
  }
}
