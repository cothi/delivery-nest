import { Module } from '@nestjs/common';
import { DatabaseModule } from './infrastructure/prisma/database.module';
import { CqrsModule } from '@nestjs/cqrs';
import { MenuItemService } from './application/services/menu-item.service';
import { MenuItemRepository } from './infrastructure/persistence/repository/menu-item.repository';
import { CreateMenuCategoryHandler } from '../menu-category/application/commands/handlers/create-menu-category.handler';
import { GetMenuCategoriesHandler } from '../menu-category/application/query/handlers/get-menu-categories.handler';
import { GetMenuCategoryHandler } from '../menu-category/application/query/handlers/get-menu-category.handler';

@Module({
  imports: [DatabaseModule, CqrsModule],
  providers: [
    MenuItemService,
    MenuItemRepository,
    CreateMenuCategoryHandler,
    GetMenuCategoriesHandler,
    GetMenuCategoryHandler,
  ],
})
export class MenuItemModule {}
