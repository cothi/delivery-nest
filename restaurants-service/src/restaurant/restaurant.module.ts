import { Module } from '@nestjs/common';
import { RestaurantResolver } from './presentation/resolver/restaurant.resolver';
import { CreateRestaurantHandler } from './application/commands/handlers/create-restaurant.handler';
import { GetRestaurantsHandler } from './application/queries/handlers/get-restaurants.handler';
import { GetRestaurantByIdHandler } from './application/queries/handlers/get-restaurant-by-id.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { RestaurantService } from './application/services/restaurant.serivce';
import { RestaurantRepository } from './infrastructure/persistence/repository/restaurant.repository';
import { DatabaseModule } from './infrastructure/prisma/database.module';

@Module({
  imports: [DatabaseModule, CqrsModule],
  providers: [
    RestaurantResolver,
    CreateRestaurantHandler,
    GetRestaurantsHandler,
    GetRestaurantByIdHandler,
    RestaurantService,
    RestaurantRepository,
  ],
})
export class RestaurantModule {}
