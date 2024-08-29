import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  nickname: string;

  private constructor(id: string, email: string, password: string, nickname: string) {}
  static create(id: string, email: string, password: string, nickname: string) {
    return new User(id, email, password, nickname);
  }
}

@ObjectType()
export class UserInfo {
  @Field(() => ID)
  id: number;

  @Field()
  email: string;

  @Field()
  nickname: string;
}
