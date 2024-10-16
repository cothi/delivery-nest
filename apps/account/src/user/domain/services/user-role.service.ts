import { UserRoleType } from '@prisma/client';
import {
  IUserRoleRepository,
  UserRoleRepositorySymbol,
} from '@account/user/domain/interfaces/user-role-repository.interface';
import { Inject } from '@nestjs/common';
import { UserRoleModel } from '@account/user/domain/model/user-role.model';

export class UserRoleService {
  constructor(
    @Inject(UserRoleRepositorySymbol)
    private readonly userRoleRepository: IUserRoleRepository,
  ) {}
  async registerRole(
    userId: string,
    roleType: UserRoleType,
  ): Promise<UserRoleModel> {
    return await this.userRoleRepository.createRole({
      data: {
        userId,
        roles: roleType,
      },
    });
  }
}
