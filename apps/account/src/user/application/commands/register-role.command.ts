import { Field, InputType, registerEnumType } from '@nestjs/graphql';

export enum Role {
  USER = 'USER',
  COURIER = 'COURIER',
  COUNSELOR = 'COUNSELOR',
}

export class RegisterRoleCommand {
  constructor(
    public readonly role: Role,
    public readonly userId: string,
  ) {}
}
