import { IQuery } from '@nestjs/cqrs';
import { Field } from '@nestjs/graphql';

export class GetMenuByRestaurantIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
