import { IQuery } from '@nestjs/cqrs';

export class GetMenuListQuery implements IQuery {
  constructor(public readonly id: string) {}
}
