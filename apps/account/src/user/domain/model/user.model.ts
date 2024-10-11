import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';
@ObjectType()
export class UserModel {
  @Field()
  id?: string;

  @Field()
  nickname: string;

  @Field({ nullable: true })
  email: string | undefined;

  @Field({ nullable: true })
  birthday?: Date | undefined;

  @HideField()
  password: string | undefined;

  @HideField()
  createdAt?: Date;

  @HideField()
  updatedAt?: Date;

  private constructor(data: Partial<UserModel>) {
    Object.assign(this, data);
  }
  static create(data: Partial<UserModel>) {
    return new UserModel({ ...data });
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
