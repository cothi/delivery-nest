import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TokenPairObj {
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;
}
