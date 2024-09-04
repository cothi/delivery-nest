import { Injectable } from '@nestjs/common';
import { IQuery } from '@nestjs/cqrs';
import { Field } from '@nestjs/graphql';

@Injectable()
export class GetMenuCategoriesQuery implements IQuery {
  constructor(
    public readonly page: number,
    public readonly pageSize: number,
    public readonly take: number,
  ) {}
}
