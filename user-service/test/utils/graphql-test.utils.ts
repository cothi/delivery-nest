import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

export enum GraphQLQueryEnum {
  SIGN_UP = 'SIGN_UP',
  LOGIN = 'LOGIN',
  DELETE_ACCOUNT = 'DELETE_ACCOUNT',
}
export type SignUpInput = {
  nickname: string;
  email: string;
  password: string;
};
export type LoginInput = {
  email: string;
  password: string;
};

export const GraphQLQueries = {
  [GraphQLQueryEnum.SIGN_UP]: `
    mutation SignUp($input: CreateUserDto!) {
      signUp(input: $input) {
        accessToken
        refreshToken
      }
    }
  `,
  [GraphQLQueryEnum.LOGIN]: `
    mutation Login($input: LoginInput!) {
      login(input: $input) {
        accessToken
        refreshToken
      }
    }
  `,
  [GraphQLQueryEnum.DELETE_ACCOUNT]: `
    mutation DeleteAccount {
      deleteAccount
    }
  `,
} as const;

export async function executeGraphQL(
  app: INestApplication,
  queryName: GraphQLQueryEnum,
  variables?: any,
  token?: string,
) {
  const query = GraphQLQueries[queryName];
  const req = request(app.getHttpServer()).post('/graphql').send({ query, variables });
  if (token) {
    req.set('Authorization', `Bearer ${token}`);
  }
  return await req;
}
