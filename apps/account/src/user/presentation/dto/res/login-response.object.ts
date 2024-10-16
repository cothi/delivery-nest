import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginObj {
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;
}
