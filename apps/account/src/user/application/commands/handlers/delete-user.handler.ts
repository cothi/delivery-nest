import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteUserCommand } from '@account/user/application/commands/delete-user.command';
import { UserService } from '@account/user/domain/services/user.service';

@Injectable()
@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(private readonly userService: UserService) {}

  async execute(cmd: DeleteUserCommand): Promise<boolean> {
    try {
      await this.userService.validateExistUserId(cmd.userId);
      await this.userService.deleteAccount(cmd.userId);
      return true;
    } catch (error) {
      throw error;
    }
  }
}
