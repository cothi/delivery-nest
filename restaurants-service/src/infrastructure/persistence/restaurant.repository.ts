import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RestaurantMapper } from '../mapper/restaurant.mapper';
import { CreateRestaurantCmd } from '../../application/commands/create-restaurant.command';
import { RestaurantModel } from '../../domain/model/restaurant.model';
import { map } from 'rxjs';
import { ICommand } from '@nestjs/cqrs';
import { menu_category } from '@prisma/client';

@Injectable()
export class RestaurantRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createRestaurant(cmd: CreateRestaurantCmd): Promise<RestaurantModel> {
    const restaurantEntity = RestaurantMapper.toPersistence(cmd);
    const restaurant = await this.prismaService.restaurant.create({
      data: restaurantEntity,
    });
    return RestaurantMapper.toDomain(restaurant);
  }

  async getRestaurantById(id: string): Promise<RestaurantModel> {
    const restaurant = await this.prismaService.restaurant.findUnique({
      where: { id },
    });
    return RestaurantMapper.toDomain(restaurant);
  }

  async getListRestaurants(
    skip: number,
    pageSize: number,
  ): Promise<RestaurantModel[]> {
    const restaurants = await this.prismaService.restaurant.findMany({
      skip,
      take: pageSize,
      orderBy: { address: 'desc' },
    });
    const test = restaurants.map(restaurant =>
      RestaurantMapper.toDomain(restaurant),
    );
    return test;
  }
}
