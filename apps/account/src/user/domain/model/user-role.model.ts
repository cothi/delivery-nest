import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Role } from '@account/user/presentation/dto/req/register-role.input';

@ObjectType()
export class UserRoleModel {
  @Field(() => ID)
  id: string;

  @Field()
  userId: string;
}
