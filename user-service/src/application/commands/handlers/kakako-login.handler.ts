import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { KakaoLoginCommand } from '../kakao-login.command';
import { Injectable } from '@nestjs/common';
import { TokenPairDto } from '../../../presentation/dto/res/token-pair.dto';
import { UserService } from '../../services/user.service';
import { JwtTokenService } from '../../../utils/jwt/jwt.service';

@Injectable()
@CommandHandler(KakaoLoginCommand)
export class KakaoLoginHandler implements ICommandHandler {
  constructor(
    private readonly userService: UserService,
    private readonly jwtTokenService: JwtTokenService,
  ) {}
  async execute(cmd: KakaoLoginCommand): Promise<TokenPairDto> {
    try {
      const user = await this.userService.kakaoLogin(cmd.code);
      return this.jwtTokenService.generateTokenPair({ userId: user.id, email: user.email });
    } catch (error) {
      throw error;
    }
  }
}
