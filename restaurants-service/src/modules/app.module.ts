import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { DatabaseModule } from '../infrastructure/prisma/database.module';
import { ConfigModule } from '@nestjs/config';
import { RestaurantModule } from './restaurant.module';
import { MenuCategoryModule } from './menu-category.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: true,
    }),
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    RestaurantModule,
    MenuCategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
