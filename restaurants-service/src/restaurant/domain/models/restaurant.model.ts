import { restaurant } from '@prisma/client';
import { Field, ObjectType } from '@nestjs/graphql';
import { RestaurantParams } from '../interfaces/restaurant-params.interface';

@ObjectType()
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
