import { Module } from '@nestjs/common';
import { DatabaseModule } from '../infrastructure/prisma/database.module';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { UserModule } from './user.module';
import { GraphQLExceptionFilter } from '../utils/filters/exception.filter';
import { JwtAuthGuard } from '../utils/guard/jwt-auth.guard';
import { JwtTokenModule } from '../utils/jwt/jwt.module';

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
