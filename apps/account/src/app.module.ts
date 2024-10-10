import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import * as process from 'node:process';
import { GraphQLExceptionFilter } from '@libs/filter';
import { SlackNotificationService } from '@libs/slack';
import { LoggerModule } from '@libs/logger';
import { UserModule } from '@account/user/user.module';
import { LoggingInterceptor } from '@libs/interceptor';
import { DatabaseModule } from '@libs/database';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: true,
    }),
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
      isGlobal: true,
    }),
    UserModule,
    LoggerModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [
    {
      provide: 'APP_FILTER',
      useClass: GraphQLExceptionFilter,
    },
    {
      provide: 'APP_INTERCEPTOR',
      useClass: LoggingInterceptor,
    },
    SlackNotificationService,
  ],
})
export class AppModule {}
