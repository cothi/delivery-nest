import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { MenuCategoryModel } from '../domain/model/menu-category.model';
import { CreateMenuCategoryInput } from './dto/create-menu-category.input';
import { CreateMenuCategoryCmd } from '../application/commands/create-menu-category.command';
import { GetMenuCategoryInput } from './dto/get-menu-category.input';
import { GetMenuCategoriesInput } from './dto/get-menu-categories.input';
import { GetMenuCategoriesQuery } from '../application/query/get-menu-categories.query';
import { GetMenusByCategoryIdQuery } from '../../menu-item/application/queries/get-menus-by-category-id.query';

@Resolver()
export class MenuCategoryResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Mutation(() => MenuCategoryModel)
  async createMenuCategory(
    @Args('input') input: CreateMenuCategoryInput,
  ): Promise<MenuCategoryModel> {
    const cmd = new CreateMenuCategoryCmd(input.restaurantId, input.name);
    return await this.commandBus.execute(cmd);
  }

  @Query(() => MenuCategoryModel)
  async getMenuCategory(@Args('input') input: GetMenuCategoryInput) {
    const query = new GetMenusByCategoryIdQuery(input.id);
    return await this.queryBus.execute(query);
  }

  @Query(() => [MenuCategoryModel])
  async getMenuCategories(
    @Args('input') input: GetMenuCategoriesInput,
  ): Promise<MenuCategoryModel[]> {
    const query = new GetMenuCategoriesQuery(
      input.page,
      input.pageSize,
      input.take,
    );
    return await this.queryBus.execute(query);
  }
}
