import { UserRoles } from '@prisma/client';
import { UserRoleModel } from '@account/user/domain/model/user-role.model';

export class UserRoleMapper {
  static toDomain(data: UserRoles): UserRoleModel {
    return {
      id: data.id,
      userId: data.userId,
    };
  }
}
