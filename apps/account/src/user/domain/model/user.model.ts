import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';
import { UserRoleModel } from '@account/user/domain/model/user-role.model';
@ObjectType()
export class UserModel {
  @Field(() => ID)
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

  @Field(() => [UserRoleModel], { nullable: true })
  roles?: UserRoleModel[];
}
