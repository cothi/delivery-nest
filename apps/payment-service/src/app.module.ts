import { Module } from '@nestjs/common';
import { PaymentModule } from './payment/payment.module';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: true,
    }),
    PaymentModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
