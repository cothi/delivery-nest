import { UserRoles, UserRoleType } from '@prisma/client';

export class UserRoleModel implements UserRoles {
  id: string;

  userId: string;

  roles: UserRoleType;

  constructor(data: UserRoleModel) {
    Object.assign(this, data);
  }
}
