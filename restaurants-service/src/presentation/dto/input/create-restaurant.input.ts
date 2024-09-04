import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateRestaurantInput {
  @Field()
  @IsString()
  address: string;

  @Field()
  name: string;

  @Field()
  phone: string;

  @Field()
  userId: string;
}
