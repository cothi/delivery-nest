import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { LoginUserQuery } from '../login-user.query';
import { TokenPairDto } from '../../../presentation/dto/res/token-pair.dto';
import { UserService } from '../../services/user.service';
import { JwtTokenService } from '../../../utils/jwt/jwt.service';

@Injectable()
@QueryHandler(LoginUserQuery)
export class LoginUserHandler implements IQueryHandler<LoginUserQuery> {
  constructor(
    private readonly jwtTokenService: JwtTokenService,
    private readonly userService: UserService,
  ) {}

  async execute(cmd: LoginUserQuery): Promise<TokenPairDto> {
    const user = await this.userService.login(cmd);
    return this.jwtTokenService.generateTokenPair({ userId: user.id, email: user.email });
  }
}
