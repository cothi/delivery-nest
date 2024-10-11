import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';

import { JwtTokenService } from '@libs/jwt';
import { KakaoLoginCommand } from '@account/user/application/commands/kakao-login.command';
import { TokenPairDto } from '@account/user/presentation/dto/res/token-pair.object';
import { UserKakaoService } from '@account/user/domain/services/user-kakao.service';

@Injectable()
@CommandHandler(KakaoLoginCommand)
export class KakaoLoginHandler implements ICommandHandler {
  constructor(
    private readonly userKakaoService: UserKakaoService,
    private readonly jwtTokenService: JwtTokenService,
  ) {}
  async execute(cmd: KakaoLoginCommand): Promise<TokenPairDto> {
    try {
      const user = await this.userKakaoService.kakaoLogin(cmd.code);
      return this.jwtTokenService.generateTokenPair({
        userId: user.id,
      });
    } catch (error) {
      throw error;
    }
  }
}
