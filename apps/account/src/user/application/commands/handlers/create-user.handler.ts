import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { JwtTokenService } from '@libs/jwt';
import { CreateUserCommand } from '@account/user/application/commands/create-user.command';
import { UserService } from '@account/user/domain/services/user.service';
import { CreateUserDto } from '@account/user/domain/dto/create-user.dto';
import { TokenPairObj } from '@account/user/presentation/dto/res/token-pair.object';

@Injectable()
@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly userService: UserService,
    private readonly jwtTokenService: JwtTokenService,
  ) {}

  async execute(cmd: CreateUserCommand): Promise<TokenPairObj> {
    try {
      await this.userService.validateCanSignUpUser(cmd.email);

      const user = await this.userService.signUp(
        new CreateUserDto({
          email: cmd.email,
          nickname: cmd.email,
          password: cmd.password,
        }),
      );
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
