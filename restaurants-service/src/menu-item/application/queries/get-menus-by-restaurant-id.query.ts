import { IQuery } from '@nestjs/cqrs';

export class GetMenusByRestaurantIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
