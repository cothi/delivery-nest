import { Injectable } from '@nestjs/common';
import { IQuery } from '@nestjs/cqrs';
import { Field } from '@nestjs/graphql';

@Injectable()
export class GetMenuCategoryByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
