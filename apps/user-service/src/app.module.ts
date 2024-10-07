import { Module } from '@nestjs/common';
import { DatabaseModule } from './infrastructure/prisma/database.module';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { UserModule } from './modules/user.module';
import { GraphQLExceptionFilter } from './utils/filters/exception.filter';
import { JwtAuthGuard } from './utils/guard/jwt-auth.guard';
import { JwtTokenModule } from './utils/jwt/jwt.module';
import * as process from 'node:process';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: true,
    }),
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
      isGlobal: true,
    }),
    UserModule,
  ],
  controllers: [],
  providers: [
    {
      provide: 'APP_FILTER',
      useClass: GraphQLExceptionFilter,
    },
  ],
})
export class AppModule {}
