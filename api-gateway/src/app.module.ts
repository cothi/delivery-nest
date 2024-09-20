import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway';
import { GatewayErrorFormatter } from './utils/error/format/gateway-error-formatter';

class FileUploadDataSource extends RemoteGraphQLDataSource {
  async willSendRequest({ request, context }) {
    const { variables } = request;
    if (context.token) {
      request.http.headers.set('authorization', context.token);
    }
    if (variables && variables.file) {
      const { createReadStream, filename, mimetype } = await variables.file.file;
      const chunks = [];
      for await (const chunk of createReadStream()) {
        chunks.push(chunk);
      }
      const buffer = Buffer.concat(chunks);
      variables.file = {
        filename,
        mimetype,
        buffer: buffer.toString('base64'),
      };
    }
  }
}

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
            {
              name: 'orders',
              url: 'http://order-service:3001/graphql'
            },
            {
              name: 'users',
              url: 'http://user-service:3002/graphql'
            },
            {
              name: 'restaurants',
              url: 'http://restaurants-service:3003/graphql',
            },
            {
              name: 'payments',
              url: 'http://payment-service:5000/graphql',
            },
          ],
        }),
        buildService({ url }) {
          return new FileUploadDataSource({url});
        },
      },
    }),
  ],
  providers: [],
})
export class AppModule {}
