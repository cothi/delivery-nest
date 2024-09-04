import { restaurant as Restaurant } from '@prisma/client';
import { CreateRestaurantCmd } from '../../application/commands/create-restaurant.command';
import { RestaurantModel } from '../../domain/models/restaurant.model';

export class RestaurantMapper {
  static toPersistence(cmd: CreateRestaurantCmd): Omit<Restaurant, 'id'> {
    const { userId, name, phone, address } = cmd;
    return {
      userId,
      name,
      phone,
      address,
    };
  }

  static toDomain(entity: Restaurant): RestaurantModel {
    const { id, address, name, phone, userId } = entity;
    return {
      id,
      address,
      name,
      phone,
      userId,
    };
  }
}
