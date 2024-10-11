import { UserModel } from '@account/user/domain/model/user.model';
import { UserRoleType } from '@prisma/client';
import {
  IUserRoleRepository,
  UserRoleRepositorySymbol,
} from '@account/user/domain/interfaces/user-role-repository.interface';
import { Inject } from '@nestjs/common';

export class UserRoleService {
  constructor(
    @Inject(UserRoleRepositorySymbol)
    private readonly userRoleRepository: IUserRoleRepository,
  ) {}
  async registerRole(
    user: UserModel,
    roleType: UserRoleType,
  ): Promise<UserModel> {
    const userRole = await this.userRoleRepository.createRole({
      data: {
        userId: user.id,
        roles: roleType,
      },
    });
    user.roles.push(userRole);
    return user;
  }
}
