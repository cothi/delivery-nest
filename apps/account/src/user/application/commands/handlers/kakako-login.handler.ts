import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';

import { JwtTokenService } from '@libs/jwt';
import { KakaoLoginCommand } from '@account/user/application/commands/kakao-login.command';
import { UserKakaoService } from '@account/user/domain/services/user-kakao.service';
import { TokenPairObj } from '@account/user/presentation/dto/res/token-pair.object';

@Injectable()
@CommandHandler(KakaoLoginCommand)
export class KakaoLoginHandler implements ICommandHandler {
  constructor(
    private readonly userKakaoService: UserKakaoService,
    private readonly jwtTokenService: JwtTokenService,
  ) {}
  async execute(cmd: KakaoLoginCommand): Promise<TokenPairObj> {
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
