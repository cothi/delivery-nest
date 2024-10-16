import { UserModel } from '../../domain/model/user.model';
import { Prisma, Users } from '@prisma/client';
import { UserRoleMapper } from '@account/user/infrastructure/mapper/user-role.mapper';

type UserWithRoles = Prisma.UsersGetPayload<{
  include: {
    UserRoles: true;
  };
}>;

export class UserMapper {
  static userAndRollToDomain(user: UserWithRoles): UserModel {
    const roles = user.UserRoles.map((role) => UserRoleMapper.toDomain(role));
    return {
      roles: roles,
      ...user,
    };
  }

  static toDomain(user: Users): UserModel {
    return {
      roles: undefined,
      ...user,
    };
  }
}
