import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TokenPairDto {
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;
}
