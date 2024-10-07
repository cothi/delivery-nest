import { IQuery } from '@nestjs/cqrs';

export class GetRestaurantsQuery implements IQuery {
  constructor(
    public readonly page: number,
    public readonly pageSize: number,
    public readonly take: number,
  ) {}
}
