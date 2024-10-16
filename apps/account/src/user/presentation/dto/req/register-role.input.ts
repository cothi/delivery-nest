import { Field, InputType, registerEnumType } from '@nestjs/graphql';

export enum Role {
  USER = 'USER',
  COURIER = 'COURIER',
  COUNSELOR = 'COUNSELOR',
}

registerEnumType(Role, {
  name: 'Role',
});
@InputType()
export class RegisterRoleInput {
  @Field()
  role: Role;
}
