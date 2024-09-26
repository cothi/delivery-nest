import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class KakaoAuthUrlDto {
  @Field()
  url: string;
}
