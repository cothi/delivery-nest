import { restaurant } from '@prisma/client';
import { Field } from '@nestjs/graphql';
import { RestaurantParams } from './interface/restaurant-params.interface';

export class RestaurantModel implements restaurant {
  @Field()
  id: string;

  @Field()
  userId: string;

  @Field()
  address: string;

  @Field()
  name: string;

  @Field()
  phone: string;
  private constructor(params: RestaurantParams) {
    Object.assign(this, params);
  }

  static create(params: RestaurantParams): RestaurantModel {
    return new RestaurantModel(params);
  }
}
