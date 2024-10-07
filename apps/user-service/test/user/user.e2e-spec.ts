import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import * as request from 'supertest';
import { executeGraphQL, GraphQLQueryEnum } from '../utils/graphql-test.utils';
import * as process from 'node:process';

describe('User Resolver (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('sign up', () => {
    it('should sign up a user', async () => {
      console.log(process.env.NODE_ENV);
      const signUp = {
        input: {
          nickname: 'John Doe',
          email: 'test1@gmail.com',
          password: '123456',
        },
      };

      const res = await executeGraphQL(app, GraphQLQueryEnum.SIGN_UP, signUp);

      const data = res.body.data;
      expect(data).toHaveProperty('signUp');
      expect(data.signUp).toHaveProperty('accessToken');
      expect(data.signUp).toHaveProperty('refreshToken');
    });
  });
  describe('sign in', () => {
    it('should sign in a user', async () => {
      const signUp = {
        input: {
          nickname: 'John Doe',
          email: 'test2@gmail.com',
          password: '123456',
        },
      };
      const res1 = await executeGraphQL(app, GraphQLQueryEnum.SIGN_UP, signUp);
      const data = res1.body.data;
      expect(data).toHaveProperty('signUp');
      expect(data.signUp).toHaveProperty('accessToken');
      expect(data.signUp).toHaveProperty('refreshToken');

      const login = {
        input: {
          email: 'test1@gmail.com',
          password: '123456',
        },
      };
      const res2 = await executeGraphQL(app, GraphQLQueryEnum.LOGIN, login);
      const data2 = res2.body.data;
      expect(data2).toHaveProperty('login');
      expect(data2.login).toHaveProperty('accessToken');
      expect(data2.login).toHaveProperty('refreshToken');
    });
  });

  describe('delete user', () => {
    it('should delete a user', async () => {
      const signUp = {
        input: {
          nickname: 'John Doe',
          email: 'test3@gmail.com',
          password: '123456',
        },
      };
      const res1 = await executeGraphQL(app, GraphQLQueryEnum.SIGN_UP, signUp);
      const data = res1.body.data;
      expect(data).toHaveProperty('signUp');
      expect(data.signUp).toHaveProperty('accessToken');
      expect(data.signUp).toHaveProperty('refreshToken');

      const res2 = await executeGraphQL(
        app,
        GraphQLQueryEnum.DELETE_ACCOUNT,
        null,
        data.signUp.accessToken,
      );
      console.log(res2.body);
    });
  });
});
