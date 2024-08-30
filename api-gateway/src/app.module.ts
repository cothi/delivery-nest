import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { IntrospectAndCompose } from '@apollo/gateway';
import { GatewayErrorFormatter } from './utils/error/format/gateway-error-formatter';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {
        formatError: GatewayErrorFormatter.formatError,
      },
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            //{ name: 'orders', url: 'http://localhost:3001/graphql' },
            //{ name: 'restaurants', url: 'http://restaurant-service:3002/graphql' },
            //{ name: 'deliveries', url: 'http://delivery-service:3003/graphql' },
            { name: 'users', url: 'http://localhost:3002/graphql' },
          ],
        }),
      },
    }),

  ],
})
export class AppModule {}
