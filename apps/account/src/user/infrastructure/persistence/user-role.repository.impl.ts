import { PrismaService } from '@libs/database';
import { Prisma } from '@prisma/client';
import { UserRoleMapper } from '@account/user/infrastructure/mapper/user-role.mapper';
import { UserRoleModel } from '@account/user/domain/model/user-role.model';
import { IUserRoleRepository } from '@account/user/domain/interfaces/user-role-repository.interface';
export class UserRoleRepositoryImpl implements IUserRoleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createRole(args: Prisma.UserRolesCreateArgs): Promise<UserRoleModel> {
    const role = await this.prisma.userRoles.create(args);
    return UserRoleMapper.toDomain(role);
  }

  async deleteRole(args: Prisma.UserRolesDeleteArgs): Promise<UserRoleModel> {
    const role = await this.prisma.userRoles.delete(args);
    return UserRoleMapper.toDomain(role);
  }
}
