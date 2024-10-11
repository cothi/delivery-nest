import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';
import { UserRoleModel } from '@account/user/domain/model/user-role.model';
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

  @Field({ nullable: true })
  roles?: UserRoleModel[];

  @HideField()
  password: string | undefined;

  @HideField()
  createdAt?: Date;

  @HideField()
  updatedAt?: Date;

  private constructor(data: UserModel) {
    Object.assign(this, data);
  }
  static create(data: UserModel) {
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
