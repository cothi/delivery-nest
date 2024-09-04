import { IQuery } from '@nestjs/cqrs';
import { Field } from '@nestjs/graphql';

export class GetMenuByCategoryIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
