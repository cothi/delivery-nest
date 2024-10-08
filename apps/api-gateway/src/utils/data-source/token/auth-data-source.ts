// 인증 처리를 위한 클래스
import { RemoteGraphQLDataSource } from '@apollo/gateway';
import { GraphQLRequest } from 'apollo-server-types';

export class AuthDataSource extends RemoteGraphQLDataSource {
  async willSendRequest({
    request,
    context,
  }: {
    request: GraphQLRequest;
    context: any;
  }) {
    if (context.token) {
      request.http?.headers.set('authorization', context.token);
    }
  }
}
