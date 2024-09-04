import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { IntrospectAndCompose, RemoteGraphQLDataSource } from "@apollo/gateway";
import { GatewayErrorFormatter } from './utils/error/format/gateway-error-formatter';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {
        formatError: GatewayErrorFormatter.formatError,
        context: ({ req }) => {
          const authHeader = req.headers.authorization;
          return { token: authHeader };
        },
      },
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            //{ name: 'orders', url: 'http://localhost:3001/graphql' },
            { name: 'restaurants', url: 'http://localhost:3003/graphql' },
            //{ name: 'deliveries', url: 'http://delivery-service:3003/graphql' },
            { name: 'users', url: 'http://localhost:3002/graphql' },
          ],
        }),
        buildService({ url }) {
          return new RemoteGraphQLDataSource({
            url,
            willSendRequest({ request, context }) {
              // 클라이언트의 Authorization 헤더를 서브그래프에 전달
              if (context.token) {
                request.http.headers.set('authorization', context.token);
              }
            },
          });
        },
      },
    }),
  ],
})
export class AppModule {}
