import {Args, Mutation, Resolver} from '@nestjs/graphql';
import {CommandBus, QueryBus} from '@nestjs/cqrs';
import {MenuItemModel} from '../../domain/models/menu-item.model';
import {CreateMenuItemInput} from '../dto/create-menu-item.input';
import {UpdateMenuItemInput} from '../dto/update-menu-item.input';
import {GetMenuItemByIdInput} from '../dto/get-menu-item-by-id.input';
import {GetMenuItemsByCategoryIdInput} from '../dto/get-menu-items-by-category-id.input';
import {GetMenuItemsByRestaurantIdInput} from '../dto/get-menu-items-by-restaurant-id.input';
import {CreateMenuItemCmd} from '../../application/commands/create-menu-item.command';
import {UpdateMenuItemCmd} from '../../application/commands/update-menu-item.command';
import {GetMenuByIdQuery} from '../../application/queries/get-menu-by-id.query';
import {GetMenusByCategoryIdQuery} from '../../application/queries/get-menus-by-category-id.query';
import {GetMenusByRestaurantIdQuery} from '../../application/queries/get-menus-by-restaurant-id.query';
import {GraphQLUpload, Upload} from 'graphql-upload-minimal';

import {AwsS3Uploader} from "../../infrastructure/AWS/S3/aws-s3.uploader";


@Resolver()
export class MenuItemResolver {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Mutation(() => MenuItemModel)
  async createMenuItem(
    @Args('input') input: CreateMenuItemInput,
  ): Promise<MenuItemModel> {
    const cmd = new CreateMenuItemCmd(
      input.menuCategoryId,
      input.restaurantId,
      input.name,
      input.price,
      input.description,
        input.file
    );
    return await this.commandBus.execute(cmd);
  }

  @Mutation(() => MenuItemModel)
  async updateMenuItem(
    @Args('input') input: UpdateMenuItemInput,
  ): Promise<MenuItemModel> {
    const cmd = new UpdateMenuItemCmd(input.id, { ...input });
    return await this.commandBus.execute(cmd);
  }

  @Mutation(() => MenuItemModel)
  async getMenuItemById(
    @Args('id') input: GetMenuItemByIdInput,
  ): Promise<MenuItemModel> {
    const query = new GetMenuByIdQuery(input.id);
    return await this.queryBus.execute(query);
  }

  @Mutation(() => [MenuItemModel])
  async getMenuItemsByCategoryId(
    @Args('id') input: GetMenuItemsByCategoryIdInput,
  ): Promise<MenuItemModel[]> {
    const query = new GetMenusByCategoryIdQuery(input.categoryId);
    return await this.queryBus.execute(query);
  }

  @Mutation(() => [MenuItemModel])
  async getMenuItemByRestaurantId(
    @Args('id') input: GetMenuItemsByRestaurantIdInput,
  ): Promise<MenuItemModel[]> {
    const query = new GetMenusByRestaurantIdQuery(input.restaurantId);
    return await this.queryBus.execute(query);
  }
  @Mutation(() => Boolean)
  async updateImage(
    @Args({ name: 'image', type: () => GraphQLUpload })
    image: Upload,
  ): Promise<Boolean> {
    console.log(image);
    return true;
  }
}
