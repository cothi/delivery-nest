import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { JwtTokenService } from '@libs/jwt';
import { CreateUserCommand } from '@account/user/application/commands/create-user.command';
import { UserService } from '@account/user/domain/services/user.service';
import { TokenPairDto } from '@account/user/presentation/dto/res/token-pair.dto';

@Injectable()
@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly userService: UserService,
    private readonly jwtTokenService: JwtTokenService,
  ) {}

  async execute(cmd: CreateUserCommand): Promise<TokenPairDto> {
    try {
      await this.userService.validateCanSignUpUser(cmd.email);

      const user = await this.userService.signUp({ ...cmd });
      const tokens = this.jwtTokenService.generateTokenPair({
        userId: user.id,
      });
      return {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      };
    } catch (error) {
      throw error;
    }
  }
}
