import { IQuery } from '@nestjs/cqrs';

export class GetMenusByCategoryIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
