import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../create-user.command';
import { UserService } from '../../services/user.service';
import { CreateUserDto } from '../../../presentation/dto/req/create-user.dto';
import { JwtTokenService } from '../../../utils/jwt/jwt.service';
import { TokenPairDto } from '../../../presentation/dto/res/token-pair.dto';

@Injectable()
@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly userService: UserService,
    private readonly jwtTokenService: JwtTokenService,
  ) {}

  async execute(cmd: CreateUserCommand): Promise<TokenPairDto> {
    const user = await this.userService.signUp({ ...cmd });
    return this.jwtTokenService.generateTokenPair({
      userId: user.id,
      email: user.email,
    });
  }
}
