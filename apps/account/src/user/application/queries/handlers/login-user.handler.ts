import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { JwtTokenService } from '@libs/jwt';
import { LoginUserQuery } from '@account/user/application/queries/login-user.query';
import { UserService } from '@account/user/domain/services/user.service';
import { TokenPairObj } from '@account/user/presentation/dto/res/token-pair.object';

@Injectable()
@QueryHandler(LoginUserQuery)
export class LoginUserHandler implements IQueryHandler<LoginUserQuery> {
  constructor(
    private readonly jwtTokenService: JwtTokenService,
    private readonly userService: UserService,
  ) {}

  async execute(query: LoginUserQuery): Promise<TokenPairObj> {
    try {
      const user = await this.userService.validateLogin({
        email: query.email,
        password: query.password,
      });

      return this.jwtTokenService.generateTokenPair({
        userId: user.id,
      });
    } catch (error) {
      throw error;
    }
  }
}
