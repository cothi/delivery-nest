import { Module } from '@nestjs/common';
import { DatabaseModule } from '../infrastructure/prisma/database.module';
import { MenuCategoryService } from '../application/services/menu-category.service';
import { MenuCategoryResolver } from '../presentation/menu-category.resolver';
import { CreateMenuCategoryHandler } from '../application/commands/handlers/create-menu-category.handler';
import { GetMenuCategoriesHandler } from '../application/queries/handlers/get-menu-categories.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { MenuCategoryRepository } from '../infrastructure/persistence/menu-category.repository';

@Module({
  imports: [DatabaseModule, CqrsModule],
  providers: [
    MenuCategoryService,
    MenuCategoryResolver,
    CreateMenuCategoryHandler,
    GetMenuCategoriesHandler,
    MenuCategoryRepository,
  ],
})
export class MenuCategoryModule {}
