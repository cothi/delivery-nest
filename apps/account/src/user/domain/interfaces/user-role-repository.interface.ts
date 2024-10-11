import { Prisma } from '@prisma/client';
import { UserRoleModel } from '@account/user/domain/model/user-role.model';

export const UserRoleRepositorySymbol = Symbol.for('UserRoleRepositorySymbol');
export interface IUserRoleRepository {
  createRole(args: Prisma.UserRolesCreateArgs): Promise<UserRoleModel>;
  deleteRole(args: Prisma.UserRolesDeleteArgs): Promise<UserRoleModel>;
}
