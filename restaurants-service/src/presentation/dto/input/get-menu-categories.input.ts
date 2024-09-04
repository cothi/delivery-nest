import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@InputType()
export class GetMenuCategoriesInput {
  @Field(() => Int)
  @IsNumber()
  page: number;

  @Field(() => Int)
  @IsNumber()
  pageSize: number;

  @Field(() => Int)
  @IsNumber()
  take: number;
}
