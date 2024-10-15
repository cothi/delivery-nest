import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RegisterRoleCommand } from '@account/user/application/commands/register-role.command';
import { Injectable } from '@nestjs/common';
import { UserRoleService } from '@account/user/domain/services/user-role.service';
import { UserRoleModel } from '@account/user/domain/model/user-role.model';

@Injectable()
@CommandHandler(RegisterRoleCommand)
export class RegisterRoleHandler
  implements ICommandHandler<RegisterRoleCommand>
{
  constructor(private readonly userRoleService: UserRoleService) {}
  async execute(cmd: RegisterRoleCommand): Promise<UserRoleModel> {
    try {
      return await this.userRoleService.registerRole(cmd.userId, cmd.role);
    } catch (error) {
      throw error;
    }
  }
}
