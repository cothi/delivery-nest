import { gatewayConfig } from './utils/config/gateway.confg';
import { serverConfig } from './utils/config/server.confg';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: serverConfig,
      gateway: gatewayConfig,
    }),
  ],
  providers: [],
})
export class AppModule {}
