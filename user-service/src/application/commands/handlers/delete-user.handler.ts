import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteUserCommand } from '../delete-user.command';
import { UserService } from '../../services/user.service';
import { TokenPairDto } from '../../../presentation/dto/res/token-pair.dto';

@Injectable()
@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(private readonly userService: UserService) {}

  async execute(cmd: DeleteUserCommand): Promise<Boolean> {
    await this.userService.deleteAccount(cmd.userId);
    return true;
  }
}
