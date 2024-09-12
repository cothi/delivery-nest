import {Module} from '@nestjs/common';
import {DatabaseModule} from './infrastructure/prisma/database.module';
import {CqrsModule} from '@nestjs/cqrs';
import {MenuItemService} from './application/services/menu-item.service';
import {MenuItemRepository} from './infrastructure/persistence/repository/menu-item.repository';
import {MenuItemResolver} from './presentation/resolver/menu-item.resolver';
import {GetMenuByCategoryIdHandler} from './application/queries/handlers/get-menu-by-category-id.handler';
import {GetMenuByIdHandler} from './application/queries/handlers/get-menu-by-id.handler';
import {GetMenuByRestaurantIdHandler} from './application/queries/handlers/get-menu-by-restaurant-id.handler';
import {CreateMenuItemHandler} from './application/commands/handlers/create-menu-item.handler';
import {UpdateMenuItemHandler} from './application/commands/handlers/update-menu-item.handler';
import {MenuItemConsumer} from "./infrastructure/kafka/menu-item.consumer";
import {ClientKafka, ClientsModule} from "@nestjs/microservices";
import {AwsS3Uploader} from "./infrastructure/AWS/S3/aws-s3.uploader";

@Module({
  imports: [ClientKafka, DatabaseModule, CqrsModule],
  providers: [
      AwsS3Uploader,
    MenuItemResolver,
    MenuItemService,
    MenuItemRepository,
    GetMenuByCategoryIdHandler,
    GetMenuByIdHandler,
    GetMenuByRestaurantIdHandler,
    CreateMenuItemHandler,
    UpdateMenuItemHandler,
  ],
  controllers: [
    MenuItemConsumer
  ]
})

export class MenuItemModule {}
