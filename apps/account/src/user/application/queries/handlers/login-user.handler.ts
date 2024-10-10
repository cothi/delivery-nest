import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { JwtTokenService } from '@libs/jwt';
import { LoginUserQuery } from '@account/user/application/queries/login-user.query';
import { UserService } from '@account/user/domain/services/user.service';
import { TokenPairDto } from '@account/user/presentation/dto/res/token-pair.dto';

@Injectable()
@QueryHandler(LoginUserQuery)
export class LoginUserHandler implements IQueryHandler<LoginUserQuery> {
  constructor(
    private readonly jwtTokenService: JwtTokenService,
    private readonly userService: UserService,
  ) {}

  async execute(cmd: LoginUserQuery): Promise<TokenPairDto> {
    const user = await this.userService.login(cmd);
    return this.jwtTokenService.generateTokenPair({
      userId: user.id,
    });
  }
}
